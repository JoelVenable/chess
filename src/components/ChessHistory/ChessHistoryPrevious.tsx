import { useShallow } from 'zustand/react/shallow'
import { useChessBoardStore } from '../ChessBoard/ChessBoard.store'
import { FaArrowLeft } from 'react-icons/fa6'
import { Button } from '../ui/button'

export const ChessHistoryPrevious = () => {
  const nav = useChessBoardStore(
    useShallow((state) => ({
      previous: state.navigation.previous,
      hasPrevious: state.navigation.hasPrevious,
    })),
  )

  return (
    <Button
      disabled={!nav.hasPrevious}
      variant="ghost"
      onClick={nav.previous}
      className="h-8 w-8 m-2"
    >
      <FaArrowLeft className="h-full w-full" />
    </Button>
  )
}
