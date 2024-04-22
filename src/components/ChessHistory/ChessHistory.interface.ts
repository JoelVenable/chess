import { MoveNotation } from '../ChessEngine/util/possibleMove'
import { ChessPiece } from '../ChessPiece/ChessPiece'

export type PlayerColor = 'white' | 'black'

export type IChessHistoryNavigationControl = {
  hasPrevious: boolean
  hasNext: boolean
  next(): void
  player: PlayerColor
  turn: number
  currentMove: MoveNotation | null
  previous(): void
  playEnabled: boolean
}

export type ChessMoveHistory = {
  white: MoveNotation[]
  black: MoveNotation[]
}

export interface IChessHistoryStorage {
  getStartingBoardState(): ChessPiece[]
  getMoveHistory(): ChessMoveHistory
  setMoveHistory(history: ChessMoveHistory): void
}
