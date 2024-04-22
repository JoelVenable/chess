import { ChessEngine } from '../ChessEngine/ChessEngine'
import { MoveNotation, movePromoteMap } from '../ChessEngine/util/possibleMove'
import { ChessPiece } from '../ChessPiece/ChessPiece'
import { ChessSquareNotation } from '../ChessSquare/ChessSquare.interface'
import {
  ChessMoveHistory,
  IChessHistoryNavigationControl,
  IChessHistoryStorage,
  PlayerColor,
} from './ChessHistory.interface'
import { ChessHistoryMapper } from './ChessHistory.mapper'

export type ChessHistoryProps = {
  storage: IChessHistoryStorage
}

export class ChessHistory {
  constructor({ storage }: ChessHistoryProps) {
    this.#storage = storage
    this.#moveHistory = this.#storage.getMoveHistory()
    this.#startingBoardState = this.#storage.getStartingBoardState()
    this.#turn = 1
    this.#activePlayer = 'white'
    this.#engine = new ChessEngine({
      pieces: this.#startingBoardState,
      activePlayer: 'white',
    })
  }

  reset() {
    this.#moveHistory = {
      white: [],
      black: [],
    }
    this.#turn = 1
    this.#activePlayer = 'white'
    this.#storage.setMoveHistory(this.#moveHistory)
  }

  getNavigation = (): IChessHistoryNavigationControl => ({
    hasPrevious: this.hasPrevious,
    hasNext: this.hasNext,
    next: this.next.bind(this),
    previous: this.previous.bind(this),
    player: this.player,
    currentMove: this.currentMove ?? null,
    turn: this.turn,
    playEnabled: this.playEnabled,
  })

  #startingBoardState: ChessPiece[]

  #engine: ChessEngine

  #currentMove?: MoveNotation

  #moveHistory: ChessMoveHistory

  #activePlayer: PlayerColor

  #turn: number

  #storage: IChessHistoryStorage

  get pieces() {
    return this.#engine.pieces
  }

  get history() {
    return this.#moveHistory
  }

  get currentMove() {
    return this.#currentMove
  }

  get moves() {
    return this.#engine.moves
  }

  #updateEngine() {
    const res = ChessHistoryMapper({
      history: this.#moveHistory,
      startingState: this.#startingBoardState,
      startingPlayer: 'white',
      currentPlayer: this.#activePlayer,
      currentTurn: this.#turn,
    })
    this.#engine = res.engine
    this.#currentMove = res.currentMove
  }

  get hasPrevious() {
    if (this.#turn === 1 && this.#activePlayer === 'white') return false
    return true
  }

  get hasNext(): boolean {
    switch (this.player) {
      case 'white':
        return this.#moveHistory.white.length >= this.#turn
      case 'black':
        return this.#moveHistory.black.length >= this.#turn
    }
  }

  next() {
    console.log('History NEXT')
    if (!this.hasNext) return
    switch (this.#activePlayer) {
      case 'white':
        this.#activePlayer = 'black'
        break
      case 'black':
        this.#activePlayer = 'white'
        this.#turn++
        break
    }
    this.#updateEngine()
  }

  previous() {
    if (!this.hasPrevious) return
    switch (this.#activePlayer) {
      case 'white':
        this.#activePlayer = 'black'
        this.#turn--
        break
      case 'black':
        this.#activePlayer = 'white'
    }
    this.#updateEngine()
  }

  get player() {
    return this.#activePlayer
  }

  get turn() {
    return this.#turn
  }

  get playEnabled() {
    return !this.hasNext
  }

  #playFromHere() {
    switch (this.#activePlayer) {
      case 'white':
        this.#moveHistory.white = this.#moveHistory.white.slice(0, this.#turn)
        this.#moveHistory.black = this.#moveHistory.black.slice(
          0,
          this.#turn - 1,
        )
        break
      case 'black':
        this.#moveHistory.white = this.#moveHistory.white.slice(0, this.#turn)
        this.#moveHistory.black = this.#moveHistory.black.slice(0, this.#turn)
    }
  }

  #writeMove(notation: MoveNotation) {
    this.#playFromHere()
    const whiteLen = this.#moveHistory.white.length
    const blackLen = this.#moveHistory.black.length
    const diff = whiteLen - blackLen
    if (diff > 1) throw new Error('Invalid move history')
    this.#moveHistory[this.#activePlayer].push(notation)
    this.#storage.setMoveHistory(this.#moveHistory)
    return this.next()
  }

  move(notation: MoveNotation): void {
    if (!this.playEnabled) throw new Error('Cannot move')
    const from = notation.slice(0, 2) as ChessSquareNotation
    const to = notation.slice(2, 4) as ChessSquareNotation
    const promote = notation.slice(4, 5)
    const move = this.#engine.moves[from]?.find((m) => {
      if (m.move.type === 'promotion') {
        const promoteTo = movePromoteMap[promote as keyof typeof movePromoteMap]
        if (!promoteTo) throw new Error('Invalid promotion')
        return (
          m.move.from === from &&
          m.move.to === to &&
          m.move.promoteTo === promoteTo
        )
      }
      return m.move.from === from && m.move.to === to
    })
    if (!move) throw new Error('Invalid move')
    this.#writeMove(notation)
  }
}
