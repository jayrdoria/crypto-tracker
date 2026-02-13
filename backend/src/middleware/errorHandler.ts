import { Request, Response, NextFunction } from "express";
import axios from "axios";

interface AppError extends Error {
  statusCode?: number;
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(`[Error] ${err.message}`);

  // Axios errors from upstream API calls
  if (axios.isAxiosError(err)) {
    const status = err.response?.status || 502;
    const message =
      status === 429
        ? "Rate limited by upstream API. Please try again later."
        : "Failed to fetch data from upstream API.";

    res.status(status).json({ error: message });
    return;
  }

  // Known application errors
  if (err.statusCode) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  // Validation errors (thrown from service layer)
  if (err.message.startsWith("Invalid")) {
    res.status(400).json({ error: err.message });
    return;
  }

  // Unhandled — never leak internals to the client
  res.status(500).json({ error: "Internal server error" });
}
