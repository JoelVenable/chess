import { ChessPiece } from '../../ChessPiece/ChessPiece'
import { getCastleCandidates } from './getCastleCandidates.util'

describe('getCastleCandidates', () => {
  describe('allowed moves', () => {
    it('white queenside', () => {
      const rook = ChessPiece.Rook({
        location: 'a1',
        owner: 'white',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const king = ChessPiece.King({
        location: 'e1',
        owner: 'white',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const castleCandidates = getCastleCandidates({
        pieces: [rook, king],
        activePlayer: 'white',
      })
      expect(castleCandidates).toEqual([
        {
          from: king.location,
          to: 'c1',
          rook,
          rookTo: 'd1',
          type: 'castle',
        },
      ])
    })

    it('white kingside', () => {
      const rook = ChessPiece.Rook({
        location: 'h1',
        owner: 'white',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const king = ChessPiece.King({
        location: 'e1',
        owner: 'white',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const castleCandidates = getCastleCandidates({
        pieces: [rook, king],
        activePlayer: 'white',
      })
      expect(castleCandidates).toEqual([
        {
          from: king.location,
          to: 'g1',
          rook,
          rookTo: 'f1',
          type: 'castle',
        },
      ])
    })

    it('black queenside', () => {
      const rook = ChessPiece.Rook({
        location: 'a8',
        owner: 'black',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const king = ChessPiece.King({
        location: 'e8',
        owner: 'black',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const castleCandidates = getCastleCandidates({
        pieces: [rook, king],
        activePlayer: 'black',
      })
      expect(castleCandidates).toEqual([
        {
          from: king.location,
          to: 'c8',
          rook,
          rookTo: 'd8',
          type: 'castle',
        },
      ])
    })

    it('black kingside', () => {
      const rook = ChessPiece.Rook({
        location: 'h8',
        owner: 'black',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const king = ChessPiece.King({
        location: 'e8',
        owner: 'black',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const castleCandidates = getCastleCandidates({
        pieces: [rook, king],
        activePlayer: 'black',
      })
      expect(castleCandidates).toEqual([
        {
          from: king.location,
          to: 'g8',
          rook,
          rookTo: 'f8',
          type: 'castle',
        },
      ])
    })

    it('white kingside with pieces blocking queenside', () => {
      const rook = ChessPiece.Rook({
        location: 'a1',
        owner: 'white',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const king = ChessPiece.King({
        location: 'e1',
        owner: 'white',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const rookTwo = ChessPiece.Rook({
        location: 'h1',
        owner: 'white',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const blockingPiece = ChessPiece.Knight({
        location: 'b1',
        owner: 'white',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const castleCandidates = getCastleCandidates({
        pieces: [rook, king, blockingPiece, rookTwo],
        activePlayer: 'white',
      })
      expect(castleCandidates).toEqual([
        {
          from: king.location,
          to: 'g1',
          rook: rookTwo,
          rookTo: 'f1',
          type: 'castle',
        },
      ])
    })
  })

  describe('disallowed moves', () => {
    it('castling through check', () => {
      const rook = ChessPiece.Rook({
        location: 'a1',
        owner: 'white',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const king = ChessPiece.King({
        location: 'e1',
        owner: 'white',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const checkPiece = ChessPiece.Rook({
        location: 'd8',
        owner: 'black',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const castleCandidates = getCastleCandidates({
        pieces: [rook, king, checkPiece],
        activePlayer: 'white',
      })
      expect(castleCandidates).toEqual([])
    })

    it('castling out of check', () => {
      const rook = ChessPiece.Rook({
        location: 'a1',
        owner: 'white',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const king = ChessPiece.King({
        location: 'e1',
        owner: 'white',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const checkPiece = ChessPiece.Rook({
        location: 'e8',
        owner: 'black',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const castleCandidates = getCastleCandidates({
        pieces: [rook, king, checkPiece],
        activePlayer: 'white',
      })
      expect(castleCandidates).toEqual([])
    })

    it('castling into check', () => {
      const rook = ChessPiece.Rook({
        location: 'h1',
        owner: 'white',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const king = ChessPiece.King({
        location: 'e1',
        owner: 'white',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const checkPiece = ChessPiece.Rook({
        location: 'g8',
        owner: 'black',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const castleCandidates = getCastleCandidates({
        pieces: [rook, king, checkPiece],
        activePlayer: 'white',
      })
      expect(castleCandidates).toEqual([])
    })

    it('king has moved', () => {
      const rook = ChessPiece.Rook({
        location: 'h1',
        owner: 'white',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const king = ChessPiece.King({
        location: 'e1',
        owner: 'white',
        qtyMoves: 1,
        movedLastTurn: false,
      })

      const castleCandidates = getCastleCandidates({
        pieces: [rook, king],
        activePlayer: 'white',
      })
      expect(castleCandidates).toEqual([])
    })

    it('rook has moved', () => {
      const rook = ChessPiece.Rook({
        location: 'h1',
        owner: 'white',
        qtyMoves: 1,
        movedLastTurn: false,
      })

      const king = ChessPiece.King({
        location: 'e1',
        owner: 'white',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const castleCandidates = getCastleCandidates({
        pieces: [rook, king],
        activePlayer: 'white',
      })
      expect(castleCandidates).toEqual([])
    })

    it('rook is not in the correct position', () => {
      const rook = ChessPiece.Rook({
        location: 'b1',
        owner: 'white',
        qtyMoves: 1,
        movedLastTurn: false,
      })

      const king = ChessPiece.King({
        location: 'e1',
        owner: 'white',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const castleCandidates = getCastleCandidates({
        pieces: [rook, king],
        activePlayer: 'white',
      })
      expect(castleCandidates).toEqual([])
    })

    it('pieces are in the way', () => {
      const rook = ChessPiece.Rook({
        location: 'a1',
        owner: 'white',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const king = ChessPiece.King({
        location: 'e1',
        owner: 'white',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const blockingPiece = ChessPiece.Knight({
        location: 'b1',
        owner: 'white',
        qtyMoves: 0,
        movedLastTurn: false,
      })

      const castleCandidates = getCastleCandidates({
        pieces: [rook, king, blockingPiece],
        activePlayer: 'white',
      })
      expect(castleCandidates).toEqual([])
    })
  })
})
