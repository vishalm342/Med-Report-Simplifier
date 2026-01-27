'use client';

import { useState } from 'react';
import { FileText, Send } from 'lucide-react';

type KnowledgeLevel = 'standard' | 'child' | 'professional';

interface ReportInputFormProps {
  onSubmit: (text: string, level: KnowledgeLevel) => void;
  isLoading: boolean;
}

export default function ReportInputForm({ onSubmit, isLoading }: ReportInputFormProps) {
  const [reportText, setReportText] = useState('');
  const [knowledgeLevel, setKnowledgeLevel] = useState<KnowledgeLevel>('standard');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reportText.trim()) {
      onSubmit(reportText, knowledgeLevel);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sticky top-8">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-slate-900">
          Medical Report Input
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Report Text Input */}
        <div>
          <label htmlFor="reportText" className="block text-sm font-medium text-slate-700 mb-2">
            Paste Your Report
          </label>
          <textarea
            id="reportText"
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            placeholder={
              'Example:\nHemoglobin: 13.5 g/dL\nWBC Count: 7,200 /µL\nGlucose: 95 mg/dL\nCreatinine: 1.0 mg/dL\nALT: 28 U/L\n...'
            }
            className="w-full h-64 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm text-slate-900"
            disabled={isLoading}
            required
          />
          <p className="mt-2 text-xs text-slate-500">
            Include test names, values, and units for best results
          </p>
        </div>

        {/* Knowledge Level Selector */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Explanation Level
          </label>
          <div className="space-y-2">
            <label className="flex items-center p-3 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
              <input
                type="radio"
                name="knowledgeLevel"
                value="child"
                checked={knowledgeLevel === 'child'}
                onChange={(e) => setKnowledgeLevel(e.target.value as KnowledgeLevel)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                disabled={isLoading}
              />
              <div className="ml-3">
                <div className="text-sm font-medium text-slate-900">Simple</div>
                <div className="text-xs text-slate-500">Easy-to-understand explanations</div>
              </div>
            </label>

            <label className="flex items-center p-3 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
              <input
                type="radio"
                name="knowledgeLevel"
                value="standard"
                checked={knowledgeLevel === 'standard'}
                onChange={(e) => setKnowledgeLevel(e.target.value as KnowledgeLevel)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                disabled={isLoading}
              />
              <div className="ml-3">
                <div className="text-sm font-medium text-slate-900">Standard</div>
                <div className="text-xs text-slate-500">Balanced medical terminology</div>
              </div>
            </label>

            <label className="flex items-center p-3 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
              <input
                type="radio"
                name="knowledgeLevel"
                value="professional"
                checked={knowledgeLevel === 'professional'}
                onChange={(e) => setKnowledgeLevel(e.target.value as KnowledgeLevel)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                disabled={isLoading}
              />
              <div className="ml-3">
                <div className="text-sm font-medium text-slate-900">Professional</div>
                <div className="text-xs text-slate-500">Clinical-level detail</div>
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !reportText.trim()}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          <Send className="w-5 h-5" />
          {isLoading ? 'Analyzing...' : 'Analyze Report'}
        </button>
      </form>
    </div>
  );
}
