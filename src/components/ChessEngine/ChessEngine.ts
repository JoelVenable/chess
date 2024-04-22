import { PlayerColor } from '../ChessHistory/ChessHistory.interface'
import { ChessPiece } from '../ChessPiece/ChessPiece'
import { ChessSquareNotation } from '../ChessSquare/ChessSquare.interface'
import { getCastleCandidates } from './util/getCastleCandidates.util'
import { getCheckSources } from './util/getCheckSources.util'
import { getEnPassantCandidates } from './util/getEnPassantCandidates.util'
import { getPossiblePieceMovement } from './util/getPossiblePieceMovement.util'
import {
  PossibleMoveResult,
  PossibleMove,
  movePromoteMap,
} from './util/possibleMove'

export type ChessEngineProps = {
  pieces: ChessPiece[]
  activePlayer: PlayerColor
}

export type ChessEngineSelectSquareResultOccupied = {
  piece: ChessPiece
  validMoves: ChessSquareNotation[]
  state: 'occupied'
}

export type ChessEngineSelectSquareResultEmpty = {
  piece: undefined
  validMoves: ChessSquareNotation[]
  state: 'empty'
}

export type ChessEngineSelectSquareResult =
  | ChessEngineSelectSquareResultOccupied
  | ChessEngineSelectSquareResultEmpty

export type ChessEngineSelectSquareResultMove = {
  activePiece: ChessPiece
  result: 'move'
  moveNotation: string
  shouldPromote: boolean
}

export type ChessEngineSelectSquareResultCancel = {
  activePiece: undefined
  result: 'cancel'
  error?: string
}

export type ChessEngineSelectSquareMoveResult =
  | ChessEngineSelectSquareResultMove
  | ChessEngineSelectSquareResultCancel

export type MoveRecord = Partial<
  Record<ChessSquareNotation, PossibleMoveResult[]>
>

export class ChessEngine {
  #pieces: ChessPiece[]
  #activePlayer: PlayerColor
  #possibleMoves: MoveRecord | undefined

  get moves() {
    if (!this.#possibleMoves) this.#possibleMoves = this.#getPossibleMoves()
    return this.#possibleMoves
  }

  get pieces() {
    return this.#pieces
  }

  get activePlayer() {
    return this.#activePlayer
  }

  constructor({ pieces, activePlayer }: ChessEngineProps) {
    this.#pieces = pieces
    this.#activePlayer = activePlayer
  }

  #getPossibleMoves = (): Partial<
    Record<ChessSquareNotation, PossibleMoveResult[]>
  > => {
    const ownPieces = this.#pieces.filter((p) => p.owner === this.#activePlayer)

    const arg = { pieces: this.#pieces, activePlayer: this.#activePlayer }

    const possibleMoves = ownPieces.flatMap((piece) =>
      getPossiblePieceMovement({ piece, board: this.#pieces }),
    )

    const enPassantMoves = getEnPassantCandidates(arg)
    const castleMoves = getCastleCandidates(arg)

    return [
      ...possibleMoves,
      ...enPassantMoves,
      ...castleMoves,
    ].reduce<MoveRecord>((acc, move) => {
      const source = move.from

      const { nextBoardState } = this.#getMoveResult(move)
      const checked = getCheckSources({
        pieces: nextBoardState,
        activePlayer: this.#activePlayer,
      })
      if (!checked.length) {
        if (!acc[source]) acc[source] = []

        acc[source]!.push({ move, nextBoardState })
      }
      return acc
    }, {})
  }

  next(move: PossibleMoveResult): ChessEngine {
    return new ChessEngine({
      pieces: move.nextBoardState,
      activePlayer: this.#activePlayer === 'white' ? 'black' : 'white',
    })
  }

  nextFromNotation(notation: string | undefined): ChessEngine {
    if (!notation) return this
    const move = this.#getMoveFromNotation(notation)
    const res = this.#getMoveResult(move)
    return this.next(res)
  }

  #getMoveFromNotation(notation: string) {
    const from = notation.slice(0, 2) as ChessSquareNotation
    const to = notation.slice(2, 4) as ChessSquareNotation
    const promote = notation.slice(4, 5)

    const piece = this.#pieces.find((p) => p.location === from)
    if (!piece) throw new Error('Piece not found')

    const moves = getPossiblePieceMovement({ piece, board: this.#pieces })

    const move = moves.find((m) => {
      if (m.type === 'promotion') {
        const promoteTo = movePromoteMap[promote as keyof typeof movePromoteMap]
        if (!promoteTo) throw new Error('Invalid promotion')
        return m.from === from && m.to === to && m.promoteTo === promoteTo
      }
      return m.from === from && m.to === to
    })
    if (move) return move
    const ep = getEnPassantCandidates({
      pieces: this.#pieces,
      activePlayer: this.#activePlayer,
    }).find((m) => m.from === from && m.to === to)
    if (ep) return ep
    const castle = getCastleCandidates({
      pieces: this.#pieces,
      activePlayer: this.#activePlayer,
    }).find((m) => m.from === from && m.to === to)
    if (castle) return castle

    throw new Error('Invalid move')
  }

  #getMoveResult(move: PossibleMove): PossibleMoveResult {
    const lastMovedPiece = this.#pieces.find(
      (p) =>
        p.owner === this.#activePlayer &&
        p.movedLastTurn &&
        p.location !== move.from,
    )
    const movePiece = this.#pieces.find((p) => p.location === move.from)
    if (!movePiece) throw new Error('Piece not found')
    const removeLocations = [
      lastMovedPiece?.location,
      movePiece.location,
      'taken' in move ? move.taken?.location : undefined,
      'rook' in move ? move.rook.location : undefined,
    ].filter(Boolean)
    const takenAndMovedRemoved = this.#pieces.filter(
      (p) => !removeLocations.includes(p.location),
    )
    const readd: ChessPiece[] = [
      // after move piece
      new ChessPiece({
        owner: movePiece.owner,
        location: move.to,
        movedLastTurn: true,
        qtyMoves: movePiece.qtyMoves + 1,
        type: move.type === 'promotion' ? move.promoteTo : movePiece.type,
      }),
    ]
    if (lastMovedPiece) {
      readd.push(
        new ChessPiece({
          owner: lastMovedPiece.owner,
          location: lastMovedPiece.location,
          movedLastTurn: false,
          qtyMoves: lastMovedPiece.qtyMoves,
          type: lastMovedPiece.type,
        }),
      )
    }
    switch (move.type) {
      case 'normal':
      case 'promotion':
      case 'en-passant':
      case 'capture':
        return {
          move,
          nextBoardState: takenAndMovedRemoved.concat(...readd),
        }
      case 'castle': {
        const rook = this.#pieces.find((p) => p.location === move.rook.location)
        if (!rook) throw new Error('Rook not found')
        const afterRook = new ChessPiece({
          owner: rook.owner,
          location: move.rookTo,
          movedLastTurn: true,
          qtyMoves: rook.qtyMoves + 1,
          type: rook.type,
        })
        return {
          move,
          nextBoardState: takenAndMovedRemoved.concat(...readd, afterRook),
        }
      }
    }
  }
}
