import MasterlistUpload from "../models/MasterlistUpload.js";
import xlsx from "xlsx";
import fs from "fs";

// Upload masterlist (CSV/XLSX)
export const uploadMasterlist = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    const students = rows.map(r => ({
      studentId: r.studentId?.toString(),
      name: r.name,
      email: r.email,
      course: r.course,
      year: r.year,
    }));

    const upload = new MasterlistUpload({
      uploadedBy: req.user._id,
      students,
    });
    await upload.save();

    fs.unlinkSync(req.file.path);

    res.status(201).json({ message: "Masterlist uploaded", uploadId: upload._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error uploading masterlist" });
  }
};

// Verify uploaded masterlist
export const verifyMasterlist = async (req, res) => {
  try {
    const { uploadId } = req.params;
    const upload = await MasterlistUpload.findById(uploadId);
    if (!upload) return res.status(404).json({ message: "Upload not found" });

    let verifiedCount = 0;
    upload.students.forEach(s => {
      if (!s.verified) {
        s.verified = true;
        verifiedCount++;
      }
    });

    await upload.save();

    res.json({ message: "Verification complete", verifiedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error verifying masterlist" });
  }
};
