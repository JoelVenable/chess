import { ChessPiece } from '../../ChessPiece/ChessPiece'
import { ChessPieceType } from '../../ChessPiece/ChessPiece.types'
import { ChessSquareNotation } from '../../ChessSquare/ChessSquare.interface'

export type MoveType =
  | 'normal'
  | 'capture'
  | 'en-passant'
  | 'castle'
  | 'promotion'

export type PossibleMoveBase = {
  from: ChessSquareNotation
  to: ChessSquareNotation
}

export type PossibleMoveNormal = PossibleMoveBase & {
  type: 'normal'
}

export type PossibleMoveEnPassant = PossibleMoveBase & {
  type: 'en-passant'
  taken: ChessPiece
}

export type PossibleMoveCastle = PossibleMoveBase & {
  type: 'castle'
  rook: ChessPiece
  rookTo: ChessSquareNotation
}

export type PossibleMovePromotion = PossibleMoveBase & {
  type: 'promotion'
  taken?: ChessPiece
  promoteTo: ChessPieceType
}

export type PossibleMoveCapture = PossibleMoveBase & {
  type: 'capture'
  taken: ChessPiece
}

export type PossibleMove =
  | PossibleMoveNormal
  | PossibleMoveCapture
  | PossibleMoveEnPassant
  | PossibleMoveCastle
  | PossibleMovePromotion

export type PossibleMoveResult = {
  move: PossibleMove
  nextBoardState: ChessPiece[]
}
