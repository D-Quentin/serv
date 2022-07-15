import type { APIGatewayEvent, Context } from 'aws-lambda'
import { logger } from 'src/lib/logger'
import { createPosition, closePosition, getPrice } from './BinanceApi'
import { db } from 'src/lib/db';

export const handler = async (event: APIGatewayEvent, context: Context) => {
  const body = JSON.parse(event.body)
  const userData = await db.user.findUnique({
    where: {id: body.userId }
  })
  // const tmp = await createPosition('BTCUSDT', 'BUY', 20, 18235, true, SECRET_KEY, API_KEY);
  // const tmp = await closePosition('BTCUSDT', 'SELL', 20000, true, SECRET_KEY, API_KEY);
  const tmp = await getPrice('BTCUSDT', true, userData.TestApiKey);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      success: true,
      message: "Successfully created a new bot",
      data: tmp,
    }),
  }
}
