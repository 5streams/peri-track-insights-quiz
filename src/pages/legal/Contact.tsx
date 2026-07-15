import React from "react";
import LegalShell from "./LegalShell";

const E = () => <span className="placeholder">[SUPPORT EMAIL]</span>;

const Contact: React.FC = () => (
  <LegalShell
    title="Contact PeriTrack Support"
    description="Get in touch with PeriTrack. Support email, response times, and how to cancel your subscription."
    heading="Contact & Support"
  >
    <h2>Email support</h2>
    <p>
      Reach us at <E />. We respond to every message.
    </p>

    <h2>Response time</h2>
    <p>
      We aim to respond within <strong>1 business day</strong>, Monday through Friday. Billing and
      cancellation requests are prioritized.
    </p>

    <h2>Manage or cancel your subscription</h2>
    <p>
      You can update your payment method or cancel your subscription at any time through the customer
      billing portal. Visit <a href="/account">your account</a> to open the billing portal, or email us at
      <E /> and we will send you a direct link.
    </p>

    <h2>Refund requests</h2>
    <p>
      Email <E /> with the address you used at checkout. Refunds are handled case by case and in
      accordance with our <a href="/terms">Terms of Service</a>.
    </p>

    <h2>Medical questions</h2>
    <p>
      We can't provide medical advice. Please see our <a href="/medical-disclaimer">Medical Disclaimer</a>
      and consult a qualified healthcare professional.
    </p>
  </LegalShell>
);

export default Contact;