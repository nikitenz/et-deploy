import mongoose from "mongoose";

const hteSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  address: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  industry: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const HTE = mongoose.model("HTE", hteSchema);
export default HTE;
