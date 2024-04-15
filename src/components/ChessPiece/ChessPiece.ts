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
} from './ChessPiece.types'

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

  constructor({
    owner,
    location,
    movedLastTurn,
    qtyMoves,
    type,
  }: ChessPieceProps) {
    this.#owner = owner
    this.#location = location
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
