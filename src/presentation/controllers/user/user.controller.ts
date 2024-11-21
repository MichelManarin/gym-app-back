import { IUserController } from "../../controllers/user/user.controller.interface";
import { IUserService } from "../../../domain/services/user.service.interface";
import { Request, Response } from "express";

export class UserController implements IUserController {
  constructor(private userService: IUserService) {}

  async getUser(req: Request, res: Response): Promise<Response> {
    const user = await this.userService.getUserById(req.params.id);
    return user ? res.json(user) : res.status(404).json({ message: "User not found" });
  }

  async getUsers(req: Request, res: Response): Promise<Response> {
    const users = await this.userService.getAllUsers();
    return res.json(users);
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const user = await this.userService.createUser(req.body);
    res.status(201).json(user);
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    const user = await this.userService.updateUser(req.params.id, req.body);
    return user ? res.json(user) : res.status(404).json({ message: "User not found" });
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const deleted = await this.userService.deleteUser(req.params.id);
    return deleted ? res.status(204).send() : res.status(404).json({ message: "User not found" });
  }
}