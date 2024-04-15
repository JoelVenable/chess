import { createStore } from 'zustand'
import { ChessMoveHistory } from './ChessHistory.interface'

export type ChessHistoryStoreType = {
  moves: ChessMoveHistory
  addMove: (color: 'white' | 'black', move: string) => void
}

export const ChessHistoryStore = createStore<ChessHistoryStoreType>((set) => ({
  moves: {
    white: [],
    black: [],
  },
  addMove: (color: 'white' | 'black', move: string) => {
    set((state) => ({
      moves: {
        ...state.moves,
        [color]: [...state.moves[color], move],
      },
    }))
  },
}))
