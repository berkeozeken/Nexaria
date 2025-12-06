import { Router } from "express";
import { optimizeHandler } from "../controllers/optimizeController";
import { planGuard } from "../middlewares/planGuard";

export const optimizeRouter = Router();

optimizeRouter.post("/optimize", planGuard, optimizeHandler);
