import { ChessEngine } from '../ChessEngine/ChessEngine'
import { MoveNotation } from '../ChessEngine/util/possibleMove'
import { ChessPiece } from '../ChessPiece/ChessPiece'
import { ChessMoveHistory, PlayerColor } from './ChessHistory.interface'

export type ChessHistoryMapperProps = {
  history: ChessMoveHistory
  startingState: ChessPiece[]
  startingPlayer: PlayerColor
  currentTurn: number
  currentPlayer: PlayerColor
}

export type ChessHistoryMapperResponse = {
  engine: ChessEngine
  currentMove?: MoveNotation
}

export const ChessHistoryMapper = ({
  history,
  startingState,
  startingPlayer,
  currentPlayer,
  currentTurn,
}: ChessHistoryMapperProps): ChessHistoryMapperResponse => {
  let engine = new ChessEngine({
    pieces: startingState,
    activePlayer: startingPlayer,
  })

  for (let turn = 1; turn <= currentTurn; turn++) {
    const isCurrent = turn === currentTurn
    const whiteMove = history.white[turn - 1]
    const blackMove = history.black[turn - 1]
    if (isCurrent && currentPlayer === 'white')
      return { engine, currentMove: whiteMove }
    engine = engine.nextFromNotation(whiteMove)
    if (isCurrent && currentPlayer === 'black') {
      return { engine, currentMove: blackMove }
    }
    engine = engine.nextFromNotation(blackMove)
  }

  return { engine, currentMove: undefined }
}
