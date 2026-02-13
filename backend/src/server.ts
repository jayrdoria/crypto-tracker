import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config } from "./config";
import cryptoRoutes from "./routes/cryptoRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Security headers
app.use(helmet());

// CORS — restrict to known frontend origin
app.use(
  cors({
    origin: config.corsOrigins,
    methods: ["GET"],
    allowedHeaders: ["Content-Type"],
  })
);

// Rate limiting — 100 requests per 15 minutes per IP
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." },
  })
);

// Body parser (limited payload size)
app.use(express.json({ limit: "1kb" }));

// Disable fingerprinting
app.disable("x-powered-by");

// Routes
app.use("/api", cryptoRoutes);

// Global error handler (must be registered last)
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port} [${config.nodeEnv}]`);
});
