const express = require("express");
const router = express.Router();
const Note = require("../models/note");


// ✅ CREATE NOTE
router.post("/", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and Description are required" });
  }

  try {
    const note = new Note({ title, description });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET ALL NOTES
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET NOTE BY ID
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ UPDATE NOTE
router.put("/:id", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and Description are required" });
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });

    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ DELETE NOTE
router.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });

    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
