import { create } from 'zustand'
import {
  PossibleMovePromotion,
  PossibleMoveResult,
} from '../ChessEngine/util/possibleMove'
import { ChessHistory } from '../ChessHistory/ChessHistory.impl'
import {
  IChessHistoryNavigationControl,
  ChessMoveHistory,
} from '../ChessHistory/ChessHistory.interface'
import { ChessHistoryLocalStorage } from '../ChessHistory/ChessHistoryLocalStorage.adapter'
import { ChessPiece } from '../ChessPiece/ChessPiece'
import { ChessSquareNotation } from '../ChessSquare/ChessSquare.interface'
import { ChessPieceType } from '../ChessPiece/ChessPiece.types'

export type ChessBoardStoreType = {
  navigation: IChessHistoryNavigationControl
  moveHistory: ChessMoveHistory
  pieces: ChessPiece[]
  availableMoveSources: ChessSquareNotation[]
  moves: PossibleMoveResult[]
  selectedSquare: ChessSquareNotation | null
  promotion: {
    to: ChessSquareNotation
    promoteTo: ChessPieceType[]
  } | null
  promote(to: ChessPieceType): void
  selectSquare: (square: ChessSquareNotation) => void
  reset(): void
}

type SetStateFn = (
  fn: (state: ChessBoardStoreType) => ChessBoardStoreType,
) => void

const history = new ChessHistory({ storage: new ChessHistoryLocalStorage() })

const getState = (
  set: SetStateFn,
): Omit<
  ChessBoardStoreType,
  | 'selectedSquare'
  | 'selectSquare'
  | 'moves'
  | 'promotion'
  | 'promote'
  | 'reset'
> => {
  const navigation = history.getNavigation()
  return {
    navigation: {
      ...navigation,
      next: () =>
        set((state) => {
          history.next()
          return { ...state, ...getState(set) }
        }),
      previous: () => {
        history.previous()
        set((state) => ({ ...state, ...getState(set) }))
      },
    },
    moveHistory: history.history,
    availableMoveSources: Object.keys(history.moves) as ChessSquareNotation[],
    pieces: history.pieces,
  }
}

export const useChessBoardStore = create<ChessBoardStoreType>((set) => ({
  ...getState(set),
  selectedSquare: null,
  moves: [],
  promotion: null,
  reset: () => {
    set((state) => {
      history.reset()
      return {
        ...state,
        ...getState(set),
        selectedSquare: null,
        moves: [],
        promotion: null,
      }
    })
  },
  selectSquare: (square: ChessSquareNotation) =>
    set((state) => {
      if (!state.navigation.playEnabled || state.promotion) return state
      if (state.availableMoveSources.includes(square)) {
        return {
          ...state,
          selectedSquare: square,
          moves: history.moves[square] || [],
        }
      }
      if (!state.selectedSquare) return state
      // get move target
      const moves = state.moves.filter((m) => m.move.to === square)
      if (!moves.length) return state
      // handle promotion
      if (moves.every((res) => res.move.type === 'promotion')) {
        return {
          ...state,
          promotion: {
            to: square,
            promoteTo: moves.map(
              (m) => (m.move as PossibleMovePromotion).promoteTo,
            ),
          },
        }
      }
      // move piece
      if (moves.length !== 1) throw new Error('Expected a single move')
      const move = moves[0]
      history.move(move.move.notation)
      return {
        ...state,
        selectedSquare: null,
        moves: [],
        ...getState(set),
      }
    }),
  promote: (to: ChessPieceType) =>
    set((state) => {
      const p = state.promotion
      if (!p) return state
      const move = state.moves.find((m) => {
        if (m.move.to !== p.to) return false
        if (m.move.type !== 'promotion') return false
        return (m.move as PossibleMovePromotion).promoteTo === to
      })
      if (!move) return state
      history.move(move.move.notation)
      return {
        ...state,
        selectedSquare: null,
        promotion: null,
        moves: [],
        ...getState(set),
      }
    }),
}))
