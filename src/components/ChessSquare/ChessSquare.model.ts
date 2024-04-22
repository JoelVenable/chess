import {
  ChessSquareRank,
  ChessSquareFile,
  Files,
  Ranks,
} from './ChessSquare.interface'

export type ChessSquareModelProps = {
  rank: ChessSquareRank
  file: ChessSquareFile
}

export class ChessSquareModel {
  constructor(props: ChessSquareModelProps) {
    const { rank, file } = props
    this.#rank = rank
    this.#file = file
  }

  #rank: ChessSquareRank
  #file: ChessSquareFile

  get rank() {
    return this.#rank
  }

  get file() {
    return this.#file
  }

  get squareColor() {
    const fileIndex = Files.indexOf(this.#file)
    const rankIndex = Ranks.indexOf(this.#rank)

    return (fileIndex + rankIndex) % 2 === 0 ? 'black' : 'white'
  }
}
