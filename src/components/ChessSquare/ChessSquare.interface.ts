export const Ranks = ['8', '7', '6', '5', '4', '3', '2', '1'] as const

export const Files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const

export type ChessSquareRank = (typeof Ranks)[number]

export type ChessSquareFile = (typeof Files)[number]

export type ChessSquareNotation = `${ChessSquareFile}${ChessSquareRank}`

export type ChessSquareColor = 'black' | 'white'

export const getRankFile = (square: ChessSquareNotation) => {
  return {
    rank: square[1] as ChessSquareRank,
    file: square[0] as ChessSquareFile,
  }
}

export type ConcatRankFileArg = {
  rank: ChessSquareRank
  file: ChessSquareFile
}

export const concatRankFile = ({ rank, file }: ConcatRankFileArg) =>
  `${file}${rank}` as ChessSquareNotation

export const getSquareColor = (
  square: ChessSquareNotation,
): ChessSquareColor => {
  const fileIndex = Files.indexOf(square[0] as ChessSquareFile)
  const rankIndex = Ranks.indexOf(square[1] as ChessSquareRank)

  return (fileIndex + rankIndex) % 2 === 0 ? 'black' : 'white'
}
