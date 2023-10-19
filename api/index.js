import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(3000, () => {
  console.log(`Server is running on 3000`);
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
