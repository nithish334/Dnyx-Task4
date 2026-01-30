import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    const note = new Note({ title, description });
    await note.save();

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

