import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import LoadingSpinner from "@/components/results/LoadingSpinner";
import { calculateHormoneScores } from "@/utils/scoreCalculation";

// Import our components for the results page
import ResultsHeader from "@/components/results/ResultsHeader";
import PersonalizedAssessment from "@/components/results/PersonalizedAssessment";
import TrustFooter from "@/components/TrustFooter";

// Add global styles for remaining components
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Raleway:wght@300;400;500;600;700&display=swap');
  
  :root {
    --primary: rgb(93 65 84 / var(--tw-text-opacity, 1));
    --warm-gray: #6B7280;
    --warm-gray-50: #F9FAFB;
  }
  /* Base styles */
  body {
    font-family: 'Raleway', sans-serif;
    color: #333;
    line-height: 1.6;
  }
  
  /* Color definitions */
  .text-primary { color: rgb(93 65 84 / var(--tw-text-opacity, 1)); }
  .text-warm-gray { color: #6B7280; }
  .bg-warm-gray-50 { background-color: #F9FAFB; }
  .from-\\[#f8f5ff\\] { --tw-gradient-from: #f8f5ff; --tw-gradient-to: rgba(248, 245, 255, 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }

  /* Typography */
  .font-headline {
    font-family: 'Playfair Display', serif;
  }
  
  .font-sans {
    font-family: 'Raleway', sans-serif;
  }
  
  .text-body-regular {
    font-size: 1rem;
    line-height: 1.5;
  }
  
  .text-body-large {
    font-size: 1.125rem;
    line-height: 1.5;
  }
  
  /* Container */
  .container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  /* Headings */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.75rem; }
  h4 { font-size: 1.5rem; }

  /* Buttons */
  .btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-primary {
    background-color: #8B5CF6;
    color: white;
    border: none;
  }

  .btn-primary:hover {
    background-color: #7C3AED;
    transform: translateY(-2px);
  }

  /* Sections */
  section {
    padding: 4rem 0;
  }

  /* Utility classes */
  .text-center { text-align: center; }
  .text-purple-600 { color: #8B5CF6; }
  .bg-gray-50 { background-color: #F9FAFB; }
  .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
  .mb-8 { margin-bottom: 2rem; }
  .max-w-4xl { max-width: 56rem; }
  .mx-auto { margin-left: auto; margin-right: auto; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
  .rounded-xl { border-radius: 0.75rem; }
  .border-2 { border-width: 2px; }
  .border-white { border-color: white; }
  .inline-block { display: inline-block; }
  .leading-relaxed { line-height: 1.625; }
  .leading-tight { line-height: 1.25; }
  .font-medium { font-weight: 500; }
  .font-semibold { font-weight: 600; }
  .font-bold { font-weight: 700; }
  .text-sm { font-size: 0.875rem; }
  .text-lg { font-size: 1.125rem; }
  .text-3xl { font-size: 1.875rem; }
  .text-4xl { font-size: 2.25rem; }
  .text-5xl { font-size: 3rem; }
  
  /* Grid and Flex utilities */
  .grid { display: grid; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .gap-6 { gap: 1.5rem; }
  .min-h-\\[60vh\\] { min-height: 60vh; }
  .bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); }
  .to-white { --tw-gradient-to: #ffffff; }
  .bg-white { background-color: #ffffff; }
  .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
  .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
  .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
  .rounded-full { border-radius: 9999px; }
  .mb-3 { margin-bottom: 0.75rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-5 { margin-bottom: 1.25rem; }
  .p-3 { padding: 0.75rem; }
  .-space-x-2 > :not([hidden]) ~ :not([hidden]) { --tw-space-x-reverse: 0; margin-right: calc(-0.5rem * var(--tw-space-x-reverse)); margin-left: calc(-0.5rem * calc(1 - var(--tw-space-x-reverse))); }
  .mr-3 { margin-right: 0.75rem; }
  .w-8 { width: 2rem; }
  .h-8 { height: 2rem; }
  .border-2 { border-width: 2px; }
  .border-white { border-color: white; }
  
  /* Modal styles */
  .fixed { position: fixed; }
  .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
  .bg-black { background-color: #000; }
  .bg-opacity-50 { --tw-bg-opacity: 0.5; }
  .z-50 { z-index: 50; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .p-4 { padding: 1rem; }
  .relative { position: relative; }
  .bg-white { background-color: #fff; }
  .rounded-lg { border-radius: 0.5rem; }
  .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
  .max-w-md { max-width: 28rem; }
  .w-full { width: 100%; }
  .p-6 { padding: 1.5rem; }
  .text-2xl { font-size: 1.5rem; }
  .font-bold { font-weight: 700; }
  .mb-4 { margin-bottom: 1rem; }
  .text-gray-700 { color: #4B5563; }
  .mb-6 { margin-bottom: 1.5rem; }
  .space-y-4 > :not([hidden]) ~ :not([hidden]) { --tw-space-y-reverse: 0; margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse))); margin-bottom: calc(1rem * var(--tw-space-y-reverse)); }
  .w-full { width: 100%; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .border { border-width: 1px; }
  .border-gray-300 { --tw-border-opacity: 1; border-color: rgb(209 213 219 / var(--tw-border-opacity)); }
  .rounded { border-radius: 0.25rem; }
  .mt-4 { margin-top: 1rem; }
  .text-center { text-align: center; }
  .text-sm { font-size: 0.875rem; }
  .text-gray-500 { color: #6B7280; }
  .mt-2 { margin-top: 0.5rem; }
  .text-indigo-600 { color: #4F46E5; }
  .hover\\:text-indigo-500:hover { color: #6366F1; }
  .focus\\:outline-none:focus { outline: 2px solid transparent; outline-offset: 2px; }
  .focus\\:ring-2:focus { --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); }
  .focus\\:ring-indigo-500:focus { --tw-ring-opacity: 1; --tw-ring-color: rgb(99 102 241 / var(--tw-ring-opacity)); }
  .focus\\:ring-offset-2:focus { --tw-ring-offset-width: 2px; }
  .sm\\:flex { display: flex; }
  .sm\\:items-start { align-items: flex-start; }
  .sm\\:justify-between { justify-content: space-between; }
  .sm\\:space-y-0 > :not([hidden]) ~ :not([hidden]) { --tw-space-y-reverse: 0; margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse))); margin-bottom: calc(0px * var(--tw-space-y-reverse)); }
  .sm\\:space-x-4 > :not([hidden]) ~ :not([hidden]) { --tw-space-x-reverse: 0; margin-right: calc(1rem * var(--tw-space-x-reverse)); margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse))); }
  .sm\\:text-left { text-align: left; }
  .sm\\:text-sm { font-size: 0.875rem; }
  
  /* Responsive utilities */
  @media (min-width: 768px) {
    .md\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
  }
  
  @media (min-width: 1024px) {
    .lg\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
    .lg\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .lg\\:text-4xl { font-size: 2.25rem; }
  }
  
  @media (min-width: 1280px) {
    .xl\\:text-5xl { font-size: 3rem; }
  }
`;

interface QuizResults {
  score: number;
  phase: string;
  primarySymptoms: string[];
  recommendedActions: string[];
}

const Results = () => {
  // State management
  const [results, setResults] = useState<QuizResults | null>(null);
  const [userInfo, setUserInfo] = useState({ firstName: "", email: "" });
  const [hormoneScores, setHormoneScores] = useState({
    overall: 0,
    estrogen: 0,
    progesterone: 0,
    testosterone: 0,
    primaryHormone: "estrogen",
    primarySymptoms: [] as string[]
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  
  // Helper functions
  const getScoreCategory = React.useCallback((score: number) => {
    if (score <= 40) return "mild";
    if (score <= 70) return "moderate";
    return "severe";
  }, []);

  // Data loading effect
  useEffect(() => {
    const storedResults = localStorage.getItem("quizResults");
    const storedUserInfo = localStorage.getItem("userInfo");
    
    if (storedResults) {
      const parsedResults = JSON.parse(storedResults);
      setResults(parsedResults);
      const scores = calculateHormoneScores(parsedResults);
      setHormoneScores(scores);
    } else {
      navigate("/quiz");
    }
    
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }

    // Remove the delayed reveal and make everything visible immediately
    setIsLoaded(true);
  }, [navigate]);

  // Inject global styles
  useEffect(() => {
    // Create a style element
    const styleElement = document.createElement('style');
    styleElement.id = 'tryperitrack-styles';
    styleElement.textContent = globalStyles;
    
    // Add the style element to the head
    document.head.appendChild(styleElement);
    
    // Clean up the style element when the component unmounts
    return () => {
      const existingStyle = document.getElementById('tryperitrack-styles');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  // Derived state
  const scoreCategory = React.useMemo(
    () => results ? getScoreCategory(hormoneScores.overall) : "mild",
    [results, hormoneScores.overall, getScoreCategory]
  );

  const capitalizedFirstName = React.useMemo(
    () => userInfo.firstName 
      ? userInfo.firstName.charAt(0).toUpperCase() + userInfo.firstName.slice(1)
      : "",
    [userInfo.firstName]
  );

  // Show loading state
  if (!results) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Results Section - More compact with reduced spacing */}
      <div className="w-full max-w-4xl mx-auto px-2 md:px-4 lg:px-6 pt-4">
        <div className="results-container all-visible">
          {/* Results Header with Score and User Name */}
          <div className="mb-4">
            <ResultsHeader 
              score={hormoneScores.overall} 
              firstName={capitalizedFirstName} 
              scoreCategory={scoreCategory}
              onStartTrial={() => {}}
            />
          </div>
          
          {/* Personalized Assessment */}
          <div className="mb-4">
            <PersonalizedAssessment
              scoreCategory={scoreCategory}
              firstName={capitalizedFirstName}
              primarySymptoms={hormoneScores.primarySymptoms}
            />
          </div>

          {/* Complete Salespage Content */}
          <div className="salespage-content">
            {/* Critical Assessment Section */}
            <section className="critical-assessment" style={{background: '#f8f6ff', padding: '40px 20px', margin: '40px 0', borderRadius: '16px'}}>
              <div className="container" style={{maxWidth: '800px', margin: '0 auto'}}>
                <h2 style={{color: '#6B4E7A', fontSize: '42px', textAlign: 'center', marginBottom: '20px'}}>
                  Your Assessment Reveals Something Critical...
                </h2>
                <p style={{fontSize: '26px', textAlign: 'center', color: '#5D4A37', marginBottom: '30px'}}>
                  Your moderate perimenopause score puts you in a dangerous zone.
                </p>
                <p style={{fontSize: '22px', textAlign: 'center', color: '#5D4A37', marginBottom: '20px'}}>
                  You're not "fine" - you're at the tipping point where symptoms either stabilize with the right intervention... or spiral into severe territory.
                </p>
                <p style={{fontSize: '22px', textAlign: 'center', color: '#5D4A37'}}>
                  Those vasomotor symptoms, sleep disturbances, and mood fluctuations you're experiencing right now? They're warning signals that your hormones are collapsing.
                </p>
              </div>
            </section>

            {/* 72-Hour Window Section */}
            <div className="intervention-window" style={{background: 'white', padding: '30px', borderRadius: '12px', margin: '20px 0', border: '2px solid #D4AF37'}}>
              <h3 style={{color: '#6B4E7A', fontSize: '32px', marginBottom: '15px'}}>
                ❗ The 72-Hour Window That Saved My Marriage
              </h3>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                Here's what most doctors won't tell you: Women with moderate perimenopause scores have a critical 72-hour intervention window.
              </p>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                Act now, and you can prevent your symptoms from escalating.
              </p>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                Wait, and you risk months or years of severe suffering.
              </p>
              <p style={{lineHeight: '1.6', fontWeight: 'bold', fontSize: '22px'}}>
                I know because I lived through this exact scenario...
              </p>
            </div>

            {/* Personal Story Section */}
            <div className="story-section" style={{background: 'white', padding: '30px', borderRadius: '12px', margin: '20px 0'}}>
              <h3 style={{color: '#6B4E7A', fontSize: '32px', marginBottom: '15px'}}>
                Dear Beautiful friend, You're Not Yourself—And It's Breaking Your Heart 😢
              </h3>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                Four years ago, I was drowning in perimenopause hell. My husband and I were that couple everyone envied—26 years of marriage, three incredible kids, and a love story so passionate that friends begged us to write a book.
              </p>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                But perimenopause was destroying everything.
              </p>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                At 2:47 AM on a Tuesday, my husband found me on the bathroom floor, drenched in sweat and crying. I'd been waking up like this for 14 nights straight. My perimenopause assessment score? 66/100 - almost identical to yours.
              </p>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                <strong>I looked at him with tears streaming down my face and whispered, "I'm losing myself... and I'm losing you."</strong>
              </p>
            </div>

            {/* Love Story Dying Section */}
            <div className="love-story" style={{background: '#fff5f5', padding: '30px', borderRadius: '12px', margin: '20px 0'}}>
              <h3 style={{color: '#6B4E7A', fontSize: '32px', marginBottom: '15px'}}>
                My Love Story Was Dying (And We Both Knew It) 💔
              </h3>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontWeight: 'bold', fontSize: '22px'}}>
                What perimenopause stole from me:
              </p>
              <ul style={{lineHeight: '1.6', marginBottom: '15px', paddingLeft: '20px', fontSize: '22px'}}>
                <li>I had zero energy - couldn't even play with my kids</li>
                <li>My libido disappeared - we became roommates, not lovers</li>
                <li>Mood swings so severe I'd snap at everyone, then cry for hours</li>
                <li>Night sweats meant neither of us slept</li>
                <li>Brain fog so bad I feared early dementia</li>
                <li>Our once-electric marriage felt cold and empty</li>
              </ul>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                We tried everything. Moved to Mexico hoping a fresh start would help. Hit the gym religiously for 8 months. Kept up weekly date nights. Even tried a couples' resort as my last desperate attempt to save our marriage.
              </p>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                Nothing worked. I watched myself disappear and felt helpless to stop it.
              </p>
              <p style={{lineHeight: '1.6', fontWeight: 'bold', fontSize: '22px'}}>
                I was terrified our 26-year love story was ending because of me.
              </p>
            </div>

            {/* Couple Discovery Section */}
            <div className="discovery" style={{background: '#f0fff4', padding: '30px', borderRadius: '12px', margin: '20px 0'}}>
              <h3 style={{color: '#6B4E7A', fontSize: '32px', marginBottom: '15px'}}>
                The Couple That Changed Everything ⚡️
              </h3>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                At that resort (our final attempt to reconnect), we met an incredible couple. They were 47 - older than us - but radiant, muscular, vibrant, and SO in love. They looked 10 years younger and had this magnetic energy.
              </p>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                My husband had to ask their secret.
              </p>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                The husband leaned in and said, "You've got to hack your hormones the right way. Find the right expert."
              </p>
              <p style={{lineHeight: '1.6', fontWeight: 'bold', fontSize: '22px'}}>
                Those 10 words saved my marriage.
              </p>
            </div>

            {/* Discovery Section */}
            <div className="hormone-discovery" style={{background: 'white', padding: '30px', borderRadius: '12px', margin: '20px 0'}}>
              <h3 style={{color: '#6B4E7A', fontSize: '32px', marginBottom: '15px'}}>
                The Discovery That Brought Me Back to Life 🗝️
              </h3>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                We found a hormone optimization expert in Mexico - not some random doctor, but a genius who understood how to rebuild hormones properly.
              </p>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                My bloodwork revealed the devastating truth: My hormones were nearly gone. Testosterone, progesterone, estrogen - all critically low. No wonder I felt like I was dying.
              </p>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                The expert said something that changed everything:
              </p>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontStyle: 'italic', fontWeight: 'bold', fontSize: '24px'}}>
                "No diet or workout can fix missing hormones. And the wrong approach makes it worse. But with the right protocol, we can have you feeling like yourself again in 3 weeks."
              </p>
              <p style={{lineHeight: '1.6', fontSize: '22px'}}>
                He gave me the Hormonal Optimization Protocol - targeted nutrition, gentle movement, and strategic hormone support.
              </p>
            </div>

            {/* 3 Weeks Later Section */}
            <div className="transformation" style={{background: 'linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%)', padding: '30px', borderRadius: '12px', margin: '20px 0'}}>
              <h3 style={{color: '#6B4E7A', fontSize: '32px', marginBottom: '15px'}}>
                3 Weeks Later: I Came Roaring Back to Life! 🎉
              </h3>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                <strong>Week 1:</strong> I slept through the night for the first time in months
              </p>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                <strong>Week 2:</strong> My energy returned, mood stabilized, hair stopped falling out
              </p>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                <strong>Week 3:</strong> My libido EXPLODED - we were sneaking away like teenagers!
              </p>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                I'm not exaggerating - we were making love at my parents' house during vacation like we were 25 again!
              </p>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                After 26 years of marriage, I became more passionate, more confident, more in love than ever. I transformed from a shadow of myself into this vibrant, energetic woman who could light up any room.
              </p>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                My kids said, "Mom's back!" My friends asked what I was doing differently.
              </p>
              <p style={{lineHeight: '1.6', fontWeight: 'bold', fontSize: '22px'}}>
                The secret? I hacked my hormones the right way.
              </p>
            </div>

            {/* Best Life Section */}
            <div className="best-life" style={{background: '#f8f6ff', padding: '30px', borderRadius: '12px', margin: '20px 0'}}>
              <h3 style={{color: '#6B4E7A', fontSize: '32px', marginBottom: '15px'}}>
                Now I'm Living My Best Life (At 47!) 🌟
              </h3>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontWeight: 'bold', fontSize: '22px'}}>
                Today, four years later:
              </p>
              <ul style={{lineHeight: '1.6', marginBottom: '15px', paddingLeft: '20px', fontSize: '22px'}}>
                <li>I'm more energetic than women half my age</li>
                <li>Our sex life is incredible - better than our honeymoon phase</li>
                <li>I'm confident, radiant, and glowing</li>
                <li>We travel the world together (just got back from Bali!)</li>
                <li>I help thousands of women through my perimenopause community</li>
                <li>Our marriage is our friends' relationship goals</li>
              </ul>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                Perimenopause didn't ruin my love story - it made it BETTER.
              </p>
              <p style={{lineHeight: '1.6', fontWeight: 'bold', fontSize: '22px'}}>
                But only because I found the right protocol at the right time.
              </p>
            </div>

            {/* Main Offer Section with Book Cover */}
            <div className="main-offer" style={{background: 'linear-gradient(135deg, #6B4E7A 0%, #8B7A94 100%)', color: 'white', padding: '30px', borderRadius: '12px', margin: '20px 0'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap'}}>
                {/* Left side - Text content */}
                <div style={{flex: '1', minWidth: '300px', textAlign: 'center'}}>
                  <h3 style={{color: '#D4AF37', fontSize: '36px', marginBottom: '15px'}}>
                    🎯 The EXACT Protocol That Saved My Marriage - Just $7
                  </h3>
                  <p style={{fontSize: '24px', marginBottom: '20px'}}>
                    What if I told you the same 3-week system that brought me back from the brink is available right now for just $7?
                  </p>
                  <p style={{fontSize: '22px', marginBottom: '20px'}}>
                    Not the $500 we paid that hormone expert. Not even $97.
                  </p>
                  <p style={{fontSize: '22px', marginBottom: '20px'}}>
                    Just $7 - because when you're suffering like I was, money shouldn't be a barrier to getting your life back.
                  </p>
                  
                  <div style={{background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '8px', margin: '20px 0'}}>
                    <div style={{fontSize: '18px', opacity: '0.8'}}>Was $97</div>
                    <div style={{fontSize: '52px', fontWeight: 'bold', color: '#D4AF37'}}>$7</div>
                    <div style={{fontSize: '18px'}}>24-hour special price</div>
                  </div>
                  
                  <button style={{background: 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)', color: '#2C3E50', border: 'none', padding: '20px 40px', fontSize: '24px', fontWeight: 'bold', borderRadius: '50px', cursor: 'pointer', margin: '20px 0'}}>
                    🎁 Get My Protocol for $7 - Download Instantly!
                  </button>
                  
                  <p style={{fontSize: '18px', opacity: '0.9'}}>
                    ✅ Instant PDF download ✅ 30-day guarantee ✅ Start tonight
                  </p>
                </div>
                
                {/* Right side - Book cover */}
                <div style={{flex: '0 0 250px', textAlign: 'center'}}>
                  <img 
                    src="/lovable-uploads/1f0d2f31-386a-4fb1-b5d8-4cc4a86a31a4.png" 
                    alt="MenoMastery - Your Essential Guide to Thriving Through Perimenopause by Melanie Dagenais"
                    style={{
                      width: '100%',
                      maxWidth: '250px',
                      height: 'auto',
                      borderRadius: '8px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* What You Get Section */}
            <div className="what-you-get" style={{background: 'white', padding: '30px', borderRadius: '12px', margin: '20px 0', border: '2px solid #D4AF37'}}>
              <h3 style={{color: '#6B4E7A', fontSize: '32px', marginBottom: '15px'}}>
                ⚡ What You Get Instantly (My Complete Transformation Guide):
              </h3>
              <ul style={{lineHeight: '1.8', paddingLeft: '20px', fontSize: '22px'}}>
                <li>📱 INSTANT DOWNLOAD - Start your transformation tonight</li>
                <li>🔥 The 60-Second Hot Flash Killer - My emergency technique (works instantly)</li>
                <li>😴 Sleep Rescue Protocol - How I went from 14 nights of hell to 8+ hours of bliss</li>
                <li>🧠 Mood Stability Formula - End the emotional rollercoaster forever</li>
                <li>💕 Libido Revival Secrets - How I reignited our passion (and how you can too!)</li>
                <li>📋 72-Hour Quick Start Guide - Feel better THIS WEEK</li>
                <li>🍽️ Hormone-Rebuilding Meal Plan - The exact foods that restored my energy</li>
                <li>💊 The $3 Supplement Stack - More powerful than $200+ prescriptions</li>
                <li>🩺 Doctor Advocacy Scripts - Get the treatment you deserve</li>
                <li>🔥 Relationship Rescue Guide - Rebuild intimacy during perimenopause</li>
              </ul>
            </div>

            {/* Real Results Section */}
            <div className="real-results" style={{background: '#f0fff4', padding: '30px', borderRadius: '12px', margin: '20px 0'}}>
              <h3 style={{color: '#6B4E7A', fontSize: '32px', marginBottom: '15px'}}>
                🔥 Real Results From Women Just Like You:
              </h3>
              <div style={{marginBottom: '20px'}}>
                <p style={{fontWeight: 'bold', color: '#D4AF37', fontSize: '22px'}}>💕 "My husband said 'I have my wife back' after just 2 weeks!"</p>
                <p style={{fontStyle: 'italic', fontSize: '20px'}}>"We hadn't been intimate in 6 months. Now we can't keep our hands off each other!" - Jennifer, Score: 62</p>
              </div>
              <div style={{marginBottom: '20px'}}>
                <p style={{fontWeight: 'bold', color: '#D4AF37', fontSize: '22px'}}>💕 "From divorce papers to second honeymoon in 3 weeks"</p>
                <p style={{fontStyle: 'italic', fontSize: '20px'}}>"I was ready to leave my marriage. This protocol saved everything." - Sarah, Score: 67</p>
              </div>
              <div>
                <p style={{fontWeight: 'bold', color: '#D4AF37', fontSize: '22px'}}>💕 "My energy is through the roof - my kids can't keep up!"</p>
                <p style={{fontStyle: 'italic', fontSize: '20px'}}>"I went from exhausted mom to energizer bunny. My family is amazed." - Michelle, Score: 69</p>
              </div>
            </div>

            {/* Brutal Truth Section */}
            <div className="brutal-truth" style={{background: '#fff5f5', padding: '30px', borderRadius: '12px', margin: '20px 0'}}>
              <h3 style={{color: '#6B4E7A', fontSize: '32px', marginBottom: '15px'}}>
                ⏰ The Brutal Truth About Your 72-Hour Window
              </h3>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                {capitalizedFirstName}, here's what happens if you wait:
              </p>
              <ul style={{lineHeight: '1.6', marginBottom: '20px', paddingLeft: '20px', color: '#d32f2f', fontSize: '22px'}}>
                <li><strong>Tonight:</strong> Another sleepless, sweaty night while your relationship suffers</li>
                <li><strong>This week:</strong> Continued mood swings pushing your partner away</li>
                <li><strong>This month:</strong> Symptoms escalating toward severe territory</li>
                <li><strong>This year:</strong> Watching your marriage become another perimenopause casualty</li>
              </ul>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontWeight: 'bold', fontSize: '22px'}}>
                vs. What happens if you act RIGHT NOW:
              </p>
              <ul style={{lineHeight: '1.6', paddingLeft: '20px', color: '#388e3c', fontSize: '22px'}}>
                <li><strong>Tonight:</strong> Start my sleep protocol</li>
                <li><strong>72 hours:</strong> Notice dramatic symptom reduction</li>
                <li><strong>2 weeks:</strong> Your partner notices the "old you" returning</li>
                <li><strong>3 weeks:</strong> Complete transformation (like mine)</li>
              </ul>
            </div>

            {/* Why This Works Section */}
            <div className="why-works" style={{background: 'white', padding: '30px', borderRadius: '12px', margin: '20px 0'}}>
              <h3 style={{color: '#6B4E7A', fontSize: '32px', marginBottom: '15px'}}>
                Why This Works When Everything Else Fails
              </h3>
              <div style={{display: 'grid', gap: '15px', fontSize: '22px'}}>
                <div>
                  <span style={{color: '#d32f2f', fontWeight: 'bold'}}>❌ Generic perimenopause advice:</span> One-size-fits-all approach<br/>
                  <span style={{color: '#388e3c', fontWeight: 'bold'}}>✅ My protocol:</span> Battle-tested by a woman who almost lost everything
                </div>
                <div>
                  <span style={{color: '#d32f2f', fontWeight: 'bold'}}>❌ Expensive hormone clinics:</span> Months of waiting, thousands of dollars<br/>
                  <span style={{color: '#388e3c', fontWeight: 'bold'}}>✅ My protocol:</span> Start tonight, see results in 72 hours, costs $7
                </div>
                <div>
                  <span style={{color: '#d32f2f', fontWeight: 'bold'}}>❌ Band-aid solutions:</span> Temporary relief<br/>
                  <span style={{color: '#388e3c', fontWeight: 'bold'}}>✅ My protocol:</span> Complete hormone restoration and relationship revival
                </div>
              </div>
            </div>

            {/* Personal Promise Section */}
            <div className="personal-promise" style={{background: '#f8f6ff', padding: '30px', borderRadius: '12px', margin: '20px 0'}}>
              <h3 style={{color: '#6B4E7A', fontSize: '32px', marginBottom: '15px'}}>
                🛡️ My Personal Promise to You
              </h3>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                I'm staking my reputation on this: Try my protocol for 30 days. If you don't feel dramatically better - if your relationship doesn't improve - if you don't start sleeping better and feeling more like yourself - email me personally for a full refund.
              </p>
              <p style={{lineHeight: '1.6', fontWeight: 'bold', fontSize: '22px'}}>
                But here's what's really going to happen: You'll start seeing results tonight. Your partner will notice changes within days. And in 3 weeks, you'll be thanking me for giving you your life back.
              </p>
            </div>

            {/* Final CTA Section */}
            <div className="final-cta" style={{background: 'linear-gradient(135deg, #6B4E7A 0%, #8B7A94 100%)', color: 'white', padding: '30px', borderRadius: '12px', textAlign: 'center', margin: '20px 0'}}>
              <h3 style={{color: '#D4AF37', fontSize: '36px', marginBottom: '15px'}}>
                🚀 Get My Marriage-Saving Protocol Now - $7
              </h3>
              
              <button style={{background: 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)', color: '#2C3E50', border: 'none', padding: '20px 40px', fontSize: '24px', fontWeight: 'bold', borderRadius: '50px', cursor: 'pointer', margin: '20px 0', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>
                DOWNLOAD MY COMPLETE PROTOCOL - $7
              </button>
              
              <div style={{marginTop: '20px', fontSize: '22px'}}>
                <p>✅ Instant access to everything that saved my marriage</p>
                <p>✅ Start your transformation tonight</p>
                <p>✅ 30-day personal guarantee</p>
                <p>✅ Less than a coffee but could save your relationship</p>
              </div>
            </div>

            {/* 24 Hour Warning */}
            <div className="time-warning" style={{background: '#fff5f5', padding: '20px', borderRadius: '8px', margin: '20px 0', border: '2px solid #d32f2f'}}>
              <h4 style={{color: '#d32f2f', fontSize: '28px', marginBottom: '10px', textAlign: 'center'}}>
                ⏰ This $7 Price Disappears in 24 Hours
              </h4>
              <p style={{textAlign: 'center', marginBottom: '10px', fontSize: '22px'}}>
                After 24 hours, this goes back to $97 - the price other hormone programs charge.
              </p>
              <p style={{textAlign: 'center', marginBottom: '10px', fontSize: '22px'}}>
                Why $7 today? Because I remember sitting on that bathroom floor at 3 AM. I remember thinking my love story was over. I remember the desperation.
              </p>
              <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '22px'}}>
                $7 removes every excuse. It's less than a Starbucks run, but it could save your marriage like it saved mine.
              </p>
            </div>

            {/* Don't Let Perimenopause Section */}
            <div className="dont-let" style={{background: 'white', padding: '30px', borderRadius: '12px', margin: '20px 0', textAlign: 'center'}}>
              <h3 style={{color: '#6B4E7A', fontSize: '32px', marginBottom: '15px'}}>
                Don't Let Perimenopause Steal Your Love Story
              </h3>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                {capitalizedFirstName}, your score of {hormoneScores.overall}/100 is exactly where I was when I almost lost everything.
              </p>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                The difference? I found the right protocol at the right time.
              </p>
              <p style={{lineHeight: '1.6', marginBottom: '15px', fontSize: '22px'}}>
                You have the same opportunity right now.
              </p>
              <p style={{lineHeight: '1.6', marginBottom: '20px', fontWeight: 'bold', fontSize: '22px'}}>
                Your 72-hour transformation window starts the moment you click below.
              </p>
              
              <button style={{background: 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)', color: '#2C3E50', border: 'none', padding: '20px 40px', fontSize: '24px', fontWeight: 'bold', borderRadius: '50px', cursor: 'pointer', marginBottom: '20px'}}>
                GET MY $7 MARRIAGE-SAVING PROTOCOL NOW
              </button>
            </div>

            {/* Signature Section */}
            <div className="signature" style={{background: '#f8f6ff', padding: '20px', borderRadius: '8px', margin: '20px 0'}}>
              <p style={{fontStyle: 'italic', textAlign: 'center', marginBottom: '10px', fontSize: '22px'}}>
                To your passionate, unstoppable future,
              </p>
              <p style={{fontWeight: 'bold', textAlign: 'center', marginBottom: '5px', fontSize: '24px'}}>
                Melanie Dagenais
              </p>
              <p style={{fontSize: '20px', textAlign: 'center', color: '#666'}}>
                The woman who turned perimenopause into the best years of her marriage
              </p>
            </div>

            {/* P.S. Section */}
            <div className="ps-section" style={{background: 'white', padding: '20px', borderRadius: '8px', margin: '20px 0', fontSize: '16px'}}>
              <p style={{marginBottom: '10px', fontSize: '22px'}}>
                <strong>P.S.</strong> The libido revival techniques alone saved my marriage. The sleep protocols gave me my energy back. The mood stability formula made us best friends again. You're getting a complete relationship rescue system for $7.
              </p>
              <p style={{marginBottom: '15px', fontSize: '22px'}}>
                <strong>P.P.S.</strong> Four years later, I'm having the best sex of my 26-year marriage. My friends call us "relationship goals." Perimenopause could be the beginning of YOUR best years too - but only if you act in the next 24 hours.
              </p>
              
              <div style={{textAlign: 'center'}}>
                <button style={{background: 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)', color: '#2C3E50', border: 'none', padding: '15px 30px', fontSize: '20px', fontWeight: 'bold', borderRadius: '50px', cursor: 'pointer'}}>
                  CLICK HERE - SAVE YOUR RELATIONSHIP FOR $7
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trust Footer at the very bottom */}
      <TrustFooter />
    </div>
  );
};

export default Results;
