import { ChessPiece } from '../ChessPiece/ChessPiece'
import {
  ChessMoveHistory,
  IChessHistoryStorage,
} from './ChessHistory.interface'
import { defaultBoardStart } from './default-board-start'
import { z } from 'zod'

const HistorySchema = z.object({
  white: z.array(z.string()),
  black: z.array(z.string()),
})

const localStorageVariable = 'chess-move-history'

export class ChessHistoryLocalStorage implements IChessHistoryStorage {
  getStartingBoardState(): ChessPiece[] {
    return defaultBoardStart()
  }
  getMoveHistory(): ChessMoveHistory {
    const storage = localStorage.getItem(localStorageVariable)
    if (!storage) return { white: [], black: [] }
    try {
      const history = JSON.parse(storage)
      this.#validate(history)
      return history
    } catch {
      localStorage.setItem(
        localStorageVariable,
        JSON.stringify({ white: [], black: [] }),
      )
      return { white: [], black: [] }
    }
  }

  #validate(history: ChessMoveHistory) {
    const parsed = HistorySchema.parse(history)
    const whiteLen = parsed.white.length
    const blackLen = parsed.black.length

    if (whiteLen !== blackLen && whiteLen !== blackLen + 1)
      throw new Error('Invalid history')
  }

  setMoveHistory(history: ChessMoveHistory): void {
    this.#validate(history)
    localStorage.setItem(localStorageVariable, JSON.stringify(history))
  }
}
