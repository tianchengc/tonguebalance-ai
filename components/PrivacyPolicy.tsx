import React from 'react';
import { X, Lock, Eye, Shield } from 'lucide-react';
import { Language } from '../types';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isOpen, onClose, language }) => {
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
          <h2 className="text-2xl font-serif text-[#2C332B]">Privacy Policy</h2>
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
            <div className="flex items-center gap-3 mb-4">
              <Eye className="text-[#5E7153]" size={24} />
              <h3 className="text-xl font-serif font-bold text-[#2C332B]">1. Data Collection</h3>
            </div>
            <p className="text-[#6B7068] leading-relaxed mb-3">
              We collect the following information when you use TongueBalance AI:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#6B7068] ml-2">
              <li><span className="font-bold">Images:</span> Photos of tongues uploaded for analysis.</li>
              <li><span className="font-bold">Account Data:</span> Email addresses, usernames, and hashed passwords for users who create an account.</li>
              <li><span className="font-bold">Usage Data:</span> How you interact with the AI analysis, timestamps, and device information.</li>
              <li><span className="font-bold">Biometric Data:</span> Your tongue image is considered biometric data and is treated with strict confidentiality.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#2C332B]">2. How We Use Your Data</h3>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-[#434A42] mb-2">Analysis & Wellness Recommendations</p>
                <p className="text-[#6B7068] leading-relaxed ml-4 border-l-2 border-[#5E7153] pl-4">
                  Images are sent to Google's Gemini API for the sole purpose of generating your TCM wellness report and recommendations.
                </p>
              </div>
              <div>
                <p className="font-bold text-[#434A42] mb-2">Service Improvement</p>
                <p className="text-[#6B7068] leading-relaxed ml-4 border-l-2 border-[#5E7153] pl-4">
                  We may use anonymized and aggregated data to improve our internal AI prompts, wellness logic, and user experience.
                </p>
              </div>
              <div>
                <p className="font-bold text-[#434A42] mb-2">Marketing (Opt-In Only)</p>
                <p className="text-[#6B7068] leading-relaxed ml-4 border-l-2 border-[#5E7153] pl-4">
                  If you explicitly opt-in, we may use your email to send updates about TongueBalance Wellness products, new courses, or wellness tips.
                </p>
              </div>
              <div>
                <p className="font-bold text-[#434A42] mb-2">Legal Compliance</p>
                <p className="text-[#6B7068] leading-relaxed ml-4 border-l-2 border-[#5E7153] pl-4">
                  We may disclose information when required by law or to protect our rights and safety.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="text-[#5E7153]" size={24} />
              <h3 className="text-xl font-serif font-bold text-[#2C332B]">3. Data Storage & Security</h3>
            </div>
            <p className="text-[#6B7068] leading-relaxed mb-3">
              We take the security of your data seriously:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#6B7068] ml-2">
              <li>Images are stored securely only if you choose to save them to your "History."</li>
              <li>You may delete your data at any time through your account settings.</li>
              <li>We use industry-standard AES-256 encryption for data in transit and at rest.</li>
              <li>All stored passwords are hashed using secure algorithms (never stored in plain text).</li>
              <li>We conduct regular security audits to ensure data protection compliance.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#2C332B]">4. Third-Party Sharing</h3>
            <p className="text-[#6B7068] leading-relaxed mb-3">
              <span className="font-bold">Third Parties We Share With:</span>
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#6B7068] ml-2 mb-4">
              <li><span className="font-bold">Google Gemini API:</span> Image data is sent to Google for AI analysis. Google's privacy policy applies to this processing. Images are not retained by Google after analysis.</li>
              <li><span className="font-bold">Analytics Providers:</span> We may use anonymized usage data with third-party analytics services.</li>
            </ul>
            <p className="text-[#6B7068] leading-relaxed">
              <span className="font-bold">What We Do NOT Do:</span> We do not sell, trade, or share your personal biometric data with third-party advertisers, data brokers, or marketing firms.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#2C332B]">5. Your Consent</h3>
            <p className="text-[#6B7068] leading-relaxed">
              By uploading an image to TongueBalance AI, you explicitly consent to the processing of your biometric data (tongue image) for wellness analysis. You may withdraw this consent at any time by deleting your account or specific analyses.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#2C332B]">6. Data Retention</h3>
            <p className="text-[#6B7068] leading-relaxed">
              We retain your data only as long as necessary to provide the service:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#6B7068] ml-2 mt-3">
              <li>Account data is retained while your account is active.</li>
              <li>Analysis history is retained as long as you maintain your account.</li>
              <li>Upon account deletion, all personal data is permanently removed within 30 days.</li>
              <li>Anonymized data may be retained for analytics and service improvement.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#2C332B]">7. User Rights</h3>
            <p className="text-[#6B7068] leading-relaxed mb-3">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#6B7068] ml-2">
              <li><span className="font-bold">Right to Access:</span> Request a copy of all personal data we hold about you.</li>
              <li><span className="font-bold">Right to Delete:</span> Request deletion of your data (the "right to be forgotten").</li>
              <li><span className="font-bold">Right to Rectification:</span> Update or correct inaccurate information.</li>
              <li><span className="font-bold">Right to Opt-Out:</span> Unsubscribe from marketing emails at any time.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#2C332B]">8. Cookies & Tracking</h3>
            <p className="text-[#6B7068] leading-relaxed">
              TongueBalance AI uses local browser storage (localStorage) to maintain your session and user preferences. We do not use third-party cookies for tracking purposes. You can clear this data in your browser settings at any time.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#2C332B]">9. Changes to Privacy Policy</h3>
            <p className="text-[#6B7068] leading-relaxed">
              We may update this Privacy Policy periodically. We will notify you of significant changes via email or by posting a notice on our application. Your continued use of the service constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#2C332B]">10. Contact Us</h3>
            <p className="text-[#6B7068] leading-relaxed">
              For questions about this Privacy Policy or to exercise your data rights, please contact:
            </p>
            <div className="bg-[#F7F5F2] p-4 rounded-lg mt-3 space-y-2 text-sm">
              <p><span className="font-bold">Email:</span> <span className="font-mono text-[#5E7153]">privacy@tonguebalance.ai</span></p>
              <p><span className="font-bold">Company:</span> TongueBalance Inc.</p>
            </div>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
            <div className="flex items-start gap-3">
              <Shield className="text-blue-600 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-2">GDPR & Privacy Compliance</p>
                <p className="text-sm text-blue-900 leading-relaxed">
                  TongueBalance AI complies with GDPR, CCPA, and other major privacy regulations. If you believe your privacy rights have been violated, you may file a complaint with your local data protection authority.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
