import {
  cryptoPositions,
  cryptoPosition,
  createCryptoPosition,
  updateCryptoPosition,
  deleteCryptoPosition,
} from './cryptoPositions'
import type { StandardScenario } from './cryptoPositions.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('cryptoPositions', () => {
  scenario(
    'returns all cryptoPositions',
    async (scenario: StandardScenario) => {
      const result = await cryptoPositions()

      expect(result.length).toEqual(Object.keys(scenario.cryptoPosition).length)
    }
  )

  scenario(
    'returns a single cryptoPosition',
    async (scenario: StandardScenario) => {
      const result = await cryptoPosition({
        id: scenario.cryptoPosition.one.id,
      })

      expect(result).toEqual(scenario.cryptoPosition.one)
    }
  )

  scenario('creates a cryptoPosition', async (scenario: StandardScenario) => {
    const result = await createCryptoPosition({
      input: {
        userId: scenario.cryptoPosition.two.userId,
        symbol: 'String',
        algorithm: 'String',
        amount: 5704990.340471305,
      },
    })

    expect(result.userId).toEqual(scenario.cryptoPosition.two.userId)
    expect(result.symbol).toEqual('String')
    expect(result.algorithm).toEqual('String')
    expect(result.amount).toEqual(5704990.340471305)
  })

  scenario('updates a cryptoPosition', async (scenario: StandardScenario) => {
    const original = await cryptoPosition({
      id: scenario.cryptoPosition.one.id,
    })
    const result = await updateCryptoPosition({
      id: original.id,
      input: { symbol: 'String2' },
    })

    expect(result.symbol).toEqual('String2')
  })

  scenario('deletes a cryptoPosition', async (scenario: StandardScenario) => {
    const original = await deleteCryptoPosition({
      id: scenario.cryptoPosition.one.id,
    })
    const result = await cryptoPosition({ id: original.id })

    expect(result).toEqual(null)
  })
})
