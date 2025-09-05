import express from "express";
import HTE from "../models/hteModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newHTE = new HTE(req.body);
    await newHTE.save();
    res.status(201).json(newHTE);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const htes = await HTE.find();
    res.json(htes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
