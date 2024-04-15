import { PlayerColor } from '../../ChessHistory/ChessHistory.interface'
import { PossibleMoveEnPassant } from './possibleMove'
import { translateSquare } from './ChessPieceMovement'
import { ChessPiece } from '../../ChessPiece/ChessPiece'
export type GetEnPassantCandiatesArgs = {
  pieces: ChessPiece[]
  activePlayer: PlayerColor
}

export const getEnPassantCandidates = ({
  pieces,
  activePlayer,
}: GetEnPassantCandiatesArgs): PossibleMoveEnPassant[] => {
  const allPawns = pieces.filter((p) => p.isPawn)

  const enemyPawnEligible =
    allPawns.filter((p) => {
      if (p.owner === activePlayer) return false
      if (p.isValidEnPassantTarget) return true
      return false
    })[0] ?? null

  if (!enemyPawnEligible) return []

  return allPawns
    .filter((p) => p.owner === activePlayer)
    .filter((p) => {
      const left = translateSquare({
        square: p.location,
        files: -1,
        ranks: 0,
      })
      const right = translateSquare({
        square: p.location,
        files: 1,
        ranks: 0,
      })
      return [left, right].includes(enemyPawnEligible.location)
    })
    .map<PossibleMoveEnPassant>((p) => ({
      from: p.location,
      taken: enemyPawnEligible,
      type: 'en-passant',
      to: translateSquare({
        square: enemyPawnEligible.location,
        files: 0,
        ranks: activePlayer === 'white' ? -1 : 1,
      })!,
    }))
}
