import { Router } from "express";
import { getHealth, getPricesHandler } from "../controllers/cryptoController";

const router = Router();

router.get("/health", getHealth);
router.get("/prices", getPricesHandler);

export default router;
