import { Request, Response, NextFunction } from "express";
import { getPrices } from "../services/coingeckoService";

export const getHealth = (_req: Request, res: Response): void => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
};

export const getPricesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const vsCurrency = (req.query.vs_currency as string) || "usd";
    const perPage = parseInt(req.query.per_page as string, 10) || 20;
    const page = parseInt(req.query.page as string, 10) || 1;

    const prices = await getPrices(vsCurrency, perPage, page);
    res.json(prices);
  } catch (error) {
    next(error);
  }
};
