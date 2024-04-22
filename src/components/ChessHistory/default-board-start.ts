import { PlayerColor } from '../ChessHistory/ChessHistory.interface'
import { ChessPiece } from '../ChessPiece/ChessPiece'
import { Files } from '../ChessSquare/ChessSquare.interface'

const p = {
  qtyMoves: 0,
  movedLastTurn: false,
}

function renderPawns(owner: PlayerColor) {
  const rank = owner === 'white' ? '2' : '7'
  return Files.map((file) =>
    ChessPiece.Pawn({
      owner,
      location: `${file}${rank}`,
      ...p,
    }),
  )
}

function renderHomeRank(owner: PlayerColor) {
  const rank = owner === 'white' ? '1' : '8'
  return [
    ChessPiece.Rook({ owner, location: `a${rank}`, ...p }),
    ChessPiece.Knight({ owner, location: `b${rank}`, ...p }),
    ChessPiece.Bishop({ owner, location: `c${rank}`, ...p }),
    ChessPiece.Queen({ owner, location: `d${rank}`, ...p }),
    ChessPiece.King({ owner, location: `e${rank}`, ...p }),
    ChessPiece.Bishop({ owner, location: `f${rank}`, ...p }),
    ChessPiece.Knight({ owner, location: `g${rank}`, ...p }),
    ChessPiece.Rook({ owner, location: `h${rank}`, ...p }),
  ]
}

export const defaultBoardStart = () => [
  ...renderPawns('white'),
  ...renderPawns('black'),
  ...renderHomeRank('white'),
  ...renderHomeRank('black'),
]
