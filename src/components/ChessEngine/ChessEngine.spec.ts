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

      const moves = engine.possibleMoves

      expect(moves).toEqual([
        {
          move: {
            from: 'a1',
            to: 'b2',
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
            shadowed,
          ],
        },
      ])
    })

    it('should disallow movement to units occupied by friendly pieces', () => {
      const subject = ChessPiece.Bishop({
        owner: 'white',
        location: 'c5',
        movedLastTurn: false,
        qtyMoves: 4,
      })
      const friendly = ChessPiece.Pawn({
        owner: 'white',
        location: 'b4',
        movedLastTurn: true,
        qtyMoves: 2,
      })

      const target = ChessPiece.Rook({
        owner: 'black',
        location: 'd6',
        movedLastTurn: false,
        qtyMoves: 0,
      })
      const collection = new ChessEngine({
        pieces: [subject, target, friendly],
        activePlayer: 'white',
      })

      const moves = collection.possibleMoves

      expect(moves).toEqual([
        {
          move: {
            from: 'c5',
            to: 'd6',
            taken: target,
            type: 'capture',
          },
          nextBoardState: [
            ChessPiece.Bishop({
              owner: 'white',
              location: 'd6',
              movedLastTurn: true,
              qtyMoves: 5,
            }),
            friendly,
          ],
        },
        {
          move: {
            from: 'c5',
            to: 'b6',
            type: 'normal',
          },
          nextBoardState: [
            ChessPiece.Bishop({
              owner: 'white',
              location: 'e7',
              movedLastTurn: true,
              qtyMoves: 5,
            }),
            friendly,
            target,
          ],
        },
        {
          move: {
            from: 'c5',
            to: 'a7',
            type: 'normal',
          },
          nextBoardState: [
            ChessPiece.Bishop({
              owner: 'white',
              location: 'a7',
              movedLastTurn: true,
              qtyMoves: 5,
            }),
            friendly,
            target,
          ],
        },
        {
          move: {
            from: 'c5',
            to: 'd4',
            type: 'normal',
          },
          nextBoardState: [
            ChessPiece.Bishop({
              owner: 'white',
              location: 'd4',
              movedLastTurn: true,
              qtyMoves: 5,
            }),
            friendly,
            target,
          ],
        },
        {
          move: {
            from: 'c5',
            to: 'e3',
            type: 'normal',
          },
          nextBoardState: [
            ChessPiece.Bishop({
              owner: 'white',
              location: 'e3',
              movedLastTurn: true,
              qtyMoves: 5,
            }),
            friendly,
            target,
          ],
        },
        {
          move: {
            from: 'c5',
            to: 'f2',
            type: 'normal',
          },
          nextBoardState: [
            ChessPiece.Bishop({
              owner: 'white',
              location: 'f2',
              movedLastTurn: true,
              qtyMoves: 5,
            }),
            friendly,
            target,
          ],
        },
        {
          move: {
            from: 'c5',
            to: 'g1',
            type: 'normal',
          },
          nextBoardState: [
            ChessPiece.Bishop({
              owner: 'white',
              location: 'g1',
              movedLastTurn: true,
              qtyMoves: 5,
            }),
            friendly,
            target,
          ],
        },
        {
          move: {
            from: 'b4',
            to: 'b5',
            type: 'normal',
          },
          nextBoardState: [
            subject,
            ChessPiece.Pawn({
              owner: 'white',
              location: 'b5',
              movedLastTurn: true,
              qtyMoves: 3,
            }),
            target,
          ],
        },
      ])
    })
  })
})
