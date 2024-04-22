import { ChessSquare } from '../ChessSquare/ChessSquare'
import { ChessSquareRank, Files } from '../ChessSquare/ChessSquare.interface'

type ChessBoardRankProps = {
  rank: ChessSquareRank
}

export function ChessBoardRank({ rank }: ChessBoardRankProps) {
  return (
    <>
      {Files.map((file) => {
        return <ChessSquare key={`${file}${rank}`} rank={rank} file={file} />
      })}
    </>
  )
}
