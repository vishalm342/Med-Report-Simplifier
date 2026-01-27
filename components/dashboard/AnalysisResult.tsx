'use client';

import { MedicalReport } from '@/lib/schema';
import SafetyBanner from '@/components/ui/SafetyBanner';
import { 
  Heart, 
  Droplet, 
  Activity, 
  Flame, 
  TestTube,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  CheckCircle2,
  Eye,
  Apple,
  Ban,
  Lightbulb,
  MessageSquare
} from 'lucide-react';

interface AnalysisResultProps {
  data: MedicalReport;
}

const priorityColors = {
  'Routine': 'bg-green-100 text-green-800 border-green-300',
  'Consult Soon': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'Urgent': 'bg-red-100 text-red-800 border-red-300',
};

const statusColors = {
  'Low': 'text-blue-600',
  'Normal': 'text-green-600',
  'High': 'text-red-600',
};

const statusIcons = {
  'Low': TrendingDown,
  'Normal': Minus,
  'High': TrendingUp,
};

const organIcons = {
  cardiovascular: Heart,
  renal: Droplet,
  hepatic: Activity,
  metabolic: Flame,
  hematologic: TestTube,
};

const healthStatusColors = {
  'Optimal': 'bg-green-100 text-green-800 border-green-300',
  'Monitor': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'Attention Needed': 'bg-red-100 text-red-800 border-red-300',
};

export default function AnalysisResult({ data }: AnalysisResultProps) {
  return (
    <div className="space-y-6">
      {/* Safety Banner */}
      <SafetyBanner />

      {/* Summary Section */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h2 className="text-2xl font-semibold text-slate-900">Analysis Summary</h2>
          <span className={`px-4 py-2 rounded-lg border font-medium text-sm ${priorityColors[data.priorityLevel]}`}>
            {data.priorityLevel}
          </span>
        </div>
        <p className="text-slate-700 leading-relaxed">{data.summary}</p>
      </div>

      {/* Organ Health Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          Organ System Health
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(data.organHealth).map(([organ, status]) => {
            const Icon = organIcons[organ as keyof typeof organIcons];
            return (
              <div key={organ} className={`p-4 rounded-lg border ${healthStatusColors[status]}`}>
                <div className="flex items-center gap-3">
                  <Icon className="w-6 h-6" />
                  <div>
                    <div className="font-medium capitalize">{organ}</div>
                    <div className="text-sm">{status}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Biomarkers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <TestTube className="w-5 h-5 text-blue-600" />
          Biomarkers
        </h3>
        <div className="space-y-4">
          {data.biomarkers.map((marker, index) => {
            const StatusIcon = statusIcons[marker.status];
            const isAbnormal = marker.status !== 'Normal';
            
            return (
              <div 
                key={index} 
                className={`p-4 rounded-lg border ${isAbnormal ? 'border-orange-200 bg-orange-50' : 'border-slate-200'}`}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-slate-900">{marker.name}</h4>
                      <span className={`text-sm font-medium ${statusColors[marker.status]} flex items-center gap-1`}>
                        <StatusIcon className="w-4 h-4" />
                        {marker.status}
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      <span className="font-medium">{marker.userValue} {marker.unit}</span>
                      <span className="text-slate-500 ml-2">
                        (Normal: {marker.normalRangeMin}-{marker.normalRangeMax} {marker.unit})
                      </span>
                    </div>
                    <div className="text-sm text-slate-600">
                      <span className="font-medium text-slate-700">System:</span> {marker.organSystem}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{marker.clinicalSignificance}</p>
                {marker.icd10Code && (
                  <div className="mt-2 text-xs text-slate-500">
                    <span className="font-medium">ICD-10:</span> {marker.icd10Code}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lifestyle Roadmap */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          Lifestyle Roadmap
        </h3>
        
        {/* Dietary Advice */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Apple className="w-5 h-5 text-green-600" />
              Foods to Embrace
            </h4>
            <ul className="space-y-2">
              {data.lifestyleRoadmap.dietaryAdvice.foodsToEmbrace.map((food, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  {food}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Ban className="w-5 h-5 text-red-600" />
              Foods to Limit
            </h4>
            <ul className="space-y-2">
              {data.lifestyleRoadmap.dietaryAdvice.foodsToAvoid.map((food, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  {food}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key Recommendations */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            Key Recommendations
          </h4>
          <ul className="space-y-2">
            {data.lifestyleRoadmap.keyRecommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Doctor Questions */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          Questions for Your Doctor
        </h3>
        <ul className="space-y-3">
          {data.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-3 text-slate-700">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-sm font-medium flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="text-sm leading-relaxed">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
        <p className="text-xs text-slate-600 leading-relaxed">
          {data.disclaimer}
        </p>
      </div>
    </div>
  );
}
