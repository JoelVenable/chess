import { ChessHistoryNavigation } from '../ChessHistory/ChessHistoryNavigation'
import { Ranks } from '../ChessSquare/ChessSquare.interface'
import { ChessBoardRank } from './ChessBoardRank'

export const ChessBoardUI = () => {
  return (
    <div className="max-w-full">
      <div className="grid grid-cols-8 aspect-square w-full h-full">
        {Ranks.map((rank) => (
          <ChessBoardRank key={rank} rank={rank} />
        ))}
      </div>
      <ChessHistoryNavigation />
    </div>
  )
}
