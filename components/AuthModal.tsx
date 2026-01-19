import React, { useState } from 'react';
import { X, Lock, User as UserIcon, Loader2 } from 'lucide-react';
import { authService } from '../services/authService';
import { User, Language } from '../types';
import { translations } from '../utils/translations';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  language: Language;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess, language }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const t = translations[language];

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simulate network delay for better UX
    setTimeout(() => {
      let result;
      if (isLogin) {
        result = authService.login(username, password);
      } else {
        result = authService.signup(username, password);
      }

      setLoading(false);

      if ('error' in result) {
        setError(result.error as string);
      } else {
        onLoginSuccess(result as User);
        onClose();
        // Reset form
        setUsername('');
        setPassword('');
        setError(null);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#2C332B]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-[#FCFAF8] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in border border-[#E5E0D8]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8C9A8B] hover:text-[#434A42] transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif text-[#2C332B] mb-2">
              {isLogin ? t.welcomeBack : t.joinJourney}
            </h2>
            <p className="text-[#6B7068] text-sm">
              {isLogin 
                ? t.continuePath 
                : t.createRecord}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#434A42] uppercase tracking-wide ml-1">{t.username}</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C9A8B]" size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#D1CCC5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#5E7153] focus:border-[#5E7153] text-[#434A42]"
                  placeholder={t.enterUsername}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#434A42] uppercase tracking-wide ml-1">{t.password}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C9A8B]" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#D1CCC5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#5E7153] focus:border-[#5E7153] text-[#434A42]"
                  placeholder={t.enterPassword}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#2C332B] text-white rounded-xl font-medium hover:bg-[#1A2019] transition-all shadow-lg hover:shadow-xl mt-6 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                isLogin ? t.signIn : t.createAccount
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#6B7068] text-sm">
              {isLogin ? t.dontHaveAccount : t.alreadyHaveAccount}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                }}
                className="text-[#5E7153] font-bold hover:underline"
              >
                {isLogin ? t.signUp : t.signIn}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;