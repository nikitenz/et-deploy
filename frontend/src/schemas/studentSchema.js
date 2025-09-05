import { z } from "zod"

export const studentSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  schoolYear: z.string().min(1, "School year is required"),
  semester: z.enum(["1st Semester", "2nd Semester"]),
  courseYearSection: z.string().min(1, "Course, Year, and Section are required"),

  programming: z.object({
    java: z.number().min(1).max(5),
    cpp: z.number().min(1).max(5),
    python: z.number().min(1).max(5),
    htmlCss: z.number().min(1).max(5),
    javascript: z.number().min(1).max(5),
    php: z.number().min(1).max(5),
  }),

  database: z.object({
    sql: z.number().min(1).max(5),
    dbDesign: z.number().min(1).max(5),
    complexQueries: z.number().min(1).max(5),
    dbAdmin: z.number().min(1).max(5),
    dbTools: z.number().min(1).max(5),
  }),

  systemSoftware: z.object({
    requirements: z.number().min(1).max(5),
    designArchitecture: z.number().min(1).max(5),
    agileScrum: z.number().min(1).max(5),
    testingDebugging: z.number().min(1).max(5),
    maintenanceTroubleshooting: z.number().min(1).max(5),
  }),

  webDevelopment: z.object({
    uiDesign: z.number().min(1).max(5),
    responsiveDesign: z.number().min(1).max(5),
    frontEndFrameworks: z.number().min(1).max(5),
    backEndDevelopment: z.number().min(1).max(5),
  }),

  communication: z.object({
    explainTech: z.number().min(1).max(5),
    teamwork: z.number().min(1).max(5),
    writtenCommunication: z.number().min(1).max(5),
  }),

  problemSolving: z.object({
    debugging: z.number().min(1).max(5),
    researchIndependently: z.number().min(1).max(5),
    criticalThinking: z.number().min(1).max(5),
  }),

  timeManagement: z.object({
    prioritization: z.number().min(1).max(5),
    meetingDeadlines: z.number().min(1).max(5),
  }),

  adaptability: z.object({
    newTools: z.number().min(1).max(5),
    continuousLearning: z.number().min(1).max(5),
    emergingTrends: z.number().min(1).max(5),
  }),

  ethicsProfessionalism: z.object({
    ethicalDecision: z.number().min(1).max(5),
    ethicalImpact: z.number().min(1).max(5),
    professionalism: z.number().min(1).max(5),
    policiesProcedures: z.number().min(1).max(5),
    handlingFeedback: z.number().min(1).max(5),
  }),
})
