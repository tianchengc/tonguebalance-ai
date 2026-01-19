import React from 'react';
import { TongueAnalysis, Language } from '../types';
import { Clock, ChevronRight } from 'lucide-react';
import { translations } from '../utils/translations';

interface HistorySidebarProps {
  history: TongueAnalysis[];
  onSelect: (analysis: TongueAnalysis) => void;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ history, onSelect, isOpen, onClose, language }) => {
  const t = translations[language];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 right-0 h-full w-80 bg-[#FCFAF8] shadow-2xl transform transition-transform duration-300 ease-in-out z-50 border-l border-[#E5E0D8] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8 border-b border-[#E5E0D8] pb-4">
            <h2 className="text-2xl font-serif text-[#434A42] italic">{t.historyTitle}</h2>
            <button onClick={onClose} className="text-[#8C9A8B] hover:text-[#434A42]">
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4">
            {history.length === 0 ? (
              <div className="text-center text-[#8C9A8B] mt-10">
                <p>{t.noRecords}</p>
                <p className="text-sm mt-2">{t.startJourney}</p>
              </div>
            ) : (
              history.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className="group cursor-pointer p-4 bg-white border border-[#E5E0D8] rounded-lg hover:border-[#8C9A8B] transition-all hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold tracking-widest text-[#8C9A8B] uppercase">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                    <Clock size={14} className="text-[#8C9A8B]" />
                  </div>
                  <h4 className="font-serif text-lg text-[#434A42] mb-1 group-hover:text-[#5E7153]">
                    {item.pattern}
                  </h4>
                  <p className="text-xs text-[#6B7068] line-clamp-2">
                    {item.explanation}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default HistorySidebar;