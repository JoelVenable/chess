import { useShallow } from 'zustand/react/shallow'
import {
  ChessSquareRank,
  ChessSquareFile,
  ChessSquareNotation,
  Files,
  Ranks,
} from './ChessSquare.interface'
import { ChessSquareUI } from './ChessSquareUI'
import { useChessBoardStore } from '../ChessBoard/ChessBoard.store'
import { ChessPiece } from '../ChessPiece/ChessPiece'
import { ChessSquareState } from './ChessSquare.types'
import { MoveNotation } from '../ChessEngine/util/possibleMove'

export type ChessSquareProps = {
  rank: ChessSquareRank
  file: ChessSquareFile
}

export const ChessSquare = ({ rank, file }: ChessSquareProps) => {
  const square = `${file}${rank}` as ChessSquareNotation
  const squareColor = getSquareColor(square)

  const state = useChessBoardStore(
    useShallow((state) => {
      return {
        isSelected: state.selectedSquare === square,
        isMoveSource: state.availableMoveSources.includes(square),
        occupant: state.pieces.find((p) => p.location === square),
        moveTarget: state.moves.some((m) => m.move.to === square),
        select: state.selectSquare,
        playEnabled: state.navigation.playEnabled,
        currentMove: state.navigation.currentMove,
      }
    }),
  )

  const squareStatus = getSquareState({ ...state, square })
  return (
    <ChessSquareUI
      squareColor={squareColor}
      piece={state.occupant ?? null}
      status={squareStatus}
      handleClick={() => state.select(square)}
    />
  )
}

function getSquareColor(square: ChessSquareNotation) {
  const fileIndex = Files.indexOf(square[0] as ChessSquareFile)
  const rankIndex = Ranks.indexOf(square[1] as ChessSquareRank)

  return (fileIndex + rankIndex) % 2 === 0 ? 'black' : 'white'
}

type GetSquareStateProps = {
  isMoveSource: boolean
  isSelected: boolean
  occupant: ChessPiece | undefined
  moveTarget: boolean
  playEnabled: boolean
  square: ChessSquareNotation
  currentMove: MoveNotation | null
}

function getSquareState({
  isMoveSource,
  isSelected,
  occupant,
  moveTarget,
  playEnabled,
  square,
  currentMove,
}: GetSquareStateProps): ChessSquareState {
  const from = currentMove?.slice(0, 2)
  const to = currentMove?.slice(2, 4)
  if (from === square) return 'moveSource'
  if (to === square) return 'moveTarget'
  if (!playEnabled) return 'disabled'
  if (isSelected) return 'selected'
  if (moveTarget) {
    if (occupant?.type === 'king') return 'checked'
    if (occupant) return 'threatened'
    return 'moveTarget'
  }
  if (isMoveSource) return 'moveSource'
  return 'disabled'
}
