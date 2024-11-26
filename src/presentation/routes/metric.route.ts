import { Router } from "express";
import { MetricController } from "../controllers/metrics/metric.controller";

const metricRoutes = Router();

const metricController = new MetricController();

metricRoutes.get("/", (req, res) => metricController.getInformation(req, res));

export { metricRoutes };