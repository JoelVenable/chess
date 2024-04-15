import { getChessPieceMovement } from './ChessPieceMovement'

describe('getChessPieceMovement', () => {
  describe('rook', () => {
    it('should return the correct movement vectors for a rook', () => {
      const movementVectors = getChessPieceMovement({
        square: 'd4',
        type: 'rook',
        player: 'white',
      })
      expect(movementVectors).toEqual({
        up: ['d5', 'd6', 'd7', 'd8'],
        down: ['d3', 'd2', 'd1'],
        left: ['c4', 'b4', 'a4'],
        right: ['e4', 'f4', 'g4', 'h4'],
      })
    })

    it('properly renders edges', () => {
      const movementVectors = getChessPieceMovement({
        square: 'a1',
        type: 'rook',
        player: 'white',
      })
      expect(movementVectors).toEqual({
        up: ['a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8'],
        down: [],
        left: [],
        right: ['b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
      })
    })
  })

  describe('bishop', () => {
    it('should return the correct movement vectors for a bishop', () => {
      const movementVectors = getChessPieceMovement({
        square: 'd4',
        type: 'bishop',
        player: 'white',
      })
      expect(movementVectors).toEqual({
        upLeft: ['c5', 'b6', 'a7'],
        upRight: ['e5', 'f6', 'g7', 'h8'],
        downLeft: ['c3', 'b2', 'a1'],
        downRight: ['e3', 'f2', 'g1'],
      })
    })

    it('properly renders edges', () => {
      const movementVectors = getChessPieceMovement({
        square: 'a1',
        type: 'bishop',
        player: 'white',
      })
      expect(movementVectors).toEqual({
        upLeft: [],
        upRight: ['b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8'],
        downLeft: [],
        downRight: [],
      })
    })
  })

  describe('queen', () => {
    it('should return the correct movement vectors for a queen', () => {
      const movementVectors = getChessPieceMovement({
        square: 'd4',
        type: 'queen',
        player: 'white',
      })
      expect(movementVectors).toEqual({
        up: ['d5', 'd6', 'd7', 'd8'],
        down: ['d3', 'd2', 'd1'],
        left: ['c4', 'b4', 'a4'],
        right: ['e4', 'f4', 'g4', 'h4'],
        upLeft: ['c5', 'b6', 'a7'],
        upRight: ['e5', 'f6', 'g7', 'h8'],
        downLeft: ['c3', 'b2', 'a1'],
        downRight: ['e3', 'f2', 'g1'],
      })
    })

    it('properly renders edges', () => {
      const movementVectors = getChessPieceMovement({
        square: 'a1',
        type: 'queen',
        player: 'white',
      })
      expect(movementVectors).toEqual({
        up: ['a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8'],
        down: [],
        left: [],
        right: ['b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
        upLeft: [],
        upRight: ['b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8'],
        downLeft: [],
        downRight: [],
      })
    })
  })

  describe('king', () => {
    it('should return the correct movement vectors for a king', () => {
      const movementVectors = getChessPieceMovement({
        square: 'd4',
        type: 'king',
        player: 'white',
      })
      expect(movementVectors).toEqual({
        up: ['d5'],
        down: ['d3'],
        left: ['c4'],
        right: ['e4'],
        upLeft: ['c5'],
        upRight: ['e5'],
        downLeft: ['c3'],
        downRight: ['e3'],
      })
    })

    it('properly renders edges', () => {
      const movementVectors = getChessPieceMovement({
        square: 'a1',
        type: 'king',
        player: 'white',
      })
      expect(movementVectors).toEqual({
        up: ['a2'],
        down: [],
        left: [],
        right: ['b1'],
        upLeft: [],
        upRight: ['b2'],
        downLeft: [],
        downRight: [],
      })
    })
  })

  describe('knight', () => {
    it('should return the correct movement vectors for a knight', () => {
      const movementVectors = getChessPieceMovement({
        square: 'd4',
        type: 'knight',
        player: 'white',
      })
      expect(movementVectors.knight?.sort()).toEqual(
        ['c6', 'e6', 'b5', 'f5', 'b3', 'f3', 'c2', 'e2'].sort(),
      )
    })

    it('properly renders edges', () => {
      const movementVectors = getChessPieceMovement({
        square: 'a1',
        type: 'knight',
        player: 'white',
      })
      expect(movementVectors.knight?.sort()).toEqual(['b3', 'c2'].sort())
    })
  })

  describe('pawn', () => {
    it('should return the correct movement vectors for a white pawn', () => {
      const movementVectors = getChessPieceMovement({
        square: 'd4',
        type: 'pawn',
        player: 'white',
      })
      expect(movementVectors).toEqual({
        up: ['d5'],
        upLeft: ['c5'],
        upRight: ['e5'],
      })
    })

    it('should return the correct movement vectors for a black pawn', () => {
      const movementVectors = getChessPieceMovement({
        square: 'd4',
        type: 'pawn',
        player: 'black',
      })
      expect(movementVectors).toEqual({
        down: ['d3'],
        downLeft: ['c3'],
        downRight: ['e3'],
      })
    })

    it('should handle pawns that have not yet moved', () => {
      const movementVectors = getChessPieceMovement({
        square: 'd2',
        type: 'pawn',
        player: 'white',
      })
      expect(movementVectors).toEqual({
        up: ['d3', 'd4'],
        upLeft: ['c3'],
        upRight: ['e3'],
      })
    })
  })

  // Add more test cases for other pieces
})
