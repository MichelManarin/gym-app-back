import { Router } from "express";
import { validateRequest } from "../../infrastructure/middlewares/validate.middleware";
import { AuthController } from "../controllers/auth/auth.controller";
import { AuthService } from "../../domain/services/auth/auth.service";
import { loginSchema } from "../../infrastructure/schemas/auth.schema";
import { BcryptHashAdapter } from "../../infrastructure/adapters/bcrypt.hash.adapter";
import { UserRepository } from "../../infrastructure/repositories/user.repository";

const authRoutes = Router();

const bcript = new BcryptHashAdapter();
const userRepo = new UserRepository();

const authService = new AuthService(bcript, userRepo);
const authController = new AuthController(authService); 

authRoutes.post("/validate", (req, res) => authController.validateToken(req, res));
authRoutes.post("/login", validateRequest(loginSchema), (req, res) => authController.login(req, res));

export { authRoutes };