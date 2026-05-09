import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FileText } from 'lucide-react'

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      <div className="text-slate-400 leading-relaxed space-y-3 text-sm">{children}</div>
    </div>
  )
}

export default function Terms() {
  return (
    <div className="min-h-screen" style={{ background: '#050507' }}>
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pt-32 pb-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            <FileText size={20} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
        </div>
        <p className="text-slate-500 text-sm mb-10">Last updated: May 9, 2026</p>

        <div className="rounded-2xl p-8 border" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(99,102,241,0.12)' }}>

          <Section title="1. Acceptance of Terms">
            <p>By accessing or using Incoin Assistant ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>
            <p>These Terms apply to all visitors, registered users, and anyone who purchases credits or uses tools on the platform.</p>
          </Section>

          <Section title="2. Description of Service">
            <p>Incoin Assistant is a credit-based productivity platform that provides access to 50+ tools including text utilities, developer tools, productivity apps, and calculators.</p>
            <p>Access to tools is governed by a credit system. Credits are purchased via our payment provider (Cashfree) and deducted per tool use as described on our Pricing page.</p>
          </Section>

          <Section title="3. Account Registration">
            <ul className="list-disc pl-5 space-y-1">
              <li>You must be at least 13 years old to create an account.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You must provide accurate information when registering.</li>
              <li>You are responsible for all activity that occurs under your account.</li>
              <li>Notify us immediately if you suspect unauthorized access to your account.</li>
            </ul>
          </Section>

          <Section title="4. Credits & Payments">
            <p><strong className="text-slate-300">Purchase:</strong> Credits are purchased in bundles (Starter, Popular, Value) via Cashfree. All prices are in Indian Rupees (₹) and inclusive of applicable taxes.</p>
            <p><strong className="text-slate-300">Deduction:</strong> Credits are deducted each time you use a tool. Credit costs per tool are clearly displayed before use.</p>
            <p><strong className="text-slate-300">Expiry:</strong> Credits do not expire as long as your account is active.</p>
            <p><strong className="text-slate-300">Non-transferable:</strong> Credits cannot be transferred between accounts.</p>
          </Section>

          <Section title="5. Acceptable Use">
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use the Service for any unlawful purpose or in violation of any regulations</li>
              <li>Attempt to reverse-engineer, scrape, or systematically extract data from the platform</li>
              <li>Use automated scripts or bots to interact with the tools</li>
              <li>Share your account credentials with others</li>
              <li>Attempt to circumvent the credit system or access tools without deducting credits</li>
              <li>Upload or generate content that is harmful, offensive, or violates third-party rights</li>
            </ul>
          </Section>

          <Section title="6. Intellectual Property">
            <p>All content, code, design, and branding on Incoin Assistant — including but not limited to the tool interfaces, logos, and website design — are the intellectual property of Incoin Assistant and protected by applicable copyright and trademark laws.</p>
            <p>Any content <em>you create</em> using our tools (notes, generated passwords, converted text, etc.) belongs to you. We claim no ownership over user-generated content.</p>
          </Section>

          <Section title="7. Availability & Uptime">
            <p>We strive for 99.9% uptime but do not guarantee uninterrupted availability. We may perform scheduled maintenance, which we will announce where reasonably possible.</p>
            <p>We are not liable for losses caused by downtime, data loss, or service interruptions beyond our reasonable control.</p>
          </Section>

          <Section title="8. Disclaimer of Warranties">
            <p>The Service is provided "as is" and "as available" without warranties of any kind, express or implied. We do not warrant that the Service will be error-free, secure, or meet your specific requirements.</p>
          </Section>

          <Section title="9. Limitation of Liability">
            <p>To the maximum extent permitted by applicable law, Incoin Assistant shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service. Our total liability to you for any claim shall not exceed the amount you paid us in the 30 days prior to the claim.</p>
          </Section>

          <Section title="10. Termination">
            <p>We reserve the right to suspend or terminate your account if you violate these Terms. You may delete your account at any time from the Profile tab in your Dashboard. Unused credits are non-refundable unless required by applicable law (see our Refund Policy).</p>
          </Section>

          <Section title="11. Governing Law">
            <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.</p>
          </Section>

          <Section title="12. Changes to Terms">
            <p>We may update these Terms at any time. We will provide at least 7 days' notice for material changes via email or a notice on the platform. Continued use after the effective date constitutes acceptance.</p>
          </Section>

          <Section title="13. Contact">
            <p>For any questions about these Terms, contact us at <strong className="text-slate-300">legal@incoinassistant.tech</strong>.</p>
          </Section>

        </div>
      </div>

      <Footer />
    </div>
  )
}
