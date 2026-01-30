import express from "express";
import mongoose from "mongoose";
import noteRoutes from "./routes/notes.js";

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.send("Notes API is running");
});

export default app;
