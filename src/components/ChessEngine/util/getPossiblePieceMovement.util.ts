import { ChessPiece } from '../../ChessPiece/ChessPiece'
import { ChessPieceType } from '../../ChessPiece/ChessPiece.types'
import {
  MovementVector,
  MovementVectorDirection,
  isVectorDiagonal,
} from './ChessPieceMovement'
import { getTargetSquare } from './getSquareDetail.util'
import {
  PossibleMove,
  PossibleMovePromotion,
  getPromoteNotation,
} from './possibleMove'

type ResolveVectorArgs = GetPossiblePieceMovementArgs & {
  vector: MovementVector
  type: 'move-only' | 'move-attack' | 'attack-only' | 'knight'
}

const pawnPromoteTypes: ChessPieceType[] = ['queen', 'rook', 'bishop', 'knight']

export type GetPossiblePieceMovementArgs = {
  piece: ChessPiece
  board: ChessPiece[]
}

type VectorAccumulator = {
  squares: PossibleMove[]
  stop: boolean
}

export function getPossiblePieceMovement({
  piece,
  board,
}: GetPossiblePieceMovementArgs): PossibleMove[] {
  const movementVectors = piece.getMovementSquares()

  const isPawn = piece.isPawn

  return Object.entries(movementVectors).flatMap(([d, vector]) => {
    const direction = d as MovementVectorDirection
    if (direction === 'knight')
      return resolveVector({ vector, piece, board, type: 'knight' })
    if (isPawn) {
      if (isVectorDiagonal(direction))
        return resolveVector({ vector, piece, board, type: 'attack-only' })
      return resolveVector({ vector, piece, board, type: 'move-only' })
    }
    return resolveVector({
      vector,
      piece,
      board,
      type: 'move-attack',
    })
  })
}

function resolveVector({
  vector,
  piece,
  board,
  type,
}: ResolveVectorArgs): PossibleMove[] {
  const promote = piece.shouldPromoteAfterMove
  const res = vector.reduce<VectorAccumulator>(
    (acc, square) => {
      const isKnight = type === 'knight'
      if (acc.stop) return acc
      const targetSquare = getTargetSquare({
        square,
        player: piece.owner,
        pieces: board,
      })
      switch (targetSquare.owner) {
        case 'empty':
          if (type !== 'attack-only') {
            if (promote) {
              acc.squares.push(
                ...pawnPromoteTypes.map(
                  (promoteType) =>
                    ({
                      from: piece.location,
                      to: square,
                      type: 'promotion',
                      promoteTo: promoteType,
                    }) as PossibleMovePromotion,
                ),
              )
            } else
              acc.squares.push({
                from: piece.location,
                to: square,
                type: 'normal',
                notation: `${piece.location}${square}`,
              })
          }
          break
        case 'friend':
          acc.stop = !isKnight
          break
        case 'enemy':
          if (type !== 'move-only') {
            if (promote) {
              acc.squares.push(
                ...pawnPromoteTypes.map<PossibleMovePromotion>(
                  (promoteType) => ({
                    from: piece.location,
                    to: square,
                    type: 'promotion',
                    promoteTo: promoteType,
                    taken: targetSquare.piece,
                    notation: `${piece.location}${square}${getPromoteNotation(promoteType)}`,
                  }),
                ),
              )
            } else
              acc.squares.push({
                from: piece.location,
                to: square,
                type: 'capture',
                taken: targetSquare.piece,
                notation: `${piece.location}${square}`,
              })
          }

          acc.stop = !isKnight
          break
        default:
          throw new Error('Unexpected target square owner')
      }
      return acc
    },
    { squares: [], stop: false } as VectorAccumulator,
  )

  return res.squares
}
