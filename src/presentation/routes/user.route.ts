import { Router } from "express";
import { UserController } from "../controllers/user/user.controller";
import { UserService } from "../../domain/services/user.service";
import { BcryptHashAdapter } from "../../infrastructure/adapters/bcrypt.hash.adapter";
import { UserRepository } from "../../infrastructure/repositories/user.repository";

const userRoutes = Router();

const bcript = new BcryptHashAdapter();
const userRepo = new UserRepository();

const userService = new UserService(bcript, userRepo);
const userController = new UserController(userService);

userRoutes.post("/user/create", (req, res) => userController.createUser(req, res));

export { userRoutes };