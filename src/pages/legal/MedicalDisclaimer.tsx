import React from "react";
import LegalShell from "./LegalShell";

const MedicalDisclaimer: React.FC = () => (
  <LegalShell
    title="Medical Disclaimer | PeriTrack"
    description="PeriTrack provides educational information about perimenopause and is not a substitute for professional medical advice, diagnosis, or treatment."
    heading="Medical Disclaimer"
  >
    <p>
      The PeriTrack assessment, results, tracking tools, and related content (together, the "Service") are
      provided for <strong>informational and self-reflection purposes only</strong>. They are not a
      substitute for professional medical advice, diagnosis, or treatment.
    </p>

    <h2>Not a diagnosis</h2>
    <p>
      Your assessment score, severity band, and pattern description are educational summaries of the
      answers you gave. They do not diagnose perimenopause or any other medical condition. Only a
      qualified healthcare professional who can examine you and review your history is able to diagnose.
    </p>

    <h2>Always consult a professional</h2>
    <p>
      Always seek the advice of your physician or another qualified healthcare provider with any questions
      you may have about a medical condition, medication, hormones, or lifestyle change. Never disregard
      professional medical advice or delay seeking it because of something you read on PeriTrack.
    </p>

    <h2>Emergencies</h2>
    <p>
      If you are experiencing a medical emergency, call your local emergency number immediately. Do not
      use PeriTrack to seek emergency care.
    </p>

    <h2>No warranty of accuracy</h2>
    <p>
      Perimenopause science evolves. We do our best to present accurate, up-to-date information, but we
      make no warranty that the content is complete, current, or applicable to your individual situation.
    </p>
  </LegalShell>
);

export default MedicalDisclaimer;