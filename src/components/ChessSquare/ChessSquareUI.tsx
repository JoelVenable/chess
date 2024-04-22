import { cva } from 'class-variance-authority'
import { ChessPiece } from '../ChessPiece/ChessPiece'
import { ChessPieceUI } from '../ChessPiece/ChessPieceUI'
import { ChessSquareState } from './ChessSquare.types'

const chessSquareVariants = cva('aspect-square', {
  variants: {
    squareColor: {
      black: '',
      white: '',
    },
    status: {
      moveTarget: '',
      selected: '',
      threatened: '',
      disabled: '',
      checked: '',
      moveSource: '',
    },
    enabled: {
      true: 'cursor-pointer',
      false: '',
    },
  },
  compoundVariants: [
    {
      squareColor: 'black',
      status: 'disabled',
      className: 'bg-gray-500',
    },
    {
      squareColor: 'white',
      status: 'disabled',
      className: 'bg-gray-200',
    },
    {
      squareColor: 'black',
      status: 'moveTarget',
      className: 'bg-green-500',
    },
    {
      squareColor: 'white',
      status: 'moveTarget',
      className: 'bg-green-300',
    },
    {
      squareColor: 'black',
      status: 'selected',
      className: 'bg-blue-500',
    },
    {
      squareColor: 'white',
      status: 'selected',
      className: 'bg-blue-300',
    },
    {
      squareColor: 'black',
      status: 'threatened',
      className: 'bg-orange-700',
    },
    {
      squareColor: 'white',
      status: 'threatened',
      className: 'bg-orange-500',
    },
    {
      squareColor: 'black',
      status: 'checked',
      className: 'bg-red-500',
    },
    {
      squareColor: 'white',
      status: 'checked',
      className: 'bg-red-300',
    },
    {
      squareColor: 'black',
      status: 'moveSource',
      className: 'bg-purple-600',
    },
    {
      squareColor: 'white',
      status: 'moveSource',
      className: 'bg-purple-400',
    },
  ],
})

export type ChessSquareUIProps = {
  squareColor: 'black' | 'white'
  status: ChessSquareState
  handleClick: () => void
  piece: ChessPiece | null
}

export function ChessSquareUI({
  squareColor,
  piece,
  status,
  handleClick,
}: ChessSquareUIProps) {
  return (
    <div
      className={chessSquareVariants({
        squareColor,
        status,
        enabled: status !== 'disabled',
      })}
      onClick={handleClick}
    >
      <ChessPieceUI piece={piece} status={status!} />
    </div>
  )
}
