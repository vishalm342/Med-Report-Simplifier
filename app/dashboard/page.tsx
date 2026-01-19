'use client';

import { useState } from 'react';
import ReportInputForm from '@/components/dashboard/ReportInputForm';
import AnalysisResult from '@/components/dashboard/AnalysisResult';
import { FileSearch } from 'lucide-react';
import type { MedicalReport } from '@/lib/schema';

type KnowledgeLevel = 'standard' | 'child' | 'professional';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<MedicalReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (text: string, level: KnowledgeLevel) => {
    setIsLoading(true);
    setError(null);
    setReportData(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportText: text,
          knowledgeLevel: level,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze report');
      }

      const data = await response.json();
      setReportData(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-3 gap-8 min-h-[calc(100vh-12rem)]">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-1">
          <ReportInputForm onSubmit={handleAnalyze} isLoading={isLoading} />
        </div>

        {/* Right Column: Results or Placeholder */}
        <div className="lg:col-span-2">
          {isLoading && (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
              <div className="animate-pulse space-y-6">
                <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="h-32 bg-slate-200 rounded"></div>
                  <div className="h-32 bg-slate-200 rounded"></div>
                  <div className="h-32 bg-slate-200 rounded"></div>
                  <div className="h-32 bg-slate-200 rounded"></div>
                </div>
              </div>
              <p className="text-center text-slate-500 mt-6">
                Analyzing your report with AI...
              </p>
            </div>
          )}

          {!isLoading && reportData && (
            <AnalysisResult data={reportData} />
          )}

          {!isLoading && !reportData && !error && (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
              <FileSearch className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                Ready to Analyze
              </h3>
              <p className="text-slate-500 max-w-md mx-auto">
                Paste your medical report text in the form on the left and click "Analyze Report" to get started.
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 rounded-lg border border-red-200 p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Analysis Failed
              </h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
