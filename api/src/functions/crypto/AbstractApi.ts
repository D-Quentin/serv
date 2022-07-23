import * as BinanceFutures from './BinanceFuturesApi'
import * as BinanceFuturesTest from './BinanceFuturesTestApi'

import { db } from 'src/lib/db';

export async function buy(userId: string, api: string, symbol: string, quantity: number) {
  const userData = await db.user.findUnique({
    where: {id: userId }
  })
  if (!canBuy(userId, api, symbol, quantity)) {
    return false
  }
  if (api === "BinanceFutures") {
    BinanceFutures.createPosition(symbol, "BUY", quantity, userData.apiKeyBinance, userData.secretKeyBinance)
  } else if (api === "BinanceFuturesTest") {
    BinanceFuturesTest.createPosition(symbol, "BUY", quantity, userData.apiKeyBinanceTest, userData.secretKeyBinanceTest)
  }
}

export async function sell(userId: string, api: string, symbol: string, quantity: number) {
  const userData = await db.user.findUnique({
    where: {id: userId }
  })
  if (!canSell(userId, api, symbol, quantity)) {
    return false
  }
  if (api === "BinanceFutures") {
    BinanceFutures.createPosition(symbol, "SELL", quantity, userData.apiKeyBinance, userData.secretKeyBinance)
  } else if (api === "BinanceFuturesTest") {
    BinanceFuturesTest.createPosition(symbol, "SELL", quantity, userData.apiKeyBinanceTest, userData.secretKeyBinanceTest)
  }
}

export async function canBuy(userId: string, api: string, symbol: string, quantity: number) {
  const userData = await db.user.findUnique({
    where: {id: userId }
  })
  if (api === "BinanceFutures") {
    const positions = await BinanceFutures.getPosition(symbol, userData.apiKeyBinance, userData.secretKeyBinance);
    const balance = await BinanceFutures.getBalance(userData.apiKeyBinance, userData.secretKeyBinance);
    if ((positions.side === 'NONE' && balance >= quantity) ||
     (positions.side === 'SELL' && balance + positions.totalValue >= quantity)) {
      return true;
    }
    return true;
  } else if (api === "BinanceFuturesTest") {
    const positions = await BinanceFuturesTest.getPosition(symbol, userData.apiKeyBinanceTest, userData.secretKeyBinanceTest);
    const balance = await BinanceFuturesTest.getBalance(userData.apiKeyBinanceTest, userData.secretKeyBinanceTest);
    if ((positions.side === 'NONE' && balance >= quantity) ||
     (positions.side === 'SELL' && balance + positions.totalValue >= quantity)) {
      return true;
    }
    return false;
  }
}

export async function canSell(userId: string, api: string, symbol: string, quantity: number) {
  const userData = await db.user.findUnique({
    where: {id: userId }
  })
  if (api === "BinanceFutures") {
    const positions = await BinanceFutures.getPosition(symbol, userData.apiKeyBinance, userData.secretKeyBinance);
    const balance = await BinanceFutures.getBalance(userData.apiKeyBinance, userData.secretKeyBinance);
    if ((positions.side === 'NONE' && balance >= quantity) ||
     (positions.side === 'BUY' && balance + positions.totalValue >= quantity)) {
      return true;
    }
    return true;
  } else if (api === "BinanceFuturesTest") {
    const positions = await BinanceFuturesTest.getPosition(symbol, userData.apiKeyBinanceTest, userData.secretKeyBinanceTest);
    const balance = await BinanceFuturesTest.getBalance(userData.apiKeyBinanceTest, userData.secretKeyBinanceTest);
    if ((positions.side === 'NONE' && balance >= quantity) ||
     (positions.side === 'BUY' && balance + positions.totalValue >= quantity)) {
      return true;
    }
    return false;
  }
}

export async function getPrice(userId: string, api: string, symbol: string) {
  const userData = await db.user.findUnique({
    where: {id: userId }
  })
  if (api === "BinanceFutures") {
    return await BinanceFutures.getPrice(symbol, userData.apiKeyBinance);
  } else if (api === "BinanceFuturesTest") {
    return await BinanceFuturesTest.getPrice(symbol, userData.apiKeyBinanceTest);
  }
}