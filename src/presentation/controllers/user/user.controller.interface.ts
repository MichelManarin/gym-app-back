import { Request, Response } from "express";

export interface IUserController {
  getUser(req: Request, res: Response): Promise<Response>;
  getUsers(req: Request, res: Response): Promise<Response>;
  createUser(req: Request, res: Response): Promise<void>;
  updateUser(req: Request, res: Response): Promise<Response>;
  deleteUser(req: Request, res: Response): Promise<Response>;
}