import { ChessBoardUI } from './components/ChessBoard/ChessBoardUI'
import { TopNav } from './components/TopNav/TopNav'

export const App = () => {
  return (
    <div className="flex flex-col w-full">
      <TopNav />
      <ChessBoardUI />
    </div>
  )
}
