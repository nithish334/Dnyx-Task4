import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error(err));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running successfully 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

export default app;
