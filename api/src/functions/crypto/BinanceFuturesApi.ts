import { HmacSHA256 } from 'crypto-js'

const API_URL_TEST = "https://testnet.binancefuture.com/";
const API_URL = "https://fapi.binance.com/";
const SLIPAGE = 0.05;

export async function createPosition(symbol: string, side: string, quantity: number, ApiKey: string, secretKey: string) {
  const timestamp = new Date().getTime();
  const totalParams = `symbol=${symbol}&side=${side}&type=MARKET&quantity=${quantity.toFixed(3)}&timestamp=${timestamp}`;
  const signature = HmacSHA256(totalParams, secretKey);
  const finalUrl = `${API_URL}fapi/v1/order?${totalParams}&signature=${signature}`;

  const option = {
    method: "POST",
    headers: {
      'X-MBX-APIKEY': ApiKey
    }
  };
  const res = await (await fetch(finalUrl, option)).json();

  return (res);
}

export async function closePosition(symbol: string, side: string, price: number, apiKey: string, secretKey: string) {
  const timestamp = new Date().getTime();
  const stopPrice = side === 'BUY' ? (price - price * SLIPAGE).toFixed(3) : (price + price * SLIPAGE).toFixed(3);
  const totalParams = `symbol=${symbol}&side=${side}&type=STOP_MARKET&stopPrice=${stopPrice}&closePosition=true&timestamp=${timestamp}`;
  const signature = HmacSHA256(totalParams, secretKey);
  const finalUrl = `${API_URL}fapi/v1/order?${totalParams}&signature=${signature}`;

  const option = {
    method: "POST",
    headers: {
      'X-MBX-APIKEY': apiKey
    }
  };
  const res = await (await fetch(finalUrl, option)).json();

  return (res);
}

export async function getPrice(symbol: string, apiKey: string) {
  const finalUrl = `${API_URL}fapi/v1/premiumIndex?symbol=${symbol}`;
  const option = {
    method: "GET",
    headers: {
      'X-MBX-APIKEY': apiKey
    }
  };
  const res = await (await fetch(finalUrl, option)).json();

  return (res.markPrice);
}

export async function getPosition(symbol: string, apiKey: string, secretKey: string) {
  const timestamp = new Date().getTime();
  const totalParams = `symbol=${symbol}&timestamp=${timestamp}`;
  const signature = HmacSHA256(totalParams, secretKey);
  const finalUrl = `${API_URL}fapi/v2/positionRisk?${totalParams}&signature=${signature}`;
  const option = {
    method: "GET",
    headers: {
      'X-MBX-APIKEY': apiKey
    }
  };
  const pos = await (await fetch(finalUrl, option)).json();
  if (parseFloat(pos[0].positionAmt) === 0) {
    return ({positions: pos, totalValue: 0, side: 'NONE'});
  }
  let res = {
    positions: pos,
    totalValue: Math.abs(pos[0].positionAmt) * pos[0].entryPrice,
    side: pos[0].positionAmt > 0 ? 'BUY' : 'SELL'
  }
  return (res);
}

export async function getBalance(apiKey: string, secretKey: string) {
  const timestamp = new Date().getTime();
  const totalParams = `timestamp=${timestamp}`;
  const signature = HmacSHA256(totalParams, secretKey);
  const finalUrl = `${API_URL}fapi/v2/balance?${totalParams}&signature=${signature}`;
  const option = {
    method: "GET",
    headers: {
      'X-MBX-APIKEY': apiKey
    }
  };
  const res = await (await fetch(finalUrl, option)).json();

  for (let i = 0; i < res.length; i++) {
    if (res[i].asset === 'USDT') {
      return (parseFloat(res[i].balance));
    }
  }
  return (0);
}