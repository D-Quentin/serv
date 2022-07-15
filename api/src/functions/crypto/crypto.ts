import type { APIGatewayEvent, Context } from 'aws-lambda'
import { logger } from 'src/lib/logger'
import { createPosition, closePosition, getPrice } from './BinanceApi'
import { db } from 'src/lib/db';

const API_KEY = "faf2549fdbba8ad56485f950937a3891381b191ebe96d68d9ac4c3f6457fd339";
const SECRET_KEY = "36ed2fbf88c7ad8e28497c028a1e4b68322f74677aedf712fab260041cf6c714";

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
