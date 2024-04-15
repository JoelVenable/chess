import { PlayerColor } from '../../ChessHistory/ChessHistory.interface'
import { ChessPiece } from '../../ChessPiece/ChessPiece'
import {
  ChessSquareNotation,
  concatRankFile,
  getRankFile,
} from '../../ChessSquare/ChessSquare.interface'
import { translateSquare } from './ChessPieceMovement'
import { getCheckSources } from './getCheckSources.util'
import { PossibleMoveCastle } from './possibleMove'

export type GetCastleCandiatesArgs = {
  pieces: ChessPiece[]
  activePlayer: PlayerColor
}

const queenSideProps = {
  blockingFiles: ['b', 'c', 'd'],
  checkFiles: ['c', 'd', 'e'],
} as const

const kingSideProps = {
  blockingFiles: ['f', 'g'],
  checkFiles: ['e', 'f', 'g'],
} as const

export const getCastleCandidates = ({
  pieces,
  activePlayer,
}: GetCastleCandiatesArgs): PossibleMoveCastle[] => {
  const ownKing = pieces.find(
    (p) => p.owner === activePlayer && p.isKing && !p.hasMoved,
  )

  if (!ownKing) return []

  const ownRooks = pieces.filter(
    (p) => p.owner === activePlayer && p.isRook && !p.hasMoved,
  )

  return ownRooks.reduce<PossibleMoveCastle[]>((acc, rook) => {
    const side = rook.location[0] === 'a' ? 'queen' : 'king'
    const { blocking, check } = concatSide(ownKing.location, side)
    const blocks = blocking.some((square) =>
      pieces.some((p) => p.location === square),
    )
    const checks = getCheckSources({ pieces, activePlayer, kingSquares: check })
    if (!blocks && checks.length === 0) {
      acc.push({
        from: ownKing.location,
        rook,
        rookTo: translateSquare({
          square: rook.location,
          files: side === 'queen' ? 3 : -2,
          ranks: 0,
        })!,
        type: 'castle',
        to: translateSquare({
          square: ownKing.location,
          files: side === 'queen' ? -2 : 2,
          ranks: 0,
        })!,
      })
    }
    return acc
  }, [])
}

function concatSide(square: ChessSquareNotation, side: 'queen' | 'king') {
  const { rank } = getRankFile(square)

  const props = side === 'queen' ? queenSideProps : kingSideProps

  const blocking = props.blockingFiles.map((file) =>
    concatRankFile({ rank, file }),
  )
  const check = props.checkFiles.map((file) => concatRankFile({ rank, file }))
  return { blocking, check }
}
