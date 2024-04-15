import { PlayerColor } from '../../ChessHistory/ChessHistory.interface'
import { ChessPiece } from '../../ChessPiece/ChessPiece'
import { ChessSquareNotation } from '../../ChessSquare/ChessSquare.interface'

export type TargetSquareDetailEmpty = {
  square: ChessSquareNotation
  owner: 'empty'
  piece: undefined
}

export type TargetSquareDetailOccupied = {
  square: ChessSquareNotation
  piece: ChessPiece
  owner: 'friend' | 'enemy'
}

export type TargetSquareDetail =
  | TargetSquareDetailEmpty
  | TargetSquareDetailOccupied

export type GetTargetSquareArgs = {
  square: ChessSquareNotation
  player: PlayerColor
  pieces: ChessPiece[]
}

export const getTargetSquare = ({
  square,
  player,
  pieces,
}: GetTargetSquareArgs): TargetSquareDetail => {
  const piece = pieces.find((p) => p.location === square)
  if (!piece) {
    return {
      square,
      owner: 'empty',
      piece: undefined,
    }
  }
  if (piece.owner === player) {
    return {
      square,
      owner: 'friend',
      piece,
    }
  }
  return {
    square,
    owner: 'enemy',
    piece,
  }
}
