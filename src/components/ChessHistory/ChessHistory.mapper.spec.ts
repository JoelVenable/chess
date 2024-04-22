import { ChessHistoryMapper } from './ChessHistory.mapper'
import { ChessEngine } from '../ChessEngine/ChessEngine'
import { ChessPiece } from '../ChessPiece/ChessPiece'
import { ChessMoveHistory, PlayerColor } from './ChessHistory.interface'
import { defaultBoardStart } from './default-board-start'

type Case = {
  it: string
  history: ChessMoveHistory
  startingState: ChessPiece[]
  startingPlayer: PlayerColor
  currentPlayer: PlayerColor
  currentTurn: number
  boardState: ChessPiece[]
  currentMove?: string
}

const startingState = defaultBoardStart()

const history: ChessMoveHistory = {
  white: ['e2e4', 'a2a4', 'b1c3', 'a4a5', 'a5b6', 'b6c7', 'c7b8r'],
  black: ['e7e5', 'g8f6', 'f6e4', 'b7b5', 'f8e7', 'e8g8'],
}

const whiteOneBoardState = startingState.map((piece) => {
  if (piece.location === 'e2')
    return ChessPiece.Pawn({
      owner: 'white',
      location: 'e4',
      movedLastTurn: true,
      qtyMoves: 1,
    })
  return piece
})

const blackOneBoardState = whiteOneBoardState.map((piece) => {
  if (piece.location === 'e7')
    return ChessPiece.Pawn({
      owner: 'black',
      location: 'e5',
      movedLastTurn: true,
      qtyMoves: 1,
    })
  return piece
})

const whiteTwoBoardState = blackOneBoardState.map((piece) => {
  if (piece.location === 'a2')
    return ChessPiece.Pawn({
      owner: 'white',
      location: 'a4',
      movedLastTurn: true,
      qtyMoves: 1,
    })
  if (piece.location === 'e4')
    return ChessPiece.Pawn({
      owner: 'white',
      location: 'e4',
      movedLastTurn: false,
      qtyMoves: 1,
    })
  return piece
})

const blackTwoBoardState = whiteTwoBoardState.map((piece) => {
  if (piece.location === 'g8')
    return ChessPiece.Knight({
      owner: 'black',
      location: 'f6',
      movedLastTurn: true,
      qtyMoves: 1,
    })
  if (piece.location === 'e5')
    return ChessPiece.Pawn({
      owner: 'black',
      location: 'e5',
      movedLastTurn: false,
      qtyMoves: 1,
    })
  return piece
})

const whiteThreeBoardState = blackTwoBoardState.map((piece) => {
  if (piece.location === 'b1')
    return ChessPiece.Knight({
      owner: 'white',
      location: 'c3',
      movedLastTurn: true,
      qtyMoves: 1,
    })

  if (piece.location === 'a4')
    return ChessPiece.Pawn({
      owner: 'white',
      location: 'a4',
      movedLastTurn: false,
      qtyMoves: 1,
    })
  return piece
})

// demonstrates a piece taken
const blackThreeBoardState = whiteThreeBoardState
  .filter((el) => el.location !== 'e4')
  .map((piece) => {
    if (piece.location === 'f6')
      return ChessPiece.Knight({
        owner: 'black',
        location: 'e4',
        movedLastTurn: true,
        qtyMoves: 2,
      })
    return piece
  })

const whiteFourBoardState = blackThreeBoardState.map((piece) => {
  if (piece.location === 'a4')
    return ChessPiece.Pawn({
      owner: 'white',
      location: 'a5',
      movedLastTurn: true,
      qtyMoves: 2,
    })
  if (piece.location === 'c3')
    return ChessPiece.Knight({
      owner: 'white',
      location: 'c3',
      movedLastTurn: false,
      qtyMoves: 1,
    })
  return piece
})

const blackFourBoardState = whiteFourBoardState.map((piece) => {
  if (piece.location === 'e4')
    return ChessPiece.Knight({
      owner: 'black',
      location: 'e4',
      movedLastTurn: false,
      qtyMoves: 2,
    })
  if (piece.location === 'b7')
    return ChessPiece.Pawn({
      owner: 'black',
      location: 'b5',
      movedLastTurn: true,
      qtyMoves: 1,
    })
  return piece
})

// demonstrates en passant
const whiteFiveBoardState = blackFourBoardState
  .filter((el) => el.location !== 'b5')
  .map((piece) => {
    if (piece.location === 'a5')
      return ChessPiece.Pawn({
        owner: 'white',
        location: 'b6',
        movedLastTurn: true,
        qtyMoves: 3,
      })
    return piece
  })

const blackFiveBoardState = whiteFiveBoardState.map((piece) => {
  if (piece.location === 'f8')
    return ChessPiece.Bishop({
      owner: 'black',
      location: 'e7',
      movedLastTurn: true,
      qtyMoves: 1,
    })
  return piece
})

const whiteSixBoardState = blackFiveBoardState
  .filter((el) => el.location !== 'c7')
  .map((piece) =>
    piece.location === 'b6'
      ? ChessPiece.Pawn({
          owner: 'white',
          location: 'c7',
          movedLastTurn: true,
          qtyMoves: 4,
        })
      : piece,
  )

// demonstrates castle
const blackSixBoardState = whiteSixBoardState.map((piece) => {
  if (piece.location === 'e7')
    return ChessPiece.Bishop({
      owner: 'black',
      location: 'e7',
      movedLastTurn: false,
      qtyMoves: 1,
    })
  if (piece.location === 'e8')
    return ChessPiece.King({
      owner: 'black',
      location: 'g8',
      movedLastTurn: true,
      qtyMoves: 1,
    })
  if (piece.location === 'h8')
    return ChessPiece.Rook({
      owner: 'black',
      location: 'f8',
      movedLastTurn: true,
      qtyMoves: 1,
    })

  return piece
})

const whiteSevenBoardState = blackSixBoardState
  // took black knight
  .filter((el) => el.location !== 'b8')
  .map((piece) => {
    if (piece.location === 'c7')
      // pawn promoted to queen
      return ChessPiece.Rook({
        owner: 'white',
        location: 'b8',
        movedLastTurn: true,
        qtyMoves: 5,
      })
    return piece
  })

const cases: Case[] = [
  {
    it: 'handles white move 1',
    history,
    startingState,
    startingPlayer: 'white',
    currentPlayer: 'white',
    currentTurn: 1,
    boardState: startingState,
    currentMove: history.white[0],
  },
  {
    it: 'handles black move 1',
    history,
    startingState,
    startingPlayer: 'white',
    currentPlayer: 'black',
    currentTurn: 1,
    boardState: whiteOneBoardState,
    currentMove: history.black[0],
  },
  {
    it: 'handles white move 2',
    history,
    startingState,
    startingPlayer: 'white',
    currentPlayer: 'white',
    currentTurn: 2,
    boardState: blackOneBoardState,
    currentMove: history.white[1],
  },
  {
    it: 'handles black move 2',
    history,
    startingState,
    startingPlayer: 'white',
    currentPlayer: 'black',
    currentTurn: 2,
    boardState: whiteTwoBoardState,
    currentMove: history.black[1],
  },
  {
    it: 'handles white move 3',
    history,
    startingState,
    startingPlayer: 'white',
    currentPlayer: 'white',
    currentTurn: 3,
    boardState: blackTwoBoardState,
    currentMove: history.white[2],
  },
  {
    it: 'handles black move 3',
    history,
    startingState,
    startingPlayer: 'white',
    currentPlayer: 'black',
    currentTurn: 3,
    boardState: whiteThreeBoardState,
    currentMove: history.black[2],
  },
  {
    it: 'handles white move 4 (after black took white pawn)',
    history,
    startingState,
    startingPlayer: 'white',
    currentPlayer: 'white',
    currentTurn: 4,
    boardState: blackThreeBoardState,
    currentMove: history.white[3],
  },
  {
    it: 'handles black move 4',
    history,
    startingState,
    startingPlayer: 'white',
    currentPlayer: 'black',
    currentTurn: 4,
    boardState: whiteFourBoardState,
    currentMove: history.black[3],
  },
  {
    it: 'handles white move 5',
    history,
    startingState,
    startingPlayer: 'white',
    currentPlayer: 'white',
    currentTurn: 5,
    boardState: blackFourBoardState,
    currentMove: history.white[4],
  },
  {
    it: 'handles black move 5 (post en passant)',
    history,
    startingState,
    startingPlayer: 'white',
    currentPlayer: 'black',
    currentTurn: 5,
    boardState: whiteFiveBoardState,
    currentMove: history.black[4],
  },
  {
    it: 'handles white move 6',
    history,
    startingState,
    startingPlayer: 'white',
    currentPlayer: 'white',
    currentTurn: 6,
    boardState: blackFiveBoardState,
    currentMove: history.white[5],
  },
  {
    it: 'handles black move 6',
    history,
    startingState,
    startingPlayer: 'white',
    currentPlayer: 'black',
    currentTurn: 6,
    boardState: whiteSixBoardState,
    currentMove: history.black[5],
  },
  {
    it: 'handles white move 7 (post castle)',
    history,
    startingState,
    startingPlayer: 'white',
    currentPlayer: 'white',
    currentTurn: 7,
    boardState: blackSixBoardState,
    currentMove: history.white[6],
  },
  {
    it: 'handles black move 7 (post promotion) and current board state',
    history,
    startingState,
    startingPlayer: 'white',
    currentPlayer: 'black',
    currentTurn: 7,
    boardState: whiteSevenBoardState,
    currentMove: undefined,
  },
]

describe('ChessHistoryMapper', () => {
  cases.forEach((c) => {
    it(c.it, () => {
      const { engine, currentMove } = ChessHistoryMapper(c)
      expect(engine).toBeInstanceOf(ChessEngine)
      expect(engine.pieces.map((p) => p.toString()).sort()).toStrictEqual(
        c.boardState.map((p) => p.toString()).sort(),
      )
      expect(engine.activePlayer).toEqual(c.currentPlayer)
      expect(currentMove).toEqual(c.currentMove)
    })
  })
})
