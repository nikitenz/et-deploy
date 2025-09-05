import mongoose from "mongoose";

const studentAssessmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    schoolYear: { type: String, required: true },
    semester: { type: String, enum: ["1st Semester", "2nd Semester"], required: true },
    courseYearSection: { type: String, required: true },

    // --- Programming & Coding Skills ---
    programming: {
    java: { type: Number, min: 1, max: 5, required: true },
    cpp: { type: Number, min: 1, max: 5, required: true },
    python: { type: Number, min: 1, max: 5, required: true },
    htmlCss: { type: Number, min: 1, max: 5, required: true },
    javascript: { type: Number, min: 1, max: 5, required: true },
    php: { type: Number, min: 1, max: 5, required: true },
    },

    // --- Database Management ---
    database: {
    sql: { type: Number, min: 1, max: 5, required: true },
    dbDesign: { type: Number, min: 1, max: 5, required: true },
    complexQueries: { type: Number, min: 1, max: 5, required: true },
    dbAdmin: { type: Number, min: 1, max: 5, required: true },
    dbTools: { type: Number, min: 1, max: 5, required: true },
    },

    // --- System & Software Development ---
    systemSoftware: {
      requirements: { type: Number, min: 1, max: 5, required: true },
      designArchitecture: { type: Number, min: 1, max: 5, required: true },
      agileScrum: { type: Number, min: 1, max: 5, required: true },
      testingDebugging: { type: Number, min: 1, max: 5, required: true },
      maintenanceTroubleshooting: { type: Number, min: 1, max: 5, required: true },
    },

    // --- Web Development ---
    webDevelopment: {
      uiDesign: { type: Number, min: 1, max: 5, required: true },
      responsiveDesign: { type: Number, min: 1, max: 5, required: true },
      frontEndFrameworks: { type: Number, min: 1, max: 5, required: true },
      backEndDevelopment: { type: Number, min: 1, max: 5, required: true },
    },

    // --- Professional Skills ---
    communication: {
      explainTech: { type: Number, min: 1, max: 5, required: true },
      teamwork: { type: Number, min: 1, max: 5, required: true },
      writtenCommunication: { type: Number, min: 1, max: 5, required: true },
    },
    problemSolving: {
      debugging: { type: Number, min: 1, max: 5, required: true },
      researchIndependently: { type: Number, min: 1, max: 5, required: true },
      criticalThinking: { type: Number, min: 1, max: 5, required: true },
    },
    timeManagement: {
      prioritization: { type: Number, min: 1, max: 5, required: true },
      meetingDeadlines: { type: Number, min: 1, max: 5, required: true },
    },
    adaptability: {
      newTools: { type: Number, min: 1, max: 5, required: true },
      continuousLearning: { type: Number, min: 1, max: 5, required: true },
      emergingTrends: { type: Number, min: 1, max: 5, required: true },
    },
    ethicsProfessionalism: {
      ethicalDecision: { type: Number, min: 1, max: 5, required: true },
      ethicalImpact: { type: Number, min: 1, max: 5, required: true },
      professionalism: { type: Number, min: 1, max: 5, required: true },
      policiesProcedures: { type: Number, min: 1, max: 5, required: true },
      handlingFeedback: { type: Number, min: 1, max: 5, required: true },
    },
  },
  { timestamps: true }
);

const StudentAssessment = mongoose.model("StudentAssessment", studentAssessmentSchema);

export default StudentAssessment;
