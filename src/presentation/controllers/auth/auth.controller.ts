import { Request, Response } from "express";
import { AuthService } from "../../../domain/services/auth/auth.service";

export class AuthController {
  constructor(private authService: AuthService) { }

  async validateToken(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({ message: "Token is missing" });
        return;
      }

      const payload = this.authService.verifyToken(token);
      if (!payload) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }

      res.status(200).json({ valid: true });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const token = await this.authService.login(email, password);
    token
      ? res.status(200).json({ token })
      : res.status(401).json({ message: "Invalid credentials" });
  }
}
