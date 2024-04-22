import {
  ChessSquareNotation,
  getRankFile,
} from '../ChessSquare/ChessSquare.interface'
import { PlayerColor } from '../ChessHistory/ChessHistory.interface'
import {
  MovementVectors,
  getChessPieceMovement,
} from '../ChessEngine/util/ChessPieceMovement'
import {
  ChessPieceType,
  ChessPieceProps,
  ChessPieceStaticProps,
  ChessPieceStorageNotation,
  ChessPiecePropsSchema,
  ChessPieceStorageNotationSchema,
} from './ChessPiece.types'

const charMap = {
  P: 'pawn',
  R: 'rook',
  N: 'knight',
  B: 'bishop',
  Q: 'queen',
  K: 'king',
} as const

const typeMap = {
  pawn: 'P',
  rook: 'R',
  knight: 'N',
  bishop: 'B',
  queen: 'Q',
  king: 'K',
} as const

export class ChessPiece {
  #type: ChessPieceType
  #owner: PlayerColor
  #location: ChessSquareNotation
  #movedLastTurn: boolean
  #qtyMoves: number

  get isValidEnPassantTarget() {
    if (this.type !== 'pawn') return false
    if (!this.movedLastTurn || this.qtyMoves !== 1) return false
    const { rank } = getRankFile(this.location)
    switch (this.owner) {
      case 'white':
        return rank === '4'
      case 'black':
        return rank === '5'
    }
  }

  get type() {
    return this.#type
  }

  get owner() {
    return this.#owner
  }

  get location() {
    return this.#location
  }

  get movedLastTurn() {
    return this.#movedLastTurn
  }

  get qtyMoves() {
    return this.#qtyMoves
  }

  get isPawn() {
    return this.type === 'pawn'
  }

  get isRook() {
    return this.type === 'rook'
  }

  get isKnight() {
    return this.type === 'knight'
  }

  get isBishop() {
    return this.type === 'bishop'
  }

  get isQueen() {
    return this.type === 'queen'
  }

  get isKing() {
    return this.type === 'king'
  }

  constructor(props: ChessPieceProps) {
    const { owner, location, movedLastTurn, qtyMoves, type } =
      ChessPiecePropsSchema.parse(props)
    this.#owner = owner
    this.#location = location as ChessSquareNotation
    this.#movedLastTurn = movedLastTurn
    this.#qtyMoves = qtyMoves
    this.#type = type
  }

  get hasMoved() {
    return this.qtyMoves > 0
  }

  move(to: ChessSquareNotation) {
    return new ChessPiece({
      ...this,
      location: to,
      movedLastTurn: true,
      qtyMoves: this.qtyMoves + 1,
    })
  }

  get shouldPromoteAfterMove() {
    if (this.type !== 'pawn') return false
    const { rank } = getRankFile(this.location)
    switch (this.owner) {
      case 'white':
        return rank === '7'
      case 'black':
        return rank === '2'
    }
  }

  toString() {
    return `${this.owner} ${this.type} at ${this.location}, lastMoved: ${this.movedLastTurn}, moves: ${this.qtyMoves}`
  }

  serialize(): ChessPieceStorageNotation {
    const o = this.owner === 'white' ? 'w' : 'b'
    const t = typeMap[this.type]
    const l = this.location
    const m = this.movedLastTurn ? 'Y' : 'N'
    const q = `${this.qtyMoves}`
    return `${o}${t}${l}${m}${q}` as ChessPieceStorageNotation
  }

  static deserialize(serialized: string) {
    const str = ChessPieceStorageNotationSchema.parse(serialized)
    const owner = str[0] === 'w' ? 'white' : 'black'
    const type = charMap[str[1] as keyof typeof charMap]
    const location = str.slice(2, 4) as ChessSquareNotation
    const movedLastTurn = str[4] === 'Y'
    const qtyMoves = parseInt(str.slice(5))
    return new ChessPiece({ owner, location, movedLastTurn, qtyMoves, type })
  }

  getMovementSquares(): MovementVectors {
    return getChessPieceMovement({
      square: this.location,
      type: this.type,
      player: this.owner,
    })
  }

  static Pawn(props: ChessPieceStaticProps) {
    return new ChessPiece({ ...props, type: 'pawn' })
  }

  static Rook(props: ChessPieceStaticProps) {
    return new ChessPiece({ ...props, type: 'rook' })
  }

  static Knight(props: ChessPieceStaticProps) {
    return new ChessPiece({ ...props, type: 'knight' })
  }

  static Bishop(props: ChessPieceStaticProps) {
    return new ChessPiece({ ...props, type: 'bishop' })
  }

  static Queen(props: ChessPieceStaticProps) {
    return new ChessPiece({ ...props, type: 'queen' })
  }

  static King(props: ChessPieceStaticProps) {
    return new ChessPiece({ ...props, type: 'king' })
  }
}
