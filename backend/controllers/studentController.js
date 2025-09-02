import StudentAssessment from "../models/studentModel.js";

export const createAssessment = async (req, res) => {
  try {
    const { studentId, schoolYear, semester } = req.body;

    const existing = await StudentAssessment.findOne({ studentId, schoolYear, semester });
    if (existing) {
      return res.status(400).json({ message: "Assessment already submitted for this semester." });
    }

    const assessment = new StudentAssessment(req.body);
    await assessment.save();
    res.status(201).json(assessment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAssessments = async (req, res) => {
  try {
    const assessments = await StudentAssessment.find()
      .populate("studentId", "name email"); 
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAssessmentByStudent = async (req, res) => {
  try {
    const assessment = await StudentAssessment.findOne({
      studentId: req.params.studentId,
    }).populate("studentId", "name email");

    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    res.json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAssessment = async (req, res) => {
  try {
    const updated = await StudentAssessment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Assessment not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAssessment = async (req, res) => {
  try {
    const deleted = await StudentAssessment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Assessment not found" });
    }
    res.json({ message: "Assessment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
