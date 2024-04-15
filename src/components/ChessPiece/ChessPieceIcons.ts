import {
  FaChessPawn,
  FaRegChessPawn,
  FaChessRook,
  FaRegChessRook,
  FaChessKnight,
  FaRegChessKnight,
  FaChessBishop,
  FaRegChessBishop,
  FaChessQueen,
  FaRegChessQueen,
  FaChessKing,
  FaRegChessKing,
} from 'react-icons/fa6'
import { PlayerColor } from '../ChessHistory/ChessHistory.interface'
import { IconType } from 'react-icons'
import { ChessPieceType } from './ChessPiece.types'

const iconMap: Record<ChessPieceType, Record<PlayerColor, IconType>> = {
  pawn: {
    white: FaChessPawn,
    black: FaRegChessPawn,
  },
  rook: {
    white: FaChessRook,
    black: FaRegChessRook,
  },
  knight: {
    white: FaChessKnight,
    black: FaRegChessKnight,
  },
  bishop: {
    white: FaChessBishop,
    black: FaRegChessBishop,
  },
  queen: {
    white: FaChessQueen,
    black: FaRegChessQueen,
  },
  king: {
    white: FaChessKing,
    black: FaRegChessKing,
  },
} as const

export const getChessPieceIcon = (type: ChessPieceType, owner: PlayerColor) => {
  return iconMap[type][owner]
}
