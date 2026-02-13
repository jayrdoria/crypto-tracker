import axios from "axios";
import { config } from "../config";

const coingeckoClient = axios.create({
  baseURL: config.coingeckoBaseUrl,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "x-cg-demo-api-key": config.coingeckoApiKey,
  },
});

export interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

const ALLOWED_CURRENCIES = new Set([
  "usd", "eur", "gbp", "jpy", "aud", "cad", "chf", "cny", "inr", "php",
]);

const MAX_PER_PAGE = 100;

export async function getPrices(
  vsCurrency: string = "usd",
  perPage: number = 20,
  page: number = 1
): Promise<CoinPrice[]> {
  const currency = vsCurrency.toLowerCase();
  if (!ALLOWED_CURRENCIES.has(currency)) {
    throw new Error(`Invalid currency: ${vsCurrency}. Allowed: ${[...ALLOWED_CURRENCIES].join(", ")}`);
  }

  const sanitizedPerPage = Math.min(Math.max(1, perPage), MAX_PER_PAGE);
  const sanitizedPage = Math.max(1, page);

  const response = await coingeckoClient.get<CoinPrice[]>("/coins/markets", {
    params: {
      vs_currency: currency,
      order: "market_cap_desc",
      per_page: sanitizedPerPage,
      page: sanitizedPage,
      sparkline: false,
    },
  });

  return response.data;
}
