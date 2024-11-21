import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth/auth.service";

export const authMiddleware = (authService: AuthService) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token is missing" });
      return;
    }

    const payload = authService.verifyToken(token);
    if (!payload) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    req.user = payload; 
    next();
  };
};
