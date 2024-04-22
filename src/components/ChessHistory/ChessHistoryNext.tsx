import { useShallow } from 'zustand/react/shallow'
import { useChessBoardStore } from '../ChessBoard/ChessBoard.store'
import { FaArrowRight } from 'react-icons/fa6'
import { Button } from '../ui/button'
import { cva } from 'class-variance-authority'

const arrowVariant = cva('h-full w-full', {
  variants: {
    disabled: {
      true: 'fill-slate-400',
      false: 'fill-slate-700',
    },
  },
})

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
      className="h-12 w-12"
    >
      <FaArrowRight className={arrowVariant({ disabled: !nav.hasNext })} />
    </Button>
  )
}
