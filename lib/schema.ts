import { z } from 'zod';

export const medicalReportSchema = z.object({
  summary: z.string().describe("A 2-sentence empathetic summary for the patient."),
  disclaimer: z.string().describe("Standard non-diagnostic warning text."),
  priorityLevel: z.enum(['Routine', 'Consult Soon', 'Urgent']).describe("Overall urgency level based on all biomarkers"),
  biomarkers: z.array(z.object({
    name: z.string(),
    userValue: z.number(),
    unit: z.string(),
    normalRangeMin: z.number(),
    normalRangeMax: z.number(),
    status: z.enum(['Low', 'Normal', 'High']),
    organSystem: z.string().describe("Organ system this marker relates to (e.g., Renal, Hepatic, Cardiovascular, Metabolic, Hematologic)"),
    clinicalSignificance: z.string().describe("1-2 sentence explanation on why this marker matters clinically"),
    icd10Code: z.string().optional().describe("ICD-10 code if abnormal condition is identified")
  })),
  organHealth: z.object({
    cardiovascular: z.enum(['Optimal', 'Monitor', 'Attention Needed']).describe("Heart and circulatory system health status"),
    renal: z.enum(['Optimal', 'Monitor', 'Attention Needed']).describe("Kidney health status"),
    hepatic: z.enum(['Optimal', 'Monitor', 'Attention Needed']).describe("Liver health status"),
    metabolic: z.enum(['Optimal', 'Monitor', 'Attention Needed']).describe("Metabolic health status"),
    hematologic: z.enum(['Optimal', 'Monitor', 'Attention Needed']).describe("Blood health status")
  }),
  lifestyleRoadmap: z.object({
    dietaryAdvice: z.object({
      foodsToEmbrace: z.array(z.string()).describe("Beneficial foods based on the report (3-5 items)"),
      foodsToAvoid: z.array(z.string()).describe("Foods to limit or avoid based on the report (3-5 items)")
    }),
    keyRecommendations: z.array(z.string()).describe("3-5 actionable lifestyle recommendations")
  }),
  suggestions: z.array(z.string()).describe("3-5 follow-up questions for a doctor.")
});

export type MedicalReport = z.infer<typeof medicalReportSchema>;