import { ChessPieceIcon } from './ChessPieceIcon'
import { ChessPiece } from './ChessPiece'
import { ChessSquareState } from '../ChessSquare/ChessSquare.types'
import { cva } from 'class-variance-authority'

type ChessPieceUIProps = {
  piece: ChessPiece | null
  status: ChessSquareState
}

const iconVariants = cva('h-full w-full p-2', {
  variants: {
    color: {
      white: 'fill-gray-700 stroke-2 stroke-gray-200',
      black: 'fill-black stroke-2 stroke-gray-100',
    },
  },
})

export function ChessPieceUI({ piece, status }: ChessPieceUIProps) {
  if (!piece) return null

  const owner = piece.owner

  return (
    <ChessPieceIcon
      owner={piece.owner}
      type={piece.type}
      className={iconVariants({ color: owner })}
    />
  )
}

// type GetStrokeColorProps = {
//   status: ChessSquareState
//   piece: ChessPieceProp
// }

// function getStrokeColor({ status, piece }: GetStrokeColorProps) {
//   const pieceColor = piece.color

//   switch (status) {
//     // case 'selected':
//     //   return pieceColor === 'black' ? 'stroke-blue-300' : 'stroke-blue-900'
//     // case 'threatened':
//     //   return pieceColor === 'black' ? 'stroke-yellow-100' : 'stroke-yellow-500'
//     // case 'checked':
//     //   return pieceColor === 'black' ? 'stroke-red-100' : 'stroke-red-500'
//     // case 'disabled':
//     //   return pieceColor === 'black' ? 'stroke-gray-800' : 'stroke-gray-200'
//     default:
//       return pieceColor === 'black' ? 'fill-gray-900' : 'fill-gray-500'
//   }
// }
