import mongoose, { Document, Schema } from "mongoose";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema<IUserDocument> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model<IUserDocument>("User", UserSchema);