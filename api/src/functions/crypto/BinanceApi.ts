import { HmacSHA256 } from 'crypto-js'

const API_URL_TEST = "https://testnet.binancefuture.com/";
const API_URL = "https://fapi.binance.com/";
const SLIPAGE = 0.05;

export async function createPosition(symbole: string, side: string, quantity: number, price: number, test: boolean, secretKey: string, ApiKey: string) {
  const cryptoQuantity = (quantity / price).toFixed(3);
  const timestamp = new Date().getTime();
  const baseUrl = test ? API_URL_TEST : API_URL;
  const totalParams = `symbol=${symbole}&side=${side}&type=MARKET&quantity=${cryptoQuantity}&timestamp=${timestamp}`;
  const signature = HmacSHA256(totalParams, secretKey);
  const finalUrl = `${baseUrl}fapi/v1/order?${totalParams}&signature=${signature}`;

  console.log(finalUrl);

  const option = {
    method: "POST",
    headers: {
      'X-MBX-APIKEY': ApiKey
    }
  };
  const res = await (await fetch(finalUrl, option)).json();

  return (res);
}

export async function closePosition(symbole: string, side: string, price: number, test: boolean, secretKey: string, apiKey: string) {
  const timestamp = new Date().getTime();
  const baseUrl = test ? API_URL_TEST : API_URL;
  const stopPrice = side === 'BUY' ? (price - price * SLIPAGE).toFixed(3) : (price + price * SLIPAGE).toFixed(3);
  const totalParams = `symbol=${symbole}&side=${side}&type=STOP_MARKET&stopPrice=${stopPrice}&closePosition=true&timestamp=${timestamp}`;
  const signature = HmacSHA256(totalParams, secretKey);
  const finalUrl = `${baseUrl}fapi/v1/order?${totalParams}&signature=${signature}`;

  console.log(finalUrl);

  const option = {
    method: "POST",
    headers: {
      'X-MBX-APIKEY': apiKey
    }
  };
  const res = await (await fetch(finalUrl, option)).json();

  return (res);
}

export async function getPrice(symbole: string, test: boolean, apiKey: string) {
  const baseUrl = test ? API_URL_TEST : API_URL;
  const finalUrl = `${baseUrl}fapi/v1/premiumIndex?symbol=${symbole}`;

  console.log(finalUrl);

  const option = {
    method: "GET",
    headers: {
      'X-MBX-APIKEY': apiKey
    }
  };
  const res = await (await fetch(finalUrl, option)).json();

  return (res);
}