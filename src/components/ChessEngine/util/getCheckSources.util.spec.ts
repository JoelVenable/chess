import { getCheckSources, GetCheckSourcesArgs } from './getCheckSources.util'
import { PlayerColor } from '../../ChessHistory/ChessHistory.interface'
import { ChessPiece } from '../../ChessPiece/ChessPiece'

describe('getCheckSources', () => {
  it('should return an array of Pieces that have the opponent king in check', () => {
    const king = ChessPiece.King({
      owner: 'black',
      location: 'e8',
      movedLastTurn: false,
      qtyMoves: 0,
    })

    const knight = ChessPiece.Knight({
      owner: 'white',
      location: 'd6',
      movedLastTurn: false,
      qtyMoves: 0,
    })
    const pieces: ChessPiece[] = [
      king,
      knight,
      // Define your chess pieces here for testing
    ]

    const activePlayer: PlayerColor = 'black'

    const args: GetCheckSourcesArgs = {
      pieces,
      activePlayer,
    }

    const checkSources = getCheckSources(args)

    expect(checkSources).toEqual([knight])

    // Add your assertions here to verify the expected behavior of the function
  })
})
