import { ChessHistoryCurrentPlayer } from './ChessHistoryCurrentPlayer'
import { ChessHistoryCurrentTurn } from './ChessHistoryCurrentTurn'
import { ChessHistoryPrevious } from './ChessHistoryPrevious'
import { ChessHistoryNext } from './ChessHistoryNext'

export const ChessHistoryNavigation = () => {
  return (
    <div className="w-full h-12 bg-slate-400 flex justify-center">
      <ChessHistoryPrevious />
      <ChessHistoryCurrentTurn />
      <ChessHistoryCurrentPlayer />
      <ChessHistoryNext />
    </div>
  )
}
