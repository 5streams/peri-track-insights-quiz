import React from "react";
import LegalShell from "./LegalShell";

const P = () => <span className="placeholder">[COMPANY LEGAL NAME]</span>;
const E = () => <span className="placeholder">[SUPPORT EMAIL]</span>;

const Terms: React.FC = () => (
  <LegalShell
    title="Terms of Service | PeriTrack"
    description="PeriTrack's Terms of Service, including subscription terms, trial pricing, cancellation, and refunds."
    heading="Terms of Service"
  >
    <p><em>Last updated: {new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</em></p>
    <p>
      These Terms of Service ("Terms") govern your use of the PeriTrack website and services (the "Service"),
      provided by <P /> ("we", "us"). By using the Service you agree to these Terms.
    </p>

    <h2>1. The Service</h2>
    <p>
      PeriTrack offers a perimenopause self-assessment and, on subscription, personalized symptom
      tracking and educational content. The Service is informational and is <strong>not medical advice,
      diagnosis, or treatment</strong>. See our <a href="/medical-disclaimer">Medical Disclaimer</a>.
    </p>

    <h2>2. Eligibility</h2>
    <p>You must be 18 or older to use the Service.</p>

    <h2>3. Accounts</h2>
    <p>
      You are responsible for the accuracy of the information you provide and for keeping your account
      credentials secure.
    </p>

    <h2>4. Subscription terms</h2>
    <p>This section explains how paid access to PeriTrack works:</p>
    <ul>
      <li>
        <strong>Trial pricing options.</strong> At checkout you may select one of the available trial
        prices. The price you select is billed once to unlock a 7-day trial of the full Service.
      </li>
      <li>
        <strong>7-day trial.</strong> Your trial lasts 7 days from the time your trial payment is charged.
      </li>
      <li>
        <strong>Ongoing subscription.</strong> Unless you cancel before the trial ends, your subscription
        will automatically renew at <strong>$29.99 per month</strong>, charged to the payment method on
        file, and will continue to renew monthly at that price until you cancel.
      </li>
      <li>
        <strong>One-tap cancellation.</strong> You may cancel at any time — including during the trial —
        with one tap through the customer billing portal linked from your account and from the emails we
        send you. If you cancel during the trial, you will not be charged the monthly fee.
      </li>
      <li>
        <strong>Trial reminder.</strong> We will email you approximately <strong>2 days before your trial
        ends</strong> to remind you that your subscription is about to renew, so you can cancel if you
        choose.
      </li>
      <li>
        <strong>Refunds.</strong> If you believe you were charged in error or would like to request a
        refund, contact <E />. Refunds are handled case by case and in accordance with applicable law.
      </li>
    </ul>

    <h2>5. Acceptable use</h2>
    <p>
      Do not misuse the Service: no attempts to breach security, scrape data at scale, resell access, or
      use the Service to harm others.
    </p>

    <h2>6. Intellectual property</h2>
    <p>
      All content on the Service (assessments, copy, design, code) is owned by us or our licensors and is
      protected by intellectual property laws. You receive a personal, non-transferable, non-exclusive
      license to use the Service.
    </p>

    <h2>7. Disclaimers</h2>
    <p>
      The Service is provided "as is" and "as available", without warranties of any kind. We do not
      guarantee any particular health outcome. Always consult a qualified healthcare professional
      regarding medical decisions.
    </p>

    <h2>8. Limitation of liability</h2>
    <p>
      To the maximum extent permitted by law, our aggregate liability for any claim arising out of or
      relating to the Service is limited to the amount you paid us in the 12 months preceding the claim.
    </p>

    <h2>9. Changes</h2>
    <p>
      We may update these Terms from time to time. Material changes will be reflected in the "Last updated"
      date above and, where appropriate, by notice through the Service.
    </p>

    <h2>10. Contact</h2>
    <p>Questions about these Terms? Email <E />.</p>
  </LegalShell>
);

export default Terms;