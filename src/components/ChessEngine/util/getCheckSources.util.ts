import { PlayerColor } from '../../ChessHistory/ChessHistory.interface'
import { ChessPiece } from '../../ChessPiece/ChessPiece.base'
import { ChessSquareNotation } from '../../ChessSquare/ChessSquare.interface'
import { getPossiblePieceMovement } from './getPossiblePieceMovement.util'

export type GetCheckSourcesArgs = {
  /** used for determining castling through check */
  kingSquares?: ChessSquareNotation[]
  pieces: ChessPiece[]
  activePlayer: PlayerColor
}

export const getCheckSources = ({
  pieces,
  activePlayer,
  kingSquares,
}: GetCheckSourcesArgs): ChessPiece[] => {
  const ownKing = pieces.find(
    (p) => p.owner === activePlayer && p.type === 'king',
  )

  if (!ownKing) return []

  return pieces.filter((p) => {
    if (p.owner === activePlayer) return false

    const validMoves = getPossiblePieceMovement({ piece: p, board: pieces })
    return validMoves.find(
      (m) => m.to === ownKing.location || kingSquares?.includes(m.to),
    )
  })
}
