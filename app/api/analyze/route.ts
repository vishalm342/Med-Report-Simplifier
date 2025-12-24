import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { medicalReportSchema } from '@/lib/schema';
import { dbConnect } from '@/lib/db';
import Report from '@/models/Report';

export async function POST(req: Request) {
  try {
    const { reportText, knowledgeLevel } = await req.json();
    
    // Validate API key
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error('Missing GOOGLE_GENERATIVE_AI_API_KEY');
      return Response.json({ error: "API key not configured" }, { status: 500 });
    }
    
    await dbConnect();

    const { object } = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: medicalReportSchema,
      prompt: `Analyze this medical lab report for a [${knowledgeLevel}] level reader: ${reportText}`,
    });

    // Save the result to MongoDB
    const savedReport = await Report.create({
      reportText,
      analysis: object,
      knowledgeLevel
    });

    return Response.json({ analysis: object, reportId: savedReport._id });
  } catch (error: any) {
    console.error('Analysis error details:', error);
    const errorMessage = error?.message || error?.toString() || "Analysis failed";
    return Response.json({ 
      error: errorMessage,
      details: error?.cause?.message || error?.responseBody || 'Unknown error'
    }, { status: 500 });
  }
}