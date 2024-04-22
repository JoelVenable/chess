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
  notation: MoveNotation
}

export const movePromoteMap = {
  q: 'queen',
  r: 'rook',
  b: 'bishop',
  n: 'knight',
} as const

export const getPromoteNotation = (
  type: ChessPieceType,
): MovePromoteNotation => {
  switch (type) {
    case 'queen':
      return 'q'
    case 'rook':
      return 'r'
    case 'bishop':
      return 'b'
    case 'knight':
      return 'n'
    default:
      return ''
  }
}

export type MovePromoteNotation = 'q' | 'r' | 'b' | 'n' | ''

export type MoveNotation =
  `${ChessSquareNotation}${ChessSquareNotation}${MovePromoteNotation}`

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
