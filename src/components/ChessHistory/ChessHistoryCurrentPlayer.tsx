import { useShallow } from 'zustand/react/shallow'
import { useChessBoardStore } from '../ChessBoard/ChessBoard.store'

export const ChessHistoryCurrentPlayer = () => {
  const currentPlayer = useChessBoardStore(
    useShallow((state) => state.navigation.player),
  )

  return (
    <div className="h-full w-20 flex flex-col items-center">
      <p>Player:</p>
      <p>{currentPlayer}</p>
    </div>
  )
}
