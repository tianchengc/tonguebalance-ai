import React from 'react';
import { X } from 'lucide-react';
import { Language } from '../types';

interface TermsOfServiceProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#2C332B]/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-[#FCFAF8] rounded-2xl shadow-2xl w-full max-w-3xl my-8 border border-[#E5E0D8] overflow-hidden">
        <div className="sticky top-0 bg-[#FCFAF8] border-b border-[#E5E0D8] p-6 flex items-center justify-between">
          <h2 className="text-2xl font-serif text-[#2C332B]">Terms of Service</h2>
          <button 
            onClick={onClose}
            className="text-[#8C9A8B] hover:text-[#434A42] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 space-y-8 text-[#434A42]">
          <div className="text-xs text-[#8C9A8B] font-medium">
            Last Updated: January 18, 2026
          </div>

          <section className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#2C332B]">1. Nature of Service</h3>
            <p className="text-[#6B7068] leading-relaxed">
              TongueBalance AI is an educational wellness tool that utilizes Artificial Intelligence to provide insights based on Traditional Chinese Medicine (TCM) principles. It is <span className="font-bold">not a medical device</span> and does not provide medical diagnoses, treatments, or cures.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#2C332B]">2. No Medical Advice</h3>
            <p className="text-[#6B7068] leading-relaxed">
              The information provided is for informational and educational purposes only. You should not use this information to diagnose or treat a health problem. Always seek the advice of a physician or other qualified health provider with any questions you may have regarding a medical condition. If you experience a medical emergency, please contact your local emergency services.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#2C332B]">3. User Responsibilities</h3>
            <ul className="list-disc list-inside space-y-2 text-[#6B7068]">
              <li>You agree to upload only your own images or images for which you have explicit consent from the subject.</li>
              <li>You agree not to use the service for any illegal purposes or to violate the privacy rights of others.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You agree not to reverse-engineer, decompile, or attempt to extract the AI models or underlying technology.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#2C332B]">4. Monetization & Purchases</h3>
            <p className="text-[#6B7068] leading-relaxed mb-3">
              Purchases of online courses (e.g., Ba Duan Jin Mastery, Yin Nourishing Kitchen) or physical goods (e.g., Wellness Tea Blends) are subject to the refund policies of ChaDynasty Wellness. Access to "Premium" features requires a valid user account and may be subject to recurring charges.
            </p>
            <p className="text-[#6B7068] leading-relaxed">
              All prices are subject to change with notice. Refunds are available within 30 days of purchase if the digital product has not been substantially used.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#2C332B]">5. Limitation of Liability</h3>
            <p className="text-[#6B7068] leading-relaxed mb-3">
              To the maximum extent permitted by law, TongueBalance AI and its parent companies (TwoHundredK Technologies / ChaDynasty Wellness) shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use (or inability to use) the service.
            </p>
            <p className="text-[#6B7068] leading-relaxed">
              This includes but is not limited to: data loss, business interruption, loss of profits, or health-related issues arising from reliance on the AI analysis.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#2C332B]">6. Disclaimer of Warranties</h3>
            <p className="text-[#6B7068] leading-relaxed">
              The service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, express or implied, regarding the accuracy, completeness, or reliability of the AI analysis. TCM assessment results should be considered as suggestions only.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#2C332B]">7. Changes to Terms</h3>
            <p className="text-[#6B7068] leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the application. Your continued use of the service constitutes acceptance of the updated terms.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#2C332B]">8. Contact</h3>
            <p className="text-[#6B7068] leading-relaxed">
              For questions about these Terms of Service, please contact us at <span className="font-mono text-[#5E7153]">support@chadynasty.wellness</span>
            </p>
          </section>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-8">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-2">Important Notice</p>
            <p className="text-sm text-amber-900 leading-relaxed">
              By using TongueBalance AI, you acknowledge that you have read these Terms of Service, understand them, and agree to be bound by them. If you do not agree to these terms, you should not use this service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
