import type { APIGatewayEvent, Context } from 'aws-lambda'
import { logger } from 'src/lib/logger'

export const handler = async (event: APIGatewayEvent, context: Context) => {
  logger.info('Invoked getApiData function')

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      apiList: ['BinanceFutures', 'BinanceFuturesTest'],
      api: [
        {
          name: 'BinanceFutures',
          currency: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'XRPUSDT', 'EOSUSDT', 'BCHUSDT', 'LTCUSDT'],
        },
        {
          name: 'BinanceFuturesTest',
          currency: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'XRPUSDT', 'EOSUSDT', 'BCHUSDT', 'LTCUSDT'],
        },
      ],
    }),
  }
}
