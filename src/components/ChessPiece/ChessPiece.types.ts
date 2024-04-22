import { PlayerColor } from '../ChessHistory/ChessHistory.interface'
import { ChessSquareNotation } from '../ChessSquare/ChessSquare.interface'
import { z } from 'zod'

export const ChessPieceTypeSchema = z.enum([
  'pawn',
  'rook',
  'knight',
  'bishop',
  'queen',
  'king',
])

export const ChessPieceSquareSchema = z.string().regex(/^[a-h][1-8]$/)

export const ChessPlayerSchema = z.enum(['white', 'black'])

export const ChessPiecePropsSchema = z.object({
  owner: ChessPlayerSchema,
  location: ChessPieceSquareSchema,
  movedLastTurn: z.boolean(),
  qtyMoves: z.number(),
  type: ChessPieceTypeSchema,
})

export type ChessPieceType = z.infer<typeof ChessPieceTypeSchema>

export type ChessPieceProps = {
  owner: PlayerColor
  location: ChessSquareNotation
  movedLastTurn: boolean
  qtyMoves: number
  type: ChessPieceType
}

export type ChessPieceStaticProps = Omit<ChessPieceProps, 'type'>

export const ChessPieceStorageNotationSchema = z
  .string()
  .regex(/^[wb][PRNBQK][a-h][1-8][YN]\d$/)

export type ChessHistoryPlayerNotation = 'w' | 'b'

export type ChessHistoryStorageTypeNotation = 'P' | 'R' | 'N' | 'B' | 'Q' | 'K'

export type ChessHistoryMovedLastTurnNotation = 'Y' | 'N'

export type ChessHistoryQtyMovesNotation = `${number}`

export type ChessPieceStorageNotation =
  `${ChessHistoryPlayerNotation}${ChessHistoryStorageTypeNotation}${ChessSquareNotation}${ChessHistoryMovedLastTurnNotation}${ChessHistoryQtyMovesNotation}`
