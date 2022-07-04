import { logs, log, createLog, updateLog, deleteLog } from './logs'
import type { StandardScenario } from './logs.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('logs', () => {
  scenario('returns all logs', async (scenario: StandardScenario) => {
    const result = await logs()

    expect(result.length).toEqual(Object.keys(scenario.log).length)
  })

  scenario('returns a single log', async (scenario: StandardScenario) => {
    const result = await log({ id: scenario.log.one.id })

    expect(result).toEqual(scenario.log.one)
  })

  scenario('creates a log', async (scenario: StandardScenario) => {
    const result = await createLog({
      input: {
        status: 2845807,
        message: 'String',
        cryptoPositionId: scenario.log.two.cryptoPositionId,
      },
    })

    expect(result.status).toEqual(2845807)
    expect(result.message).toEqual('String')
    expect(result.cryptoPositionId).toEqual(scenario.log.two.cryptoPositionId)
  })

  scenario('updates a log', async (scenario: StandardScenario) => {
    const original = await log({ id: scenario.log.one.id })
    const result = await updateLog({
      id: original.id,
      input: { status: 7385891 },
    })

    expect(result.status).toEqual(7385891)
  })

  scenario('deletes a log', async (scenario: StandardScenario) => {
    const original = await deleteLog({ id: scenario.log.one.id })
    const result = await log({ id: original.id })

    expect(result).toEqual(null)
  })
})
