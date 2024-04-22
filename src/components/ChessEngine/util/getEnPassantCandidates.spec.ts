import { ChessPiece } from '../../ChessPiece/ChessPiece'
import { getEnPassantCandidates } from './getEnPassantCandidates.util'

describe('getEnPassantCandidates', () => {
  it('should return an empty array when there are no en passant candidates', () => {
    const enPassantCandidates = getEnPassantCandidates({
      pieces: [
        ChessPiece.Pawn({
          owner: 'white',
          location: 'd5',
          movedLastTurn: false,
          qtyMoves: 3,
        }),
      ],
      activePlayer: 'white',
    })
    expect(enPassantCandidates).toEqual([])
  })

  it('should return no en passant candidates if the pawn is not eligible', () => {
    const whitePawn = ChessPiece.Pawn({
      owner: 'white',
      location: 'e5',
      movedLastTurn: false,
      qtyMoves: 1,
    })
    const blackPawn = ChessPiece.Pawn({
      owner: 'black',
      location: 'd5',
      movedLastTurn: false,
      qtyMoves: 1,
    })

    const enPassantCandidates = getEnPassantCandidates({
      pieces: [whitePawn, blackPawn],
      activePlayer: 'white',
    })
    expect(enPassantCandidates).toEqual([])
  })

  it('should return the possible move if there is an eligible en passant move', () => {
    const whitePawn = ChessPiece.Pawn({
      owner: 'white',
      location: 'd5',
      movedLastTurn: false,
      qtyMoves: 1,
    })

    const blackPawn = ChessPiece.Pawn({
      owner: 'black',
      location: 'e5',
      movedLastTurn: true,
      qtyMoves: 1,
    })

    const enPassantCandidates = getEnPassantCandidates({
      pieces: [whitePawn, blackPawn],
      activePlayer: 'white',
    })

    expect(enPassantCandidates).toEqual([
      {
        from: whitePawn.location,
        to: 'e6',
        notation: 'd5e6',
        taken: blackPawn,
        type: 'en-passant',
      },
    ])
  })

  it('should return multiple moves if there are multiple eligible en passant moves', () => {
    const whitePawn = ChessPiece.Pawn({
      owner: 'white',
      location: 'd5',
      movedLastTurn: false,
      qtyMoves: 2,
    })

    const blackPawn1 = ChessPiece.Pawn({
      owner: 'black',
      location: 'e5',
      movedLastTurn: true,
      qtyMoves: 1,
    })

    const whitePawnTwo = ChessPiece.Pawn({
      owner: 'white',
      location: 'f5',
      movedLastTurn: false,
      qtyMoves: 2,
    })

    const enPassantCandidates = getEnPassantCandidates({
      pieces: [whitePawn, blackPawn1, whitePawnTwo],
      activePlayer: 'white',
    })

    expect(enPassantCandidates).toEqual([
      {
        from: whitePawn.location,
        taken: blackPawn1,
        notation: 'd5e6',
        to: 'e6',
        type: 'en-passant',
      },
      {
        from: whitePawnTwo.location,
        taken: blackPawn1,
        notation: 'f5e6',
        type: 'en-passant',
        to: 'e6',
      },
    ])
  })

  it('handles en passant from black player', () => {
    const blackPawn = ChessPiece.Pawn({
      owner: 'black',
      location: 'd4',
      movedLastTurn: false,
      qtyMoves: 2,
    })

    const whitePawn = ChessPiece.Pawn({
      owner: 'white',
      location: 'e4',
      movedLastTurn: true,
      qtyMoves: 1,
    })

    const enPassantCandidates = getEnPassantCandidates({
      pieces: [blackPawn, whitePawn],
      activePlayer: 'black',
    })

    expect(enPassantCandidates).toEqual([
      {
        from: blackPawn.location,
        to: 'e3',
        notation: 'd4e3',
        taken: whitePawn,
        type: 'en-passant',
      },
    ])
  })

  // Add more test cases here...
})
