import { useShallow } from 'zustand/react/shallow'
import { useChessBoardStore } from '../ChessBoard/ChessBoard.store'
import { FaArrowLeft } from 'react-icons/fa6'
import { Button } from '../ui/button'
import { cva } from 'class-variance-authority'

const arrowVariant = cva('h-full w-full', {
  variants: {
    disabled: {
      true: 'fill-slate-300',
      false: 'fill-slate-700',
    },
  },
})

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
      className="h-12 w-12"
    >
      <FaArrowLeft className={arrowVariant({ disabled: !nav.hasPrevious })} />
    </Button>
  )
}
