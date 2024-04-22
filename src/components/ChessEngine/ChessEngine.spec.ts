import { ChessPiece } from '../ChessPiece/ChessPiece'
import { ChessEngine } from './ChessEngine'
describe('ChessEngine', () => {
  describe('Check bishop movement vectors', () => {
    it('should shadow viable targets behind the first one in the diagonal', () => {
      const subject = ChessPiece.Bishop({
        owner: 'white',
        location: 'a1',
        movedLastTurn: false,
        qtyMoves: 0,
      })
      const target = ChessPiece.Pawn({
        owner: 'black',
        location: 'b2',
        movedLastTurn: false,
        qtyMoves: 0,
      })

      const shadowed = ChessPiece.Rook({
        owner: 'black',
        location: 'b3',
        movedLastTurn: false,
        qtyMoves: 0,
      })
      const engine = new ChessEngine({
        pieces: [subject, target, shadowed],
        activePlayer: 'white',
      })

      const moves = engine.moves

      expect(moves).toEqual({
        a1: [
          {
            move: {
              from: 'a1',
              to: 'b2',
              taken: target,
              type: 'capture',
              notation: 'a1b2',
            },
            nextBoardState: [
              ChessPiece.Bishop({
                owner: 'white',
                location: 'b2',
                movedLastTurn: true,
                qtyMoves: 1,
              }),
              shadowed,
            ],
          },
        ],
      })
    })

    it('should disallow movement to units occupied by friendly pieces', () => {
      const subject = ChessPiece.Bishop({
        owner: 'white',
        location: 'c1',
        movedLastTurn: false,
        qtyMoves: 0,
      })
      const pawnOne = ChessPiece.Pawn({
        owner: 'white',
        location: 'b2',
        movedLastTurn: false,
        qtyMoves: 0,
      })

      const pawnTwo = ChessPiece.Pawn({
        owner: 'white',
        location: 'd2',
        movedLastTurn: false,
        qtyMoves: 0,
      })
      const collection = new ChessEngine({
        pieces: [subject, pawnOne, pawnTwo],
        activePlayer: 'white',
      })

      const moves = collection.moves

      expect(moves.c1).toEqual(undefined)
    })

    it('should allow taking enemy pieces', () => {
      const subject = ChessPiece.Bishop({
        owner: 'white',
        location: 'c1',
        movedLastTurn: false,
        qtyMoves: 0,
      })
      const target = ChessPiece.Pawn({
        owner: 'black',
        location: 'b2',
        movedLastTurn: false,
        qtyMoves: 0,
      })

      const friendly = ChessPiece.Pawn({
        owner: 'white',
        location: 'd2',
        movedLastTurn: false,
        qtyMoves: 0,
      })

      const collection = new ChessEngine({
        pieces: [subject, target, friendly],
        activePlayer: 'white',
      })

      const moves = collection.moves

      expect(moves.c1).toEqual([
        {
          move: {
            from: 'c1',
            to: 'b2',
            notation: 'c1b2',
            taken: target,
            type: 'capture',
          },
          nextBoardState: [
            ChessPiece.Bishop({
              owner: 'white',
              location: 'b2',
              movedLastTurn: true,
              qtyMoves: 1,
            }),
            friendly,
          ],
        },
      ])
    })
  })
})
