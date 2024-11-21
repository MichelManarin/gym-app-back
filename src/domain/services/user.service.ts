import { IUserService } from "./user.service.interface";
import { IUserRepository } from "../../infrastructure/repositories/user.repository.interface";
import { IHashAdapter } from "../../infrastructure/adapters/hash.adapter.interface";
import { User } from "../models/user";

export class UserService implements IUserService {
  constructor(private hashAdapter: IHashAdapter,
    private userRepository: IUserRepository) { }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async createUser(user: User): Promise<User> {
    user.password = await this.hashAdapter.hash(user?.password)
    return this.userRepository.create(user);
  }

  async updateUser(id: string, user: Partial<User>): Promise<User | null> {
    return this.userRepository.update(id, user);
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}