import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Shield } from 'lucide-react'

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      <div className="text-slate-400 leading-relaxed space-y-3 text-sm">{children}</div>
    </div>
  )
}

export default function Privacy() {
  return (
    <div className="min-h-screen" style={{ background: '#050507' }}>
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pt-32 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            <Shield size={20} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        </div>
        <p className="text-slate-500 text-sm mb-10">Last updated: May 9, 2026</p>

        <div className="rounded-2xl p-8 border" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(99,102,241,0.12)' }}>

          <Section title="1. Introduction">
            <p>
              Incoin Assistant ("we", "our", "us") operates the website <strong className="text-slate-300">incoinassistant.tech</strong>.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform
              and use our productivity tools.
            </p>
            <p>By using Incoin Assistant you agree to the collection and use of information in accordance with this policy.</p>
          </Section>

          <Section title="2. Information We Collect">
            <p><strong className="text-slate-300">Account information:</strong> When you register, we collect your name, email address, and a hashed password. We do not store your password in plain text.</p>
            <p><strong className="text-slate-300">Payment information:</strong> Payments are processed by Cashfree. We do not store your card number, CVV, or banking credentials. We only receive a transaction ID and status from Cashfree.</p>
            <p><strong className="text-slate-300">Usage data:</strong> We collect anonymised data on which tools are used and how often, to improve our product. No personally identifiable information is tied to individual tool usage.</p>
            <p><strong className="text-slate-300">Technical data:</strong> Browser type, device type, IP address, and pages visited may be logged for security and debugging purposes.</p>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul className="list-disc pl-5 space-y-1">
              <li>To create and manage your account</li>
              <li>To process credit purchases and maintain your credit balance</li>
              <li>To send transactional emails (payment receipts, account notices)</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To improve the platform based on usage analytics</li>
              <li>To respond to your support requests</li>
            </ul>
            <p>We do <strong className="text-slate-300">not</strong> send marketing emails without your explicit consent, and we never sell your data to third parties.</p>
          </Section>

          <Section title="4. Data Storage & Security">
            <p>Your data is stored on Supabase infrastructure (hosted on AWS). Supabase is SOC 2 compliant and enforces encryption at rest and in transit (TLS 1.2+).</p>
            <p>We apply the principle of least privilege — only systems that need your data can access it. Access is logged and audited.</p>
          </Section>

          <Section title="5. Cookies">
            <p>We use minimal, essential cookies required for authentication (session tokens). We do not use tracking or advertising cookies. If we add analytics cookies in future, we will update this policy and request consent.</p>
          </Section>

          <Section title="6. Third-Party Services">
            <p>We use the following third-party services, each with their own privacy policy:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-slate-300">Supabase</strong> — database and authentication</li>
              <li><strong className="text-slate-300">Cashfree</strong> — payment processing</li>
            </ul>
          </Section>

          <Section title="7. Data Retention">
            <p>We retain your account data for as long as your account is active. If you delete your account, we delete your personal data within 30 days, except where retention is required by law (e.g., payment records for tax compliance, retained for 7 years as per Indian law).</p>
          </Section>

          <Section title="8. Your Rights">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-slate-300">Access:</strong> Request a copy of the data we hold about you</li>
              <li><strong className="text-slate-300">Correction:</strong> Ask us to correct inaccurate data</li>
              <li><strong className="text-slate-300">Deletion:</strong> Request deletion of your account and personal data</li>
              <li><strong className="text-slate-300">Portability:</strong> Receive your data in a machine-readable format</li>
            </ul>
            <p>To exercise any of these rights, email us at <strong className="text-slate-300">privacy@incoinassistant.tech</strong>.</p>
          </Section>

          <Section title="9. Children's Privacy">
            <p>Incoin Assistant is not directed at children under 13. We do not knowingly collect personal data from anyone under 13. If you believe a child has provided us with personal data, please contact us and we will delete it promptly.</p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>We may update this policy from time to time. We will notify you of significant changes via email or a prominent notice on the site. Continued use of the platform after changes take effect constitutes acceptance of the revised policy.</p>
          </Section>

          <Section title="11. Contact">
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="text-slate-300">Email: privacy@incoinassistant.tech<br />Website: incoinassistant.tech</p>
          </Section>

        </div>
      </div>

      <Footer />
    </div>
  )
}
