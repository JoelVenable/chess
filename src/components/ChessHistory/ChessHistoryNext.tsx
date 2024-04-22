import { useShallow } from 'zustand/react/shallow'
import { useChessBoardStore } from '../ChessBoard/ChessBoard.store'
import { FaArrowRight } from 'react-icons/fa6'
import { Button } from '../ui/button'

export const ChessHistoryNext = () => {
  const nav = useChessBoardStore(
    useShallow((state) => ({
      next: state.navigation.next,
      hasNext: state.navigation.hasNext,
    })),
  )

  return (
    <Button
      disabled={!nav.hasNext}
      variant="ghost"
      onClick={nav.next}
      className="h-8 w-8 m-2"
    >
      <FaArrowRight />
    </Button>
  )
}
