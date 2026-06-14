const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
require("dotenv").config();

const User = require("./models/User");
const Subject = require("./models/Subject");
const Chapter = require("./models/Chapter");
const Note = require("./models/Note");
const StickyNote = require("./models/StickyNote");

const app = express();

app.use(cors());
app.use(express.json());

console.log("Running File:", __filename);

// ================= DATABASE =================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
  });

// ================= BASIC ROUTES =================

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.get("/test", (req, res) => {
  res.send("Test Route Working");
});

// ================= AUTH =================

// Register
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= SUBJECTS =================

// Create Subject
app.post("/subjects", auth, async (req, res) => {
  try {
    const subject = await Subject.create({
      name: req.body.name,
      userId: req.user.userId,
    });

    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get Subjects
app.get("/subjects", auth, async (req, res) => {
  try {
    const subjects = await Subject.find({
      userId: req.user.userId,
    });

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update Subject
app.put("/subjects/:id", async (req, res) => {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete Subject
app.delete("/subjects/:id", async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Subject Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= CHAPTERS =================

// Create Chapter
app.post("/chapters", auth, async (req, res) => {
  try {
    const chapter = await Chapter.create({
      title: req.body.title,
      subjectId: req.body.subjectId,
      userId: req.user.userId,
    });

    res.status(201).json(chapter);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get Chapters
app.get("/chapters", auth, async (req, res) => {
  try {
    const chapters = await Chapter.find({
      userId: req.user.userId,
    }).populate("subjectId");

    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update Chapter
app.put("/chapters/:id", async (req, res) => {
  try {
    const updatedChapter = await Chapter.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedChapter);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete Chapter
app.delete("/chapters/:id", async (req, res) => {
  try {
    await Chapter.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Chapter Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= NOTES =================

// Create Note
app.post("/notes", auth, async (req, res) => {
  try {
    const note = await Note.create({
      title: req.body.title,
      content: req.body.content,
      chapterId: req.body.chapterId,
      userId: req.user.userId,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get Notes
app.get("/notes", auth, async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user.userId,
    }).populate({
      path: "chapterId",
      populate: {
        path: "subjectId",
      },
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update Note
app.put("/notes/:id", async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete Note
app.delete("/notes/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Note Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= STICKY NOTES =================

// ================= STICKY NOTES =================

// Create Sticky Note
app.post("/sticky-notes", auth, async (req, res) => {
  try {
    const stickyNote = await StickyNote.create({
      title: req.body.title,
      content: req.body.content,
      color: req.body.color,
      userId: req.user.userId,
    });

    res.status(201).json(stickyNote);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get Sticky Notes
app.get("/sticky-notes", auth, async (req, res) => {
  try {
    const stickyNotes = await StickyNote.find({
      userId: req.user.userId,
    });

    res.status(200).json(stickyNotes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update Sticky Note
app.put("/sticky-notes/:id", async (req, res) => {
  try {
    const updatedStickyNote =
      await StickyNote.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json(updatedStickyNote);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete Sticky Note
app.delete("/sticky-notes/:id", async (req, res) => {
  try {
    await StickyNote.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Sticky Note Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});