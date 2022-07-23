import type { APIGatewayEvent, Context } from 'aws-lambda'
import * as BinanceFutures from './BinanceFuturesApi'
import {buy, canBuy} from './AbstractApi'
import { db } from 'src/lib/db';

export const handler = async (event: APIGatewayEvent, context: Context) => {
  const body = JSON.parse(event.body)
  const userData = await db.user.findUnique({
    where: {id: body.userId }
  })
  // const tmp = await BinanceFutures.createPosition('BTCUSDT', 'BUY', 20, 18235, true, SECRET_KEY, API_KEY);
  // const tmp = await BinanceFutures.closePosition('BTCUSDT', 'SELL', 20000, true, SECRET_KEY, API_KEY);
  // const tmp = await BinanceFutures.getBalance(userData.TestSecretKey, userData.TestApiKey);
  const tmp = await canBuy(body.userId, body.api, body.symbol, body.quantity);
  console.log(tmp);

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
