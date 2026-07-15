import React from "react";
import LegalShell from "./LegalShell";

const P = () => <span className="placeholder">[COMPANY LEGAL NAME]</span>;
const E = () => <span className="placeholder">[SUPPORT EMAIL]</span>;
const A = () => <span className="placeholder">[BUSINESS ADDRESS]</span>;

const Privacy: React.FC = () => (
  <LegalShell
    title="Privacy Policy | PeriTrack"
    description="How PeriTrack collects, uses, and protects your quiz answers, email, and payment information."
    heading="Privacy Policy"
  >
    <p><em>Last updated: {new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</em></p>
    <p>
      This Privacy Policy explains how <P /> ("PeriTrack", "we", "us") collects, uses, and protects your
      information when you use our website and the perimenopause assessment (the "Service").
    </p>

    <h2>1. Information we collect</h2>
    <ul>
      <li><strong>Quiz answers:</strong> the responses you give in the perimenopause assessment (symptoms, cycle status, age range, goals).</li>
      <li><strong>Contact information:</strong> your name and email address, when you choose to unlock your full results.</li>
      <li><strong>Payment information:</strong> processed by Stripe, our payment processor. We never see or store full card numbers.</li>
      <li><strong>Technical information:</strong> IP-derived location (approximate), browser type, device type, referring URL, and pages viewed.</li>
      <li><strong>Marketing attribution:</strong> UTM parameters and Google Ads click IDs (gclid) when you arrive from an ad.</li>
    </ul>

    <h2>2. How we use your information</h2>
    <ul>
      <li>Generate and deliver your personalized assessment.</li>
      <li>Send the results and any account or subscription emails you have opted into.</li>
      <li>Process payments and manage subscriptions and refunds.</li>
      <li>Measure the performance of our ads and improve the Service.</li>
      <li>Comply with legal obligations and enforce our Terms.</li>
    </ul>

    <h2>3. Where your data is stored</h2>
    <p>
      Quiz answers, contact details, and subscription metadata are stored in our managed backend
      (Supabase infrastructure hosted in the United States). Payment records are stored by Stripe. Access
      is restricted to authorized personnel.
    </p>

    <h2>4. Sharing</h2>
    <p>
      We do <strong>not sell your personal data</strong>. We share limited information only with service
      providers that help us run the Service: Stripe (payments), our email delivery provider, and our
      analytics providers (see below). Each is bound by contract to protect your data.
    </p>

    <h2>5. Cookies and analytics</h2>
    <p>
      We use first-party cookies and local storage to remember your quiz progress and to keep you signed in.
      We use Google Analytics 4 and Google Ads conversion tracking to measure site performance and ad
      effectiveness. You can opt out of Google Analytics using Google's browser add-on.
    </p>

    <h2>6. Your rights</h2>
    <p>
      You may request access to, correction of, or deletion of your personal data at any time by emailing
      us at <E />. Depending on your jurisdiction (including under the GDPR and CCPA), you may also have
      the right to object to processing, restrict processing, or receive your data in a portable format.
    </p>

    <h2>7. Data retention</h2>
    <p>
      We keep your quiz answers and contact information for as long as your account is active, and for a
      reasonable period afterward for legal, tax, and dispute-resolution purposes. You can request earlier
      deletion at any time.
    </p>

    <h2>8. Children</h2>
    <p>The Service is intended for adults. We do not knowingly collect data from anyone under 18.</p>

    <h2>9. Changes</h2>
    <p>
      We may update this Privacy Policy from time to time. When we make material changes we will update the
      "Last updated" date at the top of this page.
    </p>

    <h2>10. Contact</h2>
    <p>
      Questions or requests? Contact us at <E />.<br />
      Mailing address: <A />.
    </p>
  </LegalShell>
);

export default Privacy;