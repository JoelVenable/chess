import { PlayerColor } from '../../ChessHistory/ChessHistory.interface'
import { ChessPieceType } from '../../ChessPiece/ChessPiece.types'
import {
  ChessSquareNotation,
  Files,
  ChessSquareFile,
  Ranks,
  ChessSquareRank,
} from '../../ChessSquare/ChessSquare.interface'

type TranslateArgs = {
  files: number
  ranks: number
  square: ChessSquareNotation
}

export type MovementVectorDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'upLeft'
  | 'upRight'
  | 'downLeft'
  | 'downRight'
  | 'knight'

export type MovementVector = ChessSquareNotation[]

export function isVectorDiagonal(direction: MovementVectorDirection): boolean {
  return ['upRight', 'upLeft', 'downRight', 'downLeft'].includes(direction)
}

export type MovementVectors = Partial<
  Record<MovementVectorDirection, MovementVector>
>

/** Given a square and a number of ranks and files, return the adjusted position.  Returns `null` if outside the bounds of the chessboard. */
export function translateSquare({
  square,
  files,
  ranks,
}: TranslateArgs): ChessSquareNotation | null {
  const fileIndex = Files.indexOf(square[0] as ChessSquareFile)
  const rankIndex = Ranks.indexOf(square[1] as ChessSquareRank)

  const newFileIndex = fileIndex + files
  const newRankIndex = rankIndex + ranks

  if (newFileIndex < 0 || newFileIndex > 7) return null
  if (newRankIndex < 0 || newRankIndex > 7) return null

  return `${Files[newFileIndex]}${Ranks[newRankIndex]}` as ChessSquareNotation
}

function diagonal(square: ChessSquareNotation, max = 8): MovementVectors {
  const upRight: ChessSquareNotation[] = []
  const upLeft: ChessSquareNotation[] = []
  const downRight: ChessSquareNotation[] = []
  const downLeft: ChessSquareNotation[] = []

  for (let i = 1; i <= max; i++) {
    const upRightRes = translateSquare({ square, files: i, ranks: -i })
    if (upRightRes) upRight.push(upRightRes)

    const upLeftRes = translateSquare({ square, files: -i, ranks: -i })
    if (upLeftRes) upLeft.push(upLeftRes)

    const downRightRes = translateSquare({ square, files: i, ranks: i })
    if (downRightRes) downRight.push(downRightRes)

    const downLeftRes = translateSquare({ square, files: -i, ranks: i })
    if (downLeftRes) downLeft.push(downLeftRes)
  }
  return { upRight, upLeft, downRight, downLeft }
}

function rankFile(square: ChessSquareNotation, max = 8): MovementVectors {
  const up: ChessSquareNotation[] = [],
    down: ChessSquareNotation[] = [],
    left: ChessSquareNotation[] = [],
    right: ChessSquareNotation[] = []

  for (let i = 1; i <= max; i++) {
    const upRes = translateSquare({ square, files: 0, ranks: -i })
    if (upRes) up.push(upRes)

    const downRes = translateSquare({ square, files: 0, ranks: i })
    if (downRes) down.push(downRes)

    const rightRes = translateSquare({ square, files: i, ranks: 0 })
    if (rightRes) right.push(rightRes)

    const leftRes = translateSquare({ square, files: -i, ranks: 0 })
    if (leftRes) left.push(leftRes)
  }
  return { up, down, left, right }
}

function knight(square: ChessSquareNotation): MovementVectors {
  const knight: MovementVector = [
    translateSquare({ square, files: 1, ranks: 2 }),
    translateSquare({ square, files: 2, ranks: 1 }),
    translateSquare({ square, files: 2, ranks: -1 }),
    translateSquare({ square, files: 1, ranks: -2 }),
    translateSquare({ square, files: -1, ranks: -2 }),
    translateSquare({ square, files: -2, ranks: -1 }),
    translateSquare({ square, files: -2, ranks: 1 }),
    translateSquare({ square, files: -1, ranks: 2 }),
  ].filter(Boolean) as MovementVector

  return { knight }
}

export type GetChessPieceMovementProps = {
  square: ChessSquareNotation
  type: ChessPieceType
  player: PlayerColor
}

/** Gets the possible movement of a piece, WITHOUT taking board state into account. */
export const getChessPieceMovement = ({
  square,
  type,
  player,
}: GetChessPieceMovementProps): MovementVectors => {
  switch (type) {
    case 'bishop':
      return diagonal(square)
    case 'rook':
      return rankFile(square)
    case 'knight':
      return knight(square)
    case 'queen':
      return { ...diagonal(square), ...rankFile(square) }
    case 'king':
      return { ...diagonal(square, 1), ...rankFile(square, 1) }
    case 'pawn':
      return handlePawnMovement(square, player)
  }
}

function handlePawnMovement(
  square: ChessSquareNotation,
  player: PlayerColor,
): MovementVectors {
  const moveDirection = player === 'white' ? 'up' : 'down'
  const moves: ChessSquareNotation[] = []
  const shouldAllowTwoSquares =
    player === 'white' ? square[1] === '2' : square[1] === '7'
  const direction = player === 'white' ? -1 : 1
  const one = translateSquare({ square, files: 0, ranks: direction })
  if (one) moves.push(one)
  if (shouldAllowTwoSquares) {
    const two = translateSquare({ square, files: 0, ranks: direction * 2 })
    if (two) moves.push(two)
  }

  const attackRightDirection =
    `${moveDirection}Right` as MovementVectorDirection
  const attackLeftDirection = `${moveDirection}Left` as MovementVectorDirection
  const attackRight = translateSquare({
    square,
    files: 1,
    ranks: direction,
  })

  const attackLeft = translateSquare({
    square,
    files: -1,
    ranks: direction,
  })

  return {
    [moveDirection]: moves,
    [attackRightDirection]: [attackRight],
    [attackLeftDirection]: [attackLeft],
  }
}
