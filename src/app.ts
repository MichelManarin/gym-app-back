import dotenv from "dotenv";
import express, { Application } from "express";
import { connectToDatabase } from "./infrastructure/db/connection";

dotenv.config();

if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRATION || !process.env.MONGO_URI) {
  throw new Error("Env incorreto");
}

connectToDatabase();

import { authRoutes } from "./presentation/routes/auth.route";
import { userRoutes } from "./presentation/routes/user.route";

const app: Application = express();

app.use(express.json());


app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.get('/', (req, res) => {
  res.send("API ON");
});

export { app };