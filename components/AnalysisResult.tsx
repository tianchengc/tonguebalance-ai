import React from 'react';
import { TongueAnalysis, Language } from '../types';
import { Leaf, Droplet, Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import { translations } from '../utils/translations';

interface AnalysisResultProps {
  data: TongueAnalysis;
  onReset: () => void;
  language: Language;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ data, onReset, language }) => {
  const t = translations[language];

  // Defensive checks in case AI returns incomplete data
  const tongueBody = data.tongue_body || { color: t.unknown, shape: t.unknown, moisture: t.unknown };
  const coating = data.coating || { color: t.unknown, thickness: t.unknown, texture: t.unknown };
  const recommendations = data.recommendations || { 
    diet: { eat: [], avoid: [] }, 
    lifestyle: [], 
    exercise: t.generalRest 
  };
  const diet = recommendations.diet || { eat: [], avoid: [] };
  const suggestedCourse = data.suggested_course || { 
    name: t.generalWellness, 
    description: t.generalWellness, 
    difficulty: 'Beginner' 
  };

  return (
    <div className="animate-fade-in pb-20">
      
      {/* Header Summary */}
      <div className="text-center mb-10">
        <span className="text-xs font-bold tracking-[0.2em] text-[#8C9A8B] uppercase mb-2 block">
          {t.diagnosisResult}
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-[#434A42] mb-4">
          {data.pattern || t.patternAnalysis}
        </h2>
        <p className="text-lg text-[#6B7068] max-w-2xl mx-auto leading-relaxed">
          {data.explanation || "No detailed explanation available."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Tongue Details Card */}
        <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_-2px_rgba(67,74,66,0.05)] border border-[#F0EBE5]">
          <h3 className="font-serif text-2xl text-[#434A42] mb-6 flex items-center">
            <Activity className="w-5 h-5 mr-3 text-[#8C9A8B]" />
            {t.clinicalObservation}
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-[#8C9A8B] uppercase tracking-wide mb-2">{t.tongueBody}</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#F7F5F2] text-[#5E7153] rounded-full text-sm">{tongueBody.color}</span>
                <span className="px-3 py-1 bg-[#F7F5F2] text-[#5E7153] rounded-full text-sm">{tongueBody.shape}</span>
                <span className="px-3 py-1 bg-[#F7F5F2] text-[#5E7153] rounded-full text-sm">{tongueBody.moisture}</span>
              </div>
            </div>
            
            <div className="h-px bg-[#F0EBE5]"></div>

            <div>
              <h4 className="text-sm font-bold text-[#8C9A8B] uppercase tracking-wide mb-2">{t.tongueCoating}</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#F7F5F2] text-[#5E7153] rounded-full text-sm">{coating.color}</span>
                <span className="px-3 py-1 bg-[#F7F5F2] text-[#5E7153] rounded-full text-sm">{coating.thickness}</span>
                <span className="px-3 py-1 bg-[#F7F5F2] text-[#5E7153] rounded-full text-sm">{coating.texture}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Card */}
        <div className="bg-[#5E7153] p-8 rounded-2xl shadow-xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          
          <h3 className="font-serif text-2xl mb-6 flex items-center relative z-10">
            <Leaf className="w-5 h-5 mr-3 text-[#D6E0D2]" />
            {t.wellnessPlan}
          </h3>

          <div className="space-y-6 relative z-10">
            <div>
              <h4 className="text-xs font-bold text-[#D6E0D2] uppercase tracking-wide mb-2">{t.dietaryGuidance}</h4>
              <div className="mb-2">
                <span className="text-[#D6E0D2] text-sm mr-2">{t.beneficial}:</span>
                <span className="font-medium">{diet.eat?.join(", ") || t.noneSpecified}</span>
              </div>
              <div>
                <span className="text-[#D6E0D2] text-sm mr-2">{t.avoid}:</span>
                <span className="font-medium opacity-90">{diet.avoid?.join(", ") || t.noneSpecified}</span>
              </div>
            </div>

            <div className="h-px bg-white/20"></div>

            <div>
              <h4 className="text-xs font-bold text-[#D6E0D2] uppercase tracking-wide mb-2">{t.lifestyleExercise}</h4>
              <ul className="list-disc list-inside text-sm space-y-1 opacity-90 mb-2">
                {recommendations.lifestyle?.map((l, i) => <li key={i}>{l}</li>) || <li>{t.generalRest}</li>}
              </ul>
              <div className="mt-2 flex items-center text-[#F0EBE5]">
                 <Activity size={14} className="mr-2" />
                 <span>{recommendations.exercise}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Course (Monetization) */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 md:p-8 mb-12">
         <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
               <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="text-amber-600" size={20} />
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">{t.premiumRec}</span>
               </div>
               <h3 className="font-serif text-2xl text-[#2C332B] mb-2">{suggestedCourse.name}</h3>
               <p className="text-[#6B7068] mb-3">{suggestedCourse.description}</p>
               <span className="inline-block px-2 py-1 bg-stone-200 text-xs rounded text-stone-600 font-bold uppercase">
                 {suggestedCourse.difficulty}
               </span>
            </div>
            <button className="whitespace-nowrap px-6 py-3 bg-[#2C332B] text-white rounded-lg font-medium hover:bg-[#1A2019] transition-colors flex items-center gap-2 shadow-lg">
              {t.startCourse} <ArrowRight size={16} />
            </button>
         </div>
      </div>

      <div className="text-center">
        <button 
          onClick={onReset}
          className="text-[#5E7153] font-medium hover:text-[#434A42] border-b border-transparent hover:border-[#434A42] transition-all pb-0.5"
        >
          {t.analyzeAnother}
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;