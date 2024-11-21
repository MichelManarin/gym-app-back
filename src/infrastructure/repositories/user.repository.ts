import { IUserRepository } from "./user.repository.interface";
import { UserModel, User, IUserDocument } from "../../domain/models/user";

export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);
    return user ? this.toUser(user) : null;
  }

  async findAll(): Promise<User[]> {
    const users = await UserModel.find();
    return users.map(user => this.toUser(user));
  }

  async create(user: User): Promise<User> {
    const newUser = new UserModel(user);
    const savedUser = await newUser.save();
    return this.toUser(savedUser);
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(id, user, { new: true });
    return updatedUser ? this.toUser(updatedUser) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);
    return result !== null;
  }

  private toUser(document: IUserDocument): User {
    return {
      id: document.id,
      name: document.name,
      email: document.email,
      password: document.password,
    };
  }
}
