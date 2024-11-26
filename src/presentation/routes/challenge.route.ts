import { Router } from "express";
import { ChallengeController } from "../controllers/challenge/challenge.controller";

const challengeRoutes = Router();

const challengeController = new ChallengeController();

challengeRoutes.get("/", (req, res) => challengeController.list(req, res));

export { challengeRoutes };