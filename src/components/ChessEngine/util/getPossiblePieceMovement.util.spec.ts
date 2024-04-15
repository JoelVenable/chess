import { ChessPiece } from '../../ChessPiece/ChessPiece'
import { getPossiblePieceMovement } from './getPossiblePieceMovement.util'
import { PossibleMove } from './possibleMove'

const sortFn = (a: PossibleMove, b: PossibleMove) => {
  return a.to.localeCompare(b.to)
}

describe('resolveVector', () => {
  let result: PossibleMove[] = []

  beforeEach(() => {
    result = []
  })

  it('should return all moves to the end of the board if unrestricted', () => {
    const from = 'd4'
    const squares = [
      'c3',
      'b2',
      'a1',
      'c5',
      'b6',
      'a7',
      'e5',
      'f6',
      'g7',
      'h8',
      'e3',
      'f2',
      'g1',
    ] as const
    const piece = ChessPiece.Bishop({
      location: from,
      owner: 'white',
      qtyMoves: 0,
      movedLastTurn: false,
    })

    const moves = getPossiblePieceMovement({
      piece,
      board: [piece],
    }).sort(sortFn)

    result = (
      squares.map((to) => ({ from, to, type: 'normal' })) as PossibleMove[]
    ).sort(sortFn)

    expect(moves).toEqual(result)
  })

  it('should return valid capture moves', () => {
    const from = 'd4'
    const squares = ['e3', 'f2', 'g1', 'e5', 'f6', 'g7', 'h8'] as const
    const piece = ChessPiece.Bishop({
      location: from,
      owner: 'white',
      qtyMoves: 0,
      movedLastTurn: false,
    })

    const targetOne = ChessPiece.Bishop({
      location: 'c3',
      owner: 'black',
      qtyMoves: 0,
      movedLastTurn: false,
    })

    const targetTwo = ChessPiece.Pawn({
      location: 'c5',
      owner: 'black',
      qtyMoves: 0,
      movedLastTurn: false,
    })

    const board = [piece, targetOne, targetTwo]

    const moves = getPossiblePieceMovement({
      piece,
      board,
    }).sort(sortFn)

    result = [
      {
        from,
        to: 'c3',
        type: 'capture',
        taken: targetOne,
      } as const,
      {
        from,
        to: 'c5',
        type: 'capture',
        taken: targetTwo,
      } as const,
      ...squares.map(
        (to) =>
          ({
            from,
            to,
            type: 'normal',
          }) as const,
      ),
    ].sort(sortFn)

    expect(moves).toEqual(result)
  })

  // Add more test cases as needed
})
