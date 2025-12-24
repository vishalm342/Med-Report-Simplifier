import { AlertTriangle } from 'lucide-react';

export default function SafetyBanner() {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-amber-900 mb-1">
            Non-Diagnostic Notice
          </h3>
          <p className="text-sm text-amber-900 leading-relaxed">
            This summary is AI-generated for educational purposes only. Consult a medical professional for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
