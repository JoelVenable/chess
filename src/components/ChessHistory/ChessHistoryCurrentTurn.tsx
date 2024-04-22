import { useShallow } from 'zustand/react/shallow'
import { useChessBoardStore } from '../ChessBoard/ChessBoard.store'

export const ChessHistoryCurrentTurn = () => {
  const turn = useChessBoardStore(useShallow((state) => state.navigation.turn))

  return (
    <div className="flex flex-col bg-slate-500 h-full w-20 items-center">
      <p>Turn:</p>
      <p>{turn}</p>
    </div>
  )
}
