import React, { useState, useEffect } from 'react';
import { analyzeTongue } from './services/geminiService';
import { authService } from './services/authService';
import { TongueAnalysis, ViewState, User, Language } from './types';
import HistorySidebar from './components/HistorySidebar';
import AnalysisResult from './components/AnalysisResult';
import AuthModal from './components/AuthModal';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import { Camera, Menu, Info, Loader2, ArrowRight, User as UserIcon, LogOut, Heart, Activity, Droplet, Wind, ThermometerSun, Globe, Mic, MicOff } from 'lucide-react';
import { translations } from './utils/translations';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [history, setHistory] = useState<TongueAnalysis[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<TongueAnalysis | null>(null);
  
  // Language State
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Form State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Voice Input State
  const [isListening, setIsListening] = useState(false);

  // Effect to toggle font theme based on language
  useEffect(() => {
    if (language === 'zh') {
      document.body.classList.add('zh-mode');
    } else {
      document.body.classList.remove('zh-mode');
    }
  }, [language]);

  useEffect(() => {
    // Check for active session on mount
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setHistory(currentUser.history);
    }
  }, []);

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    
    // If we have history from the user account, load it
    let newHistory = loggedInUser.history;

    // If there is a current pending analysis, save it to the new user's history
    if (currentAnalysis) {
      // Check if this specific analysis is already in history to avoid duplicates
      const exists = newHistory.some(h => h.id === currentAnalysis.id);
      if (!exists) {
        newHistory = [currentAnalysis, ...newHistory];
        authService.updateHistory(loggedInUser.username, newHistory);
      }
    }
    
    setHistory(newHistory);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setHistory([]);
    setView('home');
    setCurrentAnalysis(null);
    setSelectedImage(null);
    setSymptoms('');
  };

  const saveToHistory = (item: TongueAnalysis) => {
    // Always update local state for immediate feedback
    const updated = [item, ...history];
    setHistory(updated);

    // If user is logged in, persist to "DB"
    if (user) {
      authService.updateHistory(user.username, updated);
      // Update local user object as well to keep it in sync
      setUser({ ...user, history: updated });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => {
      if (prev === 'en') return 'zh';
      if (prev === 'zh') return 'fr';
      return 'en';
    });
  };

  const handleVoiceInput = () => {
    if (isListening) {
      // Logic to stop handled by recognition.onend or manual stop if needed, 
      // but standard SpeechRecognition usually stops automatically after silence.
      // We can force stop here if we store the recognition instance, but for simplicity:
      setIsListening(false);
      window.location.reload(); // Simplest way to "cancel" since we aren't storing the instance ref in this simple MVP
      return;
    }

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    // @ts-ignore - SpeechRecognition types are not standard in all TS envs
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    let langCode = 'en-US';
    if (language === 'zh') langCode = 'zh-CN';
    if (language === 'fr') langCode = 'fr-FR';

    recognition.lang = langCode;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSymptoms(prev => {
        const spacer = prev.length > 0 && ![' ', '\n'].includes(prev.slice(-1)) ? ' ' : '';
        return prev + spacer + transcript;
      });
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Clean base64 string
      const base64Data = selectedImage.split(',')[1];
      
      const result = await analyzeTongue(base64Data, symptoms, language);
      
      const newAnalysis: TongueAnalysis = {
        ...result,
        id: Date.now().toString(),
        timestamp: Date.now(),
        imageUrl: selectedImage,
        symptoms
      };

      setCurrentAnalysis(newAnalysis);
      saveToHistory(newAnalysis);
      setView('analyze');
    } catch (err) {
      setError(t.error);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed w-full z-30 bg-[#F7F5F2]/90 backdrop-blur-md border-b border-[#E5E0D8]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => {
              setView('home');
              setCurrentAnalysis(null);
            }}
          >
            <div className="w-8 h-8 rounded-full bg-[#5E7153] flex items-center justify-center text-white font-serif italic font-bold">
              S
            </div>
            <span className="font-serif text-xl text-[#434A42] tracking-tight">{t.appName}</span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-sm font-medium text-[#5E7153] hover:text-[#2C332B] transition-colors min-w-[3rem]"
            >
              <Globe size={18} />
              <span>{language === 'en' ? 'EN' : language === 'zh' ? '中文' : 'FR'}</span>
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-[#5E7153] hidden sm:block">
                  {t.hello}, {user.username}
                </span>
                <button 
                  onClick={() => setIsHistoryOpen(true)}
                  className="p-2 text-[#434A42] hover:bg-[#E5E0D8] rounded-full transition-colors"
                  title="History"
                >
                  <Menu size={24} />
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-[#434A42] hover:bg-[#E5E0D8] rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#5E7153] border border-[#5E7153] rounded-full hover:bg-[#5E7153] hover:text-white transition-all"
              >
                <UserIcon size={16} /> {t.login}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-24 px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          
          {/* HOME VIEW */}
          {view === 'home' && (
            <div className="animate-fade-in space-y-24">
              {/* Hero Section */}
              <section className="text-center space-y-6 py-10">
                <div className="inline-block px-4 py-1.5 border border-[#5E7153] rounded-full text-[#5E7153] text-xs font-bold tracking-widest uppercase mb-4">
                  {t.shangYi}
                </div>
                <h1 className="text-5xl md:text-7xl font-serif text-[#2C332B] leading-tight">
                  {t.heroTitle} <br/>
                  <span className="italic text-[#5E7153]">{t.heroTitleSuffix}</span>
                </h1>
                <p className="text-lg text-[#6B7068] max-w-xl mx-auto leading-relaxed">
                  {t.heroDesc}
                </p>
                
                <div className="flex justify-center pt-8">
                  <button 
                    onClick={() => setView('analyze')}
                    className="group bg-[#2C332B] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#1A2019] transition-all shadow-xl hover:shadow-2xl flex items-center gap-3"
                  >
                    {t.startDiagnosis} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </section>

              {/* TONGUE MAP DIAGRAM SECTION */}
              <section className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E5E0D8]">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-serif text-[#2C332B] mb-3">{t.dashboardTitle}</h3>
                  <p className="text-[#6B7068]">{t.dashboardDesc}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                  
                  {/* CSS-Based Tongue Diagram */}
                  <div className="flex justify-center">
                    <div className="relative w-64 h-80 bg-rose-200 rounded-[50%_50%_40%_40%_/_60%_60%_40%_40%] shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] flex flex-col items-center border-4 border-rose-300 transition-transform hover:scale-105 duration-500">
                      
                      {/* Tip: Heart */}
                      <div className="absolute top-6 w-full flex justify-center group">
                        <div className="w-16 h-12 rounded-full bg-red-400/20 border border-red-400/50 flex items-center justify-center cursor-help transition-all group-hover:bg-red-400/40">
                          <span className="text-[10px] font-bold text-red-800 uppercase tracking-widest bg-white/80 px-2 py-0.5 rounded-full">Heart</span>
                        </div>
                      </div>

                      {/* Upper Center: Lungs */}
                      <div className="absolute top-20 w-full flex justify-center group">
                         <div className="w-24 h-10 bg-slate-400/10 border border-slate-400/30 rounded-full flex items-center justify-center cursor-help">
                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-white/80 px-2 py-0.5 rounded-full">Lungs</span>
                         </div>
                      </div>

                      {/* Center: Spleen/Stomach */}
                      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-center group">
                        <div className="w-20 h-20 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center cursor-help transition-all group-hover:bg-amber-400/40">
                          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest bg-white/80 px-2 py-0.5 rounded-full">Stomach</span>
                        </div>
                      </div>

                      {/* Sides: Liver/Gallbladder */}
                      <div className="absolute left-2 top-1/2 w-8 h-32 -translate-y-1/2 bg-emerald-400/20 rounded-l-xl border-l border-emerald-400/50 flex items-center justify-center cursor-help">
                        <span className="vertical-rl text-[10px] font-bold text-emerald-800 uppercase tracking-widest rotate-180" style={{ writingMode: 'vertical-rl' }}>Liver</span>
                      </div>
                      <div className="absolute right-2 top-1/2 w-8 h-32 -translate-y-1/2 bg-emerald-400/20 rounded-r-xl border-r border-emerald-400/50 flex items-center justify-center cursor-help">
                        <span className="vertical-rl text-[10px] font-bold text-emerald-800 uppercase tracking-widest rotate-180" style={{ writingMode: 'vertical-rl' }}>Gallbladder</span>
                      </div>

                      {/* Root: Kidney */}
                      <div className="absolute bottom-6 w-full flex justify-center group">
                        <div className="w-20 h-16 rounded-full bg-blue-400/20 border border-blue-400/50 flex items-center justify-center cursor-help transition-all group-hover:bg-blue-400/40">
                          <span className="text-[10px] font-bold text-blue-800 uppercase tracking-widest bg-white/80 px-2 py-0.5 rounded-full">Kidney</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-[#F7F5F2] rounded-xl text-[#5E7153] mt-1">
                        <Heart size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#434A42]">{t.tip}</h4>
                        <p className="text-sm text-[#6B7068]">{t.tipDesc}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-[#F7F5F2] rounded-xl text-amber-600 mt-1">
                        <Activity size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#434A42]">{t.center}</h4>
                        <p className="text-sm text-[#6B7068]">{t.centerDesc}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-[#F7F5F2] rounded-xl text-emerald-600 mt-1">
                        <Wind size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#434A42]">{t.sides}</h4>
                        <p className="text-sm text-[#6B7068]">{t.sidesDesc}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-[#F7F5F2] rounded-xl text-blue-600 mt-1">
                        <Droplet size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#434A42]">{t.root}</h4>
                        <p className="text-sm text-[#6B7068]">{t.rootDesc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* DECODING THE SIGNS SECTION */}
              <section className="pb-10">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-serif text-[#2C332B] mb-3">{t.decodingTitle}</h3>
                  <p className="text-[#6B7068]">{t.decodingDesc}</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Card 1: Color */}
                  <div className="bg-[#FCFAF8] p-6 rounded-2xl border border-[#E5E0D8] hover:border-[#5E7153] transition-colors">
                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mb-4">
                      <ThermometerSun size={24} />
                    </div>
                    <h4 className="text-xl font-serif text-[#2C332B] mb-2">{t.color}</h4>
                    <p className="text-sm text-[#6B7068] leading-relaxed">
                      {t.colorDesc} 
                      <br/><br/>
                      {t.colorRed}<br/>
                      {t.colorPale}<br/>
                      {t.colorPurple}
                    </p>
                  </div>

                  {/* Card 2: Shape */}
                  <div className="bg-[#FCFAF8] p-6 rounded-2xl border border-[#E5E0D8] hover:border-[#5E7153] transition-colors">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                      <Activity size={24} />
                    </div>
                    <h4 className="text-xl font-serif text-[#2C332B] mb-2">{t.shape}</h4>
                    <p className="text-sm text-[#6B7068] leading-relaxed">
                      {t.shapeDesc}
                      <br/><br/>
                      {t.shapeSwollen}<br/>
                      {t.shapeThin}<br/>
                      {t.shapeTeeth}
                    </p>
                  </div>

                  {/* Card 3: Coating */}
                  <div className="bg-[#FCFAF8] p-6 rounded-2xl border border-[#E5E0D8] hover:border-[#5E7153] transition-colors">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-4">
                      <Droplet size={24} />
                    </div>
                    <h4 className="text-xl font-serif text-[#2C332B] mb-2">{t.coating}</h4>
                    <p className="text-sm text-[#6B7068] leading-relaxed">
                      {t.coatingDesc}
                      <br/><br/>
                      {t.coatingYellow}<br/>
                      {t.coatingWhite}<br/>
                      {t.coatingPeeled}
                    </p>
                  </div>
                </div>
              </section>

              {/* Call to Action */}
              <div className="bg-[#2C332B] rounded-3xl p-10 text-center text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-serif mb-4">{t.readyTitle}</h3>
                  <p className="text-[#D6E0D2] mb-8 max-w-lg mx-auto">
                    {t.readyDesc}
                  </p>
                  <button 
                    onClick={() => setView('analyze')}
                    className="bg-[#F7F5F2] text-[#2C332B] px-8 py-3 rounded-full font-bold hover:bg-white transition-colors"
                  >
                    {t.startFree}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ANALYZE VIEW */}
          {view === 'analyze' && !currentAnalysis && (
            <div className="max-w-2xl mx-auto animate-fade-in">
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-[#E5E0D8]">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-serif text-[#2C332B] mb-3">{t.uploadTitle}</h2>
                  <p className="text-[#6B7068]">{t.uploadDesc}</p>
                </div>

                <div className="space-y-8">
                  {/* Image Upload Area */}
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className={`
                      border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300
                      ${selectedImage ? 'border-[#5E7153] bg-[#F7F5F2]' : 'border-[#D1CCC5] hover:border-[#5E7153] hover:bg-[#FAF9F7]'}
                    `}>
                      {selectedImage ? (
                        <div className="relative h-64 w-full">
                          <img 
                            src={selectedImage} 
                            alt="Upload preview" 
                            className="w-full h-full object-contain rounded-lg"
                          />
                          <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur text-xs px-3 py-1 rounded-full text-[#434A42]">
                            {t.clickToChange}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center py-8">
                          <div className="w-16 h-16 bg-[#E5E0D8] rounded-full flex items-center justify-center text-[#5E7153] mb-4 group-hover:scale-110 transition-transform">
                            <Camera size={32} />
                          </div>
                          <span className="text-lg font-medium text-[#434A42]">{t.tapToUpload}</span>
                          <span className="text-sm text-[#8C9A8B] mt-2">{t.formatSupport}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Symptoms Input */}
                  <div>
                    <label className="block text-sm font-bold text-[#434A42] uppercase tracking-wide mb-3">
                      {t.symptomsLabel}
                    </label>
                    <div className="relative">
                      <textarea 
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        placeholder={t.symptomsPlaceholder}
                        className="w-full p-4 pr-12 rounded-xl bg-[#FAF9F7] border border-[#D1CCC5] focus:border-[#5E7153] focus:ring-1 focus:ring-[#5E7153] outline-none transition-all resize-none h-32 text-[#434A42]"
                      />
                      {/* Voice Input Button */}
                      <button
                        onClick={handleVoiceInput}
                        className={`absolute bottom-3 right-3 p-2 rounded-full transition-all ${
                          isListening 
                            ? 'bg-red-500 text-white animate-pulse' 
                            : 'bg-[#E5E0D8] text-[#5E7153] hover:bg-[#5E7153] hover:text-white'
                        }`}
                        title={isListening ? "Stop listening" : "Start voice input"}
                      >
                        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                      </button>
                    </div>
                    {isListening && <p className="text-xs text-[#5E7153] mt-1 ml-1 animate-pulse font-medium">{t.voiceListening}</p>}
                    {!isListening && symptoms.length === 0 && <p className="text-xs text-[#8C9A8B] mt-1 ml-1">{t.voiceStart}</p>}
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 flex items-center gap-2">
                       <Info size={16} /> {error}
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="space-y-4">
                    <button 
                      onClick={handleAnalyze}
                      disabled={!selectedImage || loading}
                      className={`
                        w-full py-4 rounded-xl text-lg font-medium flex items-center justify-center gap-3 transition-all
                        ${!selectedImage || loading 
                          ? 'bg-[#E5E0D8] text-[#8C9A8B] cursor-not-allowed' 
                          : 'bg-[#2C332B] text-white hover:bg-[#1A2019] shadow-lg hover:shadow-xl'}
                      `}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" /> {t.analyzing}
                        </>
                      ) : (
                        t.analyzeBtn
                      )}
                    </button>
                    
                    {!user && selectedImage && (
                       <p className="text-center text-xs text-[#8C9A8B]">
                         {t.loginNote}
                       </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RESULTS VIEW */}
          {view === 'analyze' && currentAnalysis && (
            <AnalysisResult 
              data={currentAnalysis} 
              language={language}
              onReset={() => {
                setCurrentAnalysis(null);
                setSelectedImage(null);
                setSymptoms('');
              }} 
            />
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#EBE7E0] py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            <div>
              <h4 className="font-serif text-lg font-bold text-[#434A42]">{t.appName}</h4>
              <p className="text-sm text-[#6B7068] mt-2">Harmonizing ancient wisdom with modern intelligence.</p>
            </div>
            <div className="max-w-md text-xs text-[#8C9A8B] leading-relaxed">
              <span className="font-bold block mb-1">HEALTH DISCLAIMER</span>
              <p>
                This application is for educational and wellness purposes only and does not constitute medical advice, diagnosis, or treatment. 
                Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="border-t border-[#D1CCC5] pt-6 flex flex-wrap gap-6 text-xs">
            <button 
              onClick={() => setIsTermsOpen(true)}
              className="text-[#5E7153] hover:text-[#434A42] font-medium transition-colors"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => setIsPrivacyOpen(true)}
              className="text-[#5E7153] hover:text-[#434A42] font-medium transition-colors"
            >
              Privacy Policy
            </button>
            <a 
              href="https://github.com/tianchengc/tonguebalance-ai "
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5E7153] hover:text-[#434A42] font-medium transition-colors"
            >
              GitHub
            </a>
          </div>

          <div className="text-xs text-[#8C9A8B] mt-6">
            © 2026 Tongue Balance AI. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Sidebar */}
      <HistorySidebar 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        language={language}
        onSelect={(item) => {
          setCurrentAnalysis(item);
          setView('analyze');
        }}
      />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        language={language}
      />

      {/* Terms of Service Modal */}
      <TermsOfService 
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        language={language}
      />

      {/* Privacy Policy Modal */}
      <PrivacyPolicy 
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        language={language}
      />
    </div>
  );
};

export default App;