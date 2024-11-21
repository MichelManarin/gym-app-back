import jwt from "jsonwebtoken";
import { IHashAdapter } from "../../../infrastructure/adapters/hash.adapter.interface";
import { IUserRepository } from "../../../infrastructure/repositories/user.repository.interface";
import { User } from "../../models/user";

export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET!;
  private readonly tokenExpiry = process.env.JWT_EXPIRATION!;

  constructor(
    private hashAdapter: IHashAdapter,
    private userRepository: IUserRepository
  ) { }

  async register(user: User): Promise<User> {
    user.password = await this.hashAdapter.hash(user.password);
    return this.userRepository.create(user);
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findAll()
      .then(users => users.find(u => u.email === email));

    if (!user) return null;

    const isPasswordValid = await this.hashAdapter.compare(password, user.password);
    if (!isPasswordValid) return null;

    const token = jwt.sign({ id: user.id, email: user.email }, this.jwtSecret, {
      expiresIn: this.tokenExpiry,
    });

    return token;
  }

  verifyToken(token: string): { id: string; email: string } | null {
    try {
      return jwt.verify(token, this.jwtSecret) as { id: string; email: string };
    } catch {
      return null;
    }
  }
}
