import axios from "axios";
import { CoinPrice } from "../types/crypto";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:7070/api",
  timeout: 10000,
});

export async function fetchPrices(
  vsCurrency: string = "usd",
  perPage: number = 20,
  page: number = 1
): Promise<CoinPrice[]> {
  const { data } = await apiClient.get<CoinPrice[]>("/prices", {
    params: {
      vs_currency: vsCurrency,
      per_page: perPage,
      page,
    },
  });
  return data;
}
