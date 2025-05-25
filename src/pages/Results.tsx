
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

          {/* Sales Pitch Content */}
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
              {/* Hero Image */}
              <div className="text-center mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=400&fit=crop&crop=center" 
                  alt="Woman feeling confident and empowered" 
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
              </div>

              <h2 className="text-3xl font-bold text-center text-[#5D4154] mb-6">
                Dear Beautiful Sister,
              </h2>
              
              <h3 className="text-2xl font-bold text-center text-[#7E69AB] mb-4">
                You're Not Yourself—And It's Breaking Your Heart 😢
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Are you waking up drenched in sweat, wondering why your body's turned against you? Do you snap at your kids or partner, then cry over nothing?
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Maybe brain fog's got you scared you're losing your mind, or your libido's vanished, leaving your marriage cold and empty. Weight gain, hair loss, feeling like a stranger in your own skin—it's stealing your joy, isn't it?
              </p>
              
              {/* Wellness Image */}
              <div className="my-8">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=300&fit=crop&crop=center" 
                  alt="Woman practicing self-care and wellness" 
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>

              <h3 className="text-2xl font-bold text-[#7E69AB] mt-8 mb-4">
                You're Not Crazy—This Is My Story Too 💕
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Four years ago, I was right where you are. My name's [Your Name], and I was losing everything—my energy, my confidence, my marriage. I'm here to tell you there's hope, because I found a way to crush those symptoms and come back stronger in just 3 weeks. Let me share my journey and show you how to take back your life.
              </p>
              
              <h3 className="text-2xl font-bold text-[#7E69AB] mt-8 mb-4">
                My Journey: A Love Story Nearly Lost 💔
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 items-center my-8">
                <div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    My husband and I were the couple everyone envied. For 26 years, we raised three incredible kids (10, 12, and 15) and lived a love story so fiery, friends begged us to write a book. They'd gush, "How are you so in love, so passionate?" Our flirty connection was magic.
                  </p>
                </div>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&h=300&fit=crop&crop=center" 
                    alt="Beautiful sunset representing hope and new beginnings" 
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                But four years ago, that magic started fading. I had no energy. My libido disappeared. My hair was falling out, I couldn't sleep, and my moods were a rollercoaster. I snapped at my kids, cried over nothing, and felt like I was failing as a wife. Our once-electric marriage felt hollow, and I saw the pain in my husband's eyes. I was terrified our love was dying.
              </p>
              
              <h3 className="text-2xl font-bold text-[#7E69AB] mt-8 mb-4">
                I Didn't Know What Was Wrong 😞
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                I later learned I was in perimenopause—the confusing, hormonal phase before menopause that can start in your 30s or 40s and last up to 10 years. It's when your hormones go haywire, causing hot flashes, mood swings, and more. But back then, nobody warned me, and my doctor dismissed my symptoms with, "It's just stress." Sound familiar?
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                We tried everything to fix it. We moved to Mexico with our kids, hoping a fresh start would help. We hit the gym, lifting heavy weights, but after eight months, we saw no progress.
              </p>
              
              <h3 className="text-2xl font-bold text-[#7E69AB] mt-8 mb-4">
                Desperate to Save Our Love ⚡️
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                We kept up our weekly date nights, even tried a spicy couples' resort to rekindle our spark. Nothing worked. I was still exhausted, moody, disconnected. My husband stood by me, but I could feel the distance growing. I thought, "Is this the end of our love story?"
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Then, at that resort, we met a couple who blew us away. They were 47, older than us, yet radiant—muscular, vibrant, and so in love. My husband asked their secret. The man leaned in and said, "You've got to hack your hormones. Find the right expert." Those words were our lifeline.
              </p>
              
              {/* Transformation Image */}
              <div className="my-8">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=300&fit=crop&crop=center" 
                  alt="Peaceful nature scene representing transformation and renewal" 
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>

              <h3 className="text-2xl font-bold text-[#7E69AB] mt-8 mb-4">
                The Secret That Changed Everything 🗝️
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                We found a hormone expert in Mexico—not some random doctor, but a genius who knew how to optimize hormones the right way. My bloodwork revealed the truth: my hormones—testosterone, progesterone, estrogen—were nearly gone, the root of my perimenopause chaos. My husband's hormones were off, too.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                The expert said, "No diet or workout can fix unbalanced hormones, and the wrong approach makes it worse." He shared Hormonal Optimization Secrets—a precise, tailored plan to rebuild our hormones using targeted diet, light exercise, and bioidentical hormone replacement therapy (BHRT). Within 3 weeks, I was reborn.
              </p>
              
              <h3 className="text-2xl font-bold text-[#7E69AB] mt-8 mb-4">
                My Life Came Roaring Back in 3 Weeks! 🎉
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 items-center my-8">
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=500&h=300&fit=crop&crop=center" 
                    alt="Modern wellness and health concept" 
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    My energy surged. My hair stopped falling out. My mood stabilized. And my libido? It exploded, and we were sneaking away like teenagers—even at my parents' house on vacation! In just 3 weeks, I felt vibrant, confident, and deeply in love again.
                  </p>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                My husband's energy and passion skyrocketed, too. We built muscle with light exercise, and our marriage became hotter, stronger, more passionate than ever—26 years in! The key was rebuilding our hormones the right way with the right expert, using simple diet tweaks, light exercise, and BHRT. That's when I knew I had to share this with you.
              </p>
              
              <h3 className="text-2xl font-bold text-[#7E69AB] mt-8 mb-4">
                You Can Feel Amazing in 3 Weeks Too 🌈
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                You don't have to suffer through hot flashes, mood swings, or a fading spark. I created MenoMastery: Your Essential Guide to Thriving Through Perimenopause to hand you the exact Hormonal Optimization Secrets that transformed my life in 3 weeks.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                —for just $14 (was $27, 24-hour deal!). This 33-page eBook is your step-by-step plan to rebuild and rebalance your hormones fast with targeted diet, light exercise, BHRT insights, and expert strategies, so you can feel vibrant, sexy, and in control again. Plus, it includes a self-assessment quiz to confirm if you're in perimenopause and a detailed symptom tracker to monitor your progress.
              </p>
              
              <div className="bg-purple-100 p-6 rounded-lg text-center my-8">
                <p className="text-xl font-bold text-[#5D4154]">
                  ⏰ Only $14 for 24 hours—grab it before it's gone!
                </p>
              </div>
              
              <h3 className="text-2xl font-bold text-[#7E69AB] mt-8 mb-4">
                Why MenoMastery Is Your Hormone Game-Changer 💪
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Your symptoms—hot flashes, mood swings, low libido—aren't "just aging." They're hormonal chaos from perimenopause, and you can fix them in 3 weeks. Reddit's full of women like you, battling:
              </p>
              
              <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700">
                <li><strong>Hot Flashes & Night Sweats:</strong> Waking up drenched, no rest.</li>
                <li><strong>Mood Swings & Anxiety:</strong> Snapping, then crying, out of control.</li>
                <li><strong>Brain Fog:</strong> Forgetting words, fearing the worst.</li>
                <li><strong>Low Libido & Dryness:</strong> Losing intimacy with your partner.</li>
                <li><strong>Weight Gain & Hair Loss:</strong> Not recognizing your body.</li>
                <li><strong>Dismissive Doctors:</strong> Told it's "normal" with no help.</li>
              </ul>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                MenoMastery delivers the secrets to crush these symptoms by rebalancing your hormones in just 3 weeks, using proven methods thousands of women swear by.
              </p>
              
              <h3 className="text-2xl font-bold text-[#7E69AB] mt-8 mb-4">
                Backed by Science & 1,000+ Women's Stories! 🩺
              </h3>
              
              <h3 className="text-2xl font-bold text-[#7E69AB] mt-8 mb-4">
                What's Inside Your $14 Hormone-Rebuilding Guide? 📖
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                This 33-page eBook is your hormone expert, nutritionist, and bestie in one. Here's the gold you get:
              </p>
              
              <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700">
                <li><strong>Perimenopause Self-Assessment Quiz:</strong> Confirm if you're in perimenopause in minutes—no doctor needed. Know your status and start your transformation with confidence.</li>
                <li><strong>Detailed Symptom Tracker:</strong> Log hot flashes, mood, sleep, and libido to pinpoint triggers and track your 3-week progress, empowering you and your hormone expert.</li>
              </ul>
              
              <h4 className="text-xl font-bold text-[#7E69AB] mt-6 mb-3">
                Your 3-Week Hormone Rebalance Plan 🌱
              </h4>
              
              <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700">
                <li><strong>3-Week Hormone Rebalance Plan:</strong> A day-by-day roadmap to rebuild estrogen, progesterone, and testosterone with diet, light exercise, and expert advocacy. Feel better in days, vibrant by Week 3.</li>
                <li><strong>Hormone-Optimizing Diet:</strong> 7-day meal plan with phytoestrogen-rich recipes (soy smoothies, kale salads) to mimic estrogen, boost progesterone, and reduce inflammation.</li>
              </ul>
              
              <h4 className="text-xl font-bold text-[#7E69AB] mt-6 mb-3">
                Sleep Soundly & Feel Sharp 🌙
              </h4>
              
              <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700">
                <li><strong>Hot Flash & Night Sweat Hacks:</strong> Cooling recipes, bedroom tricks, and BHRT insights to rest easy in days.</li>
                <li><strong>Mood & Brain Fog Fixes:</strong> 5-minute breathing exercises, brain-boosting snacks, and hormone hacks to feel calm and clear.</li>
              </ul>
              
              <h4 className="text-xl font-bold text-[#7E69AB] mt-6 mb-3">
                Reignite Your Passion 🔥
              </h4>
              
              <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700">
                <li><strong>Libido & Intimacy Boosters:</strong> Hormone-rebuilding foods, yoga poses, and BHRT tips to bring back your spark, like I did.</li>
                <li><strong>Doctor Advocacy Toolkit:</strong> Scripts to find the right hormone expert (homeopathic doctor or naturopath) and demand bloodwork in Week 1 for rapid results.</li>
              </ul>
              
              <h4 className="text-xl font-bold text-[#7E69AB] mt-6 mb-3">
                Get Strong & Confident 💪
              </h4>
              
              <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700">
                <li><strong>3-Week Light Exercise Plan:</strong> Gentle walks, yoga, and bodyweight circuits to boost energy, sculpt muscle, and rebuild hormones.</li>
                <li><strong>Stress-Busting Self-Care:</strong> 5-minute meditations, gratitude journaling to support hormone balance and calm the chaos.</li>
              </ul>
              
              <h4 className="text-xl font-bold text-[#7E69AB] mt-6 mb-3">
                Resources & Sisterhood 👭
              </h4>
              
              <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700">
                <li><strong>BHRT Insights:</strong> Learn why bioidentical hormone therapy may be safer and how it turbocharges your 3-week plan.</li>
                <li><strong>Resources & Community:</strong> Books, apps, and Reddit communities to keep you connected and inspired.</li>
              </ul>
              
              <h3 className="text-2xl font-bold text-[#7E69AB] mt-8 mb-4">
                Hormonal Optimization Secrets: Your 3-Week Miracle 🔓
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                MenoMastery unlocks the secrets that saved me:
              </p>
              
              <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700">
                <li><strong>Fast Hormone Rebuilding:</strong> Diet, exercise, and BHRT tweaks to rebalance hormones in days, not months.</li>
                <li><strong>Expert Guidance:</strong> How to find certified pros who customize your plan for rapid results.</li>
              </ul>
              
              <h4 className="text-xl font-bold text-[#7E69AB] mt-6 mb-3">
                No More Guesswork 🚫
              </h4>
              
              <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700">
                <li><strong>3-Week Action Plan:</strong> Daily steps, tests, scripts to start feeling better fast.</li>
                <li><strong>Avoid Traps:</strong> Why generic fixes fail and how to get it right with the right expert.</li>
              </ul>
              
              <p className="text-lg text-gray-700 leading-relaxed font-bold">
                For $14, you get a $297 value—everything you need to confirm perimenopause and feel vibrant in 3 weeks!
              </p>
              
              <div className="bg-red-100 p-6 rounded-lg text-center my-8">
                <p className="text-xl font-bold text-red-600">
                  ⏰ 24 Hours Left—Grab Your $14 Guide Now!
                </p>
              </div>
              
              <h3 className="text-2xl font-bold text-[#7E69AB] mt-8 mb-4">
                Real Women, Real Wins 🌈
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Hear from sisters who crushed it with these secrets:
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg space-y-4 my-8">
                <blockquote className="text-lg italic text-gray-700">
                  "Hot flashes and brain fog were killing me. MenoMastery's quiz confirmed perimenopause, and the 3-week plan got me sleeping and thinking clearly again!"
                  <footer className="text-right font-bold">—Tanya, 39</footer>
                </blockquote>
                
                <blockquote className="text-lg italic text-gray-700">
                  "My libido was gone, and my marriage was fading. MenoMastery's hormone hacks and tracker brought our spark back in weeks!"
                  <footer className="text-right font-bold">—Jennifer, 44</footer>
                </blockquote>
                
                <blockquote className="text-lg italic text-gray-700">
                  "My doctor ignored my hair loss. MenoMastery's scripts got me a hormone expert. I'm vibrant again!"
                  <footer className="text-right font-bold">—Rachel, 46</footer>
                </blockquote>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                These women were lost, like you. MenoMastery gave them their lives back—and it's your turn.
              </p>
              
              <h3 className="text-2xl font-bold text-[#7E69AB] mt-8 mb-4">
                Why $14? You Deserve to Thrive 💖
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Why's a guide worth $297 just $14? Because my husband and I know the pain of feeling broken. We've been there. We want every woman to feel vibrant, sexy, alive—not just those who can afford $500+ clinics.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Normally $27, we're slashing it to $14 for 24 hours to get this into your hands. It's less than a coffee run, but it's your ticket to a radiant life in 3 weeks. ⏰ Don't miss out!
              </p>
              
              <h3 className="text-2xl font-bold text-[#7E69AB] mt-8 mb-4">
                Zero Risk, All Reward 🎯
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                No worries—there's no risk. If MenoMastery doesn't light you up in 30 days, email us for a full refund. But you'll be too busy feeling fabulous to want one!
              </p>
              
              <h3 className="text-2xl font-bold text-[#7E69AB] mt-8 mb-4">
                Don't Let Chaos Steal Your Life ⏰
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Every sweaty night, every mood swing, every lost moment with your partner is hormonal chaos winning. If you wait, you risk:
              </p>
              
              <ul className="list-disc pl-8 space-y-3 text-lg text-gray-700">
                <li><strong>Years of Struggle:</strong> Perimenopause can drag on a decade.</li>
                <li><strong>Fading Love:</strong> Low libido and irritability can break marriages.</li>
                <li><strong>Health Risks:</strong> Hormone imbalances hit your bones, heart, brain.</li>
                <li><strong>Lost You:</strong> Missing the vibrant, confident woman you are.</li>
              </ul>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                I almost lost my marriage waiting. Don't make my mistake. For $14, MenoMastery hands you the secrets to rebalance your hormones in 3 weeks.
              </p>
              
              <h3 className="text-2xl font-bold text-[#7E69AB] mt-8 mb-4">
                Act Now—Feel Better in 3 Weeks! 🚀
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                This is your moment to take back your body, mood, and spark. MenoMastery is ready to download instantly—no waiting, just transformation.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Here's how to start:
              </p>
              
              <ol className="list-decimal pl-8 space-y-3 text-lg text-gray-700">
                <li>Click "Grab Your Guide Now!" below.</li>
                <li>Get your 33-page PDF instantly.</li>
                <li>Confirm perimenopause and rebalance your hormones in 3 weeks!</li>
              </ol>
              
              <h3 className="text-2xl font-bold text-[#7E69AB] mt-8 mb-4">
                Only $14—Your Spark's Worth It 💸
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Only $14—one-time payment, no subscriptions, no tricks. ⏰ 24-hour deal—don't wait!
              </p>
              
              <div className="text-center py-8">
                <Button className="bg-[#A7C4A0] hover:bg-[#A7C4A0]/80 text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105">
                  Grab Your Guide Now!
                </Button>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Don't let another sleepless night or tearful day define you. With MenoMastery's Hormonal Optimization Secrets, you're stronger than this chaos. Join me and thousands of women who've reignited their spark for just $14.
              </p>
              
              <h3 className="text-2xl font-bold text-[#7E69AB] mt-8 mb-4">
                Your Vibrant Future Is Here 🌞
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Imagine waking up energized, flirting with your partner, feeling confident in your skin—in just 3 weeks. That's what MenoMastery did for me. For $14, you've got nothing to lose and a radiant life to gain.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                My journey started with one step—yours starts now. Click "Grab Your Guide Now!" and take back your life.
              </p>
              
              <h3 className="text-2xl font-bold text-[#7E69AB] mt-8 mb-4">
                To Your Passionate, Unstoppable Future 🎈
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                To your passionate, unstoppable future,<br/>
                [Your Name], Co-Creator of MenoMastery
              </p>
              
              <div className="bg-yellow-100 p-6 rounded-lg space-y-4 my-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>P.S.</strong> Picture laughing with your family, feeling sexy, loving life again—in just 3 weeks. MenoMastery's quiz and tracker make it real for just $14. Click "Grab Your Guide Now!" before this 24-hour deal vanishes! 🚀
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>P.P.S.</strong> Reddit's r/Menopause is buzzing with women begging for answers. Be the one who crushes it. Get MenoMastery today and share your glow-up! 🌟
                </p>
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
