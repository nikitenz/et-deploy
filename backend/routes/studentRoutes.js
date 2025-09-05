import express from "express";
import {
  createAssessment,
  getAssessments,
  getAssessmentByStudent,
  updateAssessment,
  deleteAssessment,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/", createAssessment);

router.get("/", getAssessments);

router.get("/:studentId", getAssessmentByStudent);

router.put("/:id", updateAssessment);

router.delete("/:id", deleteAssessment);

export default router;
