import { z } from 'zod';

export const medicalReportSchema = z.object({
  summary: z.string().describe("A 2-sentence empathetic summary for the patient."),
  disclaimer: z.string().describe("Standard non-diagnostic warning text."),
  biomarkers: z.array(z.object({
    name: z.string(),
    value: z.number(),
    unit: z.string(),
    status: z.enum(['Low', 'Normal', 'High']),
    range: z.string().describe("Healthy reference range (e.g., 70-100)"),
    explanation: z.string().describe("10-word simple explanation.")
  })),
  suggestions: z.array(z.string()).describe("3-5 follow-up questions for a doctor.")
});

export type MedicalReport = z.infer<typeof medicalReportSchema>;