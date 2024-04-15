import { PlayerColor } from '../ChessHistory/ChessHistory.interface'
import { ChessSquareNotation } from '../ChessSquare/ChessSquare.interface'

export type ChessPieceType =
  | 'pawn'
  | 'rook'
  | 'knight'
  | 'bishop'
  | 'queen'
  | 'king'

export type ChessPieceProps = {
  owner: PlayerColor
  location: ChessSquareNotation
  movedLastTurn: boolean
  qtyMoves: number
  type: ChessPieceType
}

export type ChessPieceStaticProps = Omit<ChessPieceProps, 'type'>
