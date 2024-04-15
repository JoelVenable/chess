import { PlayerColor } from '../ChessHistory/ChessHistory.interface'
import { ChessPiece } from '../ChessPiece/ChessPiece'
import { ChessSquareNotation } from '../ChessSquare/ChessSquare.interface'
import { getCastleCandidates } from './util/getCastleCandidates.util'
import { getCheckSources } from './util/getCheckSources.util'
import { getEnPassantCandidates } from './util/getEnPassantCandidates.util'
import { getPossiblePieceMovement } from './util/getPossiblePieceMovement.util'
import { PossibleMoveResult, PossibleMove } from './util/possibleMove'

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

export class ChessEngine {
  #pieces: ChessPiece[]
  #activePlayer: PlayerColor

  constructor({ pieces, activePlayer }: ChessEngineProps) {
    this.#pieces = pieces
    this.#activePlayer = activePlayer
  }

  get possibleMoves(): PossibleMoveResult[] {
    const ownPieces = this.#pieces.filter((p) => p.owner === this.#activePlayer)

    const arg = { pieces: this.#pieces, activePlayer: this.#activePlayer }

    const possibleMoves = ownPieces.flatMap((piece) =>
      getPossiblePieceMovement({ piece, board: this.#pieces }),
    )

    const enPassantMoves = getEnPassantCandidates(arg)
    const castleMoves = getCastleCandidates(arg)

    return [...possibleMoves, ...enPassantMoves, ...castleMoves].reduce<
      PossibleMoveResult[]
    >((acc, move) => {
      const { nextBoardState } = this.#getMoveResult(move)
      const checked = getCheckSources({
        pieces: nextBoardState,
        activePlayer: this.#activePlayer,
      })
      if (!checked.length) acc.push({ move, nextBoardState })

      return acc
    }, [])
  }

  next(move: PossibleMoveResult): ChessEngine {
    return new ChessEngine({
      pieces: move.nextBoardState,
      activePlayer: this.#activePlayer === 'white' ? 'black' : 'white',
    })
  }

  #getMoveResult(move: PossibleMove): PossibleMoveResult {
    const movePiece = this.#pieces.find((p) => p.location === move.from)
    if (!movePiece) throw new Error('Piece not found')
    const removeLocations = [
      movePiece.location,
      'taken' in move ? move.taken?.location : undefined,
      'rook' in move ? move.rook.location : undefined,
    ].filter(Boolean)
    const takenAndMovedRemoved = this.#pieces.filter(
      (p) => !removeLocations.includes(p.location),
    )
    const afterMovePiece = new ChessPiece({
      owner: movePiece.owner,
      location: move.to,
      movedLastTurn: true,
      qtyMoves: movePiece.qtyMoves + 1,
      type: move.type === 'promotion' ? move.promoteTo : movePiece.type,
    })
    switch (move.type) {
      case 'normal':
      case 'promotion':
      case 'en-passant':
      case 'capture':
        return {
          move,
          nextBoardState: takenAndMovedRemoved.concat(afterMovePiece),
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
          nextBoardState: takenAndMovedRemoved.concat(
            afterMovePiece,
            afterRook,
          ),
        }
      }
    }
  }
}
