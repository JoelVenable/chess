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
      const isValid = p.isValidEnPassantTarget
      return isValid
    })[0] ?? null

  if (!enemyPawnEligible) return []

  return allPawns
    .filter((p) => {
      if (p.owner !== activePlayer) return false
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
      return [left, right].filter(Boolean).includes(enemyPawnEligible.location)
    })
    .map<PossibleMoveEnPassant>((p) => {
      const to = translateSquare({
        square: enemyPawnEligible.location,
        files: 0,
        ranks: activePlayer === 'white' ? -1 : 1,
      })!

      return {
        from: p.location,
        taken: enemyPawnEligible,
        type: 'en-passant',
        notation: `${p.location}${to}`,
        to,
      }
    })
}
