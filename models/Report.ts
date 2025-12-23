import mongoose, { Schema, model, models } from 'mongoose';

const ReportSchema = new Schema({
  reportText: String,
  analysis: Object, // Stores the JSON from Gemini
  knowledgeLevel: String,
  createdAt: { type: Date, default: Date.now },
});

// The 'models.Report || model' pattern is vital for Next.js hot-reloading
export default models.Report || model('Report', ReportSchema);