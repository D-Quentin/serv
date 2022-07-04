import type { APIGatewayEvent, Context } from 'aws-lambda'
import { logger } from 'src/lib/logger'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */

import { createPosition, closePosition, getPrice } from './BinanceApi'

const API_KEY = "faf2549fdbba8ad56485f950937a3891381b191ebe96d68d9ac4c3f6457fd339";
const SECRET_KEY = "36ed2fbf88c7ad8e28497c028a1e4b68322f74677aedf712fab260041cf6c714";

export const handler = async (event: APIGatewayEvent, context: Context) => {
  logger.info('Invoked crypto function')
  // const tmp = await createPosition('BTCUSDT', 'BUY', 20, 18235, true, SECRET_KEY, API_KEY);
  // const tmp = await closePosition('BTCUSDT', 'SELL', 20000, true, SECRET_KEY, API_KEY);
  // const tmp = await getPrice('BTCUSDT', true, API_KEY);


  console.log(event)
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      success: true,
      message: "Successfully created a new bot",
      data: event.body,
    }),
  }
}
