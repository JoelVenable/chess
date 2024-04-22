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
import { IconBaseProps, IconType } from 'react-icons'
import { ChessPieceType } from './ChessPiece.types'

const iconMap: Record<ChessPieceType, Record<PlayerColor, IconType>> = {
  pawn: {
    white: FaRegChessPawn,
    black: FaChessPawn,
  },
  rook: {
    white: FaRegChessRook,
    black: FaChessRook,
  },
  knight: {
    white: FaRegChessKnight,
    black: FaChessKnight,
  },
  bishop: {
    white: FaRegChessBishop,
    black: FaChessBishop,
  },
  queen: {
    white: FaRegChessQueen,
    black: FaChessQueen,
  },
  king: {
    white: FaRegChessKing,
    black: FaChessKing,
  },
} as const

export type ChessPieceIconProps = IconBaseProps & {
  type: ChessPieceType
  owner: PlayerColor
}

export const ChessPieceIcon = ({
  type,
  owner,
  ...props
}: ChessPieceIconProps) => {
  const Icon = iconMap[type][owner]

  return <Icon {...props} />
}
