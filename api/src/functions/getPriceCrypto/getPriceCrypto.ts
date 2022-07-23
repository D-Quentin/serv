import type { APIGatewayEvent, Context } from 'aws-lambda'
import { logger } from 'src/lib/logger'
import { getPrice } from '../crypto/AbstractApi'

export const handler = async (event: APIGatewayEvent, context: Context) => {
  const body = JSON.parse(event.body)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: await getPrice(body.userId, body.api, body.symbol),
    }),
  }
}
