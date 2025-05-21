
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FBF9F6]">
      <header className="bg-white py-3 px-4 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-[#5D4154] rounded-full flex items-center justify-center">
              <div className="h-5 w-5 bg-[#FFECD6] rounded-full" />
            </div>
            <span className="text-xl font-playfair font-bold text-[#5D4154]">Peritrack</span>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section - Optimized */}
        <section className="bg-[#FFECD6] py-8 text-center border-b border-[#5D4154]/10">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-[#5D4154] mb-4">
              Perimenopause Symptoms Quiz: Get Answers in 2 Minutes
            </h1>
            
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6 text-[#7D6174]">
              Identify which perimenopause symptoms you're experiencing and discover what's causing them
            </p>
            
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6 text-[#7D6174] italic">
              7 out of 10 women experience perimenopause symptoms for 4-10 years without recognizing the cause
            </p>
            
            <Button 
              asChild
              className="bg-[#5D4154] hover:bg-[#7D6174] text-white px-8 py-5 text-lg font-semibold rounded-full shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl"
            >
              <Link to="/quiz">IDENTIFY MY PERIMENOPAUSE SYMPTOMS</Link>
            </Button>
            
            <div className="mt-3 text-sm text-[#7D6174]">
              Free 2-minute assessment • No registration required • Results immediately
            </div>
          </div>
        </section>
        
        {/* Symptom-Focused Section - New Section */}
        <section className="py-8 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-center font-playfair text-2xl md:text-3xl font-bold text-[#5D4154] mb-6">
              COMMON PERIMENOPAUSE SYMPTOMS EXPLAINED
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  symptom: "Unexplained weight gain, especially around your middle",
                  explanation: "Why it happens: Hormonal changes affect fat distribution and metabolism"
                },
                {
                  symptom: "Sleep disruptions and night sweats",
                  explanation: "Why they happen: Decreasing progesterone affects your sleep architecture"
                },
                {
                  symptom: "Mood changes, anxiety, and irritability",
                  explanation: "Why they happen: Fluctuating estrogen impacts neurotransmitter function"
                },
                {
                  symptom: "Brain fog and difficulty concentrating",
                  explanation: "Why it happens: Hormone fluctuations affect cognitive function"
                },
                {
                  symptom: "Hot flashes and temperature regulation issues",
                  explanation: "Why they happen: Estrogen changes affect your body's thermostat"
                },
                {
                  symptom: "Irregular periods or heavy bleeding",
                  explanation: "Why they happen: Changing hormone levels affect your menstrual cycle"
                },
                {
                  symptom: "Fatigue that sleep doesn't resolve",
                  explanation: "Why it happens: Hormonal imbalances disrupt energy production"
                }
              ].map((item, index) => (
                <div key={index} className="relative pl-8 py-3 border-b border-gray-100">
                  <span className="absolute left-0 text-[#A7C4A0] font-bold">✓</span>
                  <div className="font-medium mb-1">{item.symptom}</div>
                  <div className="text-sm text-gray-600">{item.explanation}</div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button 
                asChild
                className="bg-[#5D4154] hover:bg-[#7D6174] text-white px-8 py-5 text-lg font-semibold rounded-full shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Link to="/quiz">IDENTIFY MY PERIMENOPAUSE SYMPTOMS</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Key Statistics Section - Enhanced */}
        <section className="py-8 bg-[#FFECD6]">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-center font-playfair text-2xl md:text-3xl font-bold text-[#5D4154] mb-6">
              PERIMENOPAUSE SYMPTOMS: THE HIDDEN STRUGGLE
            </h2>
            
            <div className="grid md:grid-cols-4 gap-5 mb-6">
              {[
                {
                  number: "82%",
                  text: "of women don't recognize their symptoms as perimenopause"
                },
                {
                  number: "76%",
                  text: "experience at least 3 different perimenopause symptoms before diagnosis"
                },
                {
                  number: "68%",
                  text: "report their symptoms were dismissed by healthcare providers"
                },
                {
                  number: "71%",
                  text: "see improvement once they understand and address their symptoms properly"
                }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm text-center"
                >
                  <h3 className="text-4xl font-playfair font-bold text-[#5D4154] mb-3">{stat.number}</h3>
                  <p>{stat.text}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <div className="inline-block bg-white/60 px-4 py-2 rounded-full text-sm mb-6">
                <span className="font-semibold">30,127 women</span> assessed their perimenopause symptoms this month
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                asChild
                className="bg-[#5D4154] hover:bg-[#7D6174] text-white px-8 py-5 text-lg font-semibold rounded-full shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Link to="/quiz">IDENTIFY MY PERIMENOPAUSE SYMPTOMS</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* How It Works Section - Optimized */}
        <section className="py-8 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-center font-playfair text-2xl md:text-3xl font-bold text-[#5D4154] mb-6">
              HOW OUR PERIMENOPAUSE SYMPTOMS ASSESSMENT WORKS
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[
                {
                  step: "1",
                  title: "Identify Your Specific Symptoms",
                  content: "Tell us which perimenopause symptoms you're experiencing, their severity, and patterns"
                },
                {
                  step: "2",
                  title: "AI Analyzes Your Symptom Patterns",
                  content: "Our advanced technology identifies connections between your symptoms and hormone changes"
                },
                {
                  step: "3",
                  title: "Get Personalized Insights About Your Symptoms",
                  content: "Discover which of your symptoms are likely perimenopause-related and what you can do about them"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-[#5D4154] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-playfair text-xl font-semibold mb-3">{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-[#FFECD6]/50 p-6 rounded-xl shadow-sm max-w-3xl mx-auto mb-6">
              <h3 className="text-center font-medium text-lg mb-4">After completing this quick assessment, you'll receive:</h3>
              <ul className="space-y-2">
                {[
                  "Personalized analysis of your perimenopause symptoms",
                  "Understanding of which hormone changes are likely causing each symptom",
                  "Clear explanation of your symptom patterns and connections",
                  "Actionable guidance tailored to your specific situation",
                  "Educational resources about managing your particular symptoms"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-[#A7C4A0] font-bold">•</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-center">
              <Button 
                asChild
                className="bg-[#5D4154] hover:bg-[#7D6174] text-white px-8 py-5 text-lg font-semibold rounded-full shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Link to="/quiz">IDENTIFY MY PERIMENOPAUSE SYMPTOMS</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section - Enhanced */}
        <section className="py-8 bg-[#FFECD6]">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-center font-playfair text-2xl md:text-3xl font-bold text-[#5D4154] mb-6">
              WOMEN WHO FOUND ANSWERS TO THEIR PERIMENOPAUSE SYMPTOMS
            </h2>
            
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  quote: "I was experiencing unpredictable mood swings, brain fog, and fatigue for over a year. After taking this assessment, I finally understood these were perimenopause symptoms, not just stress or aging. The clarity changed everything about how I approached my health.",
                  author: "— Jennifer, 44"
                },
                {
                  quote: "The night sweats and insomnia were making me miserable. I tried everything from melatonin to cutting caffeine with minimal results. This quiz helped me understand these were classic perimenopause symptoms. The targeted recommendations actually worked, and I'm finally sleeping through the night again.",
                  author: "— Karen, 45"
                },
                {
                  quote: "I couldn't understand why I suddenly had memory issues and trouble concentrating at work. Doctors suggested it was just stress. This assessment identified these as common perimenopause symptoms and explained the hormonal connection. Such a relief to know what's really going on.",
                  author: "— Patricia, 43"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                  <p className="mb-4 italic">"{testimonial.quote}"</p>
                  <p className="font-semibold text-[#5D4154]">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section - Enhanced */}
        <section className="py-8 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-center font-playfair text-2xl md:text-3xl font-bold text-[#5D4154] mb-6">
              FREQUENTLY ASKED QUESTIONS ABOUT PERIMENOPAUSE SYMPTOMS
            </h2>
            
            <div className="space-y-6 max-w-3xl mx-auto mb-6">
              {[
                {
                  question: "Q: What are the most common perimenopause symptoms?",
                  answer: "The most common perimenopause symptoms include irregular periods, hot flashes, night sweats, sleep disruptions, mood changes, brain fog, weight gain (especially around the middle), fatigue, decreased libido, and joint pain. The symptoms and their severity vary widely among women."
                },
                {
                  question: "Q: At what age do perimenopause symptoms typically start?",
                  answer: "Perimenopause symptoms commonly begin in a woman's 40s, but can start in the late 30s. The transition typically lasts 4-10 years before reaching menopause. Many women experience symptoms for years before recognizing the connection to hormonal changes."
                },
                {
                  question: "Q: Why do perimenopause symptoms fluctuate so much?",
                  answer: "Perimenopause symptoms often fluctuate because hormone levels aren't steadily declining but rather rising and falling unpredictably. You might experience intense symptoms for weeks, followed by periods of relief as hormone levels temporarily stabilize. This unpredictable pattern is why many women don't recognize what's happening."
                },
                {
                  question: "Q: How can I distinguish perimenopause symptoms from other health issues?",
                  answer: "Many perimenopause symptoms overlap with other conditions, which makes diagnosis challenging. Our assessment analyzes your specific symptom patterns to help identify which are likely hormone-related. Having clear data about your symptoms can help your healthcare provider make better determinations."
                }
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6">
                  <h4 className="font-semibold text-[#5D4154] mb-2 text-lg">{faq.question}</h4>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Mini-Form Option - New Section */}
        <section className="py-8 bg-[#FFECD6]/50">
          <div className="max-w-xl mx-auto px-4 text-center">
            <h3 className="text-xl font-semibold mb-4">Want a preview of what perimenopause symptoms you might be experiencing?</h3>
            
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Your age</label>
                <select className="w-full p-2 border border-gray-300 rounded">
                  <option>Select your age</option>
                  <option>35-39</option>
                  <option>40-44</option>
                  <option>45-49</option>
                  <option>50-55</option>
                  <option>55+</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Top 3 symptoms you're experiencing</label>
                <div className="space-y-2 text-left">
                  {[
                    "Hot flashes", 
                    "Sleep disruption", 
                    "Mood changes", 
                    "Weight gain", 
                    "Brain fog", 
                    "Irregular periods"
                  ].map((symptom, index) => (
                    <div key={index} className="flex items-center">
                      <input type="checkbox" id={`symptom-${index}`} className="mr-2" />
                      <label htmlFor={`symptom-${index}`}>{symptom}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button className="w-full bg-[#5D4154] hover:bg-[#7D6174] text-white py-3">
                GET QUICK INSIGHT
              </Button>
            </div>
            
            <div className="text-sm text-gray-600">
              For a complete assessment of all your perimenopause symptoms, take our free 2-minute quiz
            </div>
          </div>
        </section>
        
        {/* Final CTA - Enhanced */}
        <section className="py-8 bg-[#FFECD6] text-center" id="quiz">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#5D4154] mb-4">
              IDENTIFY YOUR PERIMENOPAUSE SYMPTOMS TODAY
            </h2>
            
            <p className="max-w-2xl mx-auto mb-6 text-lg">
              Join over 30,000 women who've gained clarity about their perimenopause symptoms with our free assessment. Takes just 2 minutes.
            </p>
            
            <Button 
              asChild
              className="bg-[#5D4154] hover:bg-[#7D6174] text-white px-8 py-5 text-lg font-semibold rounded-full shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl"
            >
              <Link to="/quiz">TAKE THE FREE PERIMENOPAUSE SYMPTOMS QUIZ</Link>
            </Button>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6 text-sm text-gray-600">
              {["Private & Secure", "HIPAA Compliant", "Medically Reviewed"].map((badge, index) => (
                <div key={index} className="bg-[#5D4154]/10 px-4 py-1 rounded-full">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#5D4154] text-white py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="h-5 w-5 bg-[#FFECD6] rounded-full" />
                </div>
                <span className="text-xl font-playfair font-bold text-white">Peritrack</span>
              </div>
              <p className="text-sm text-white/80">
                Helping women understand and navigate perimenopause symptoms with clarity and confidence through AI-powered insights and personalized guidance.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#FFECD6] mb-3">Company</h4>
              <ul className="space-y-2 text-sm">
                {["About Us", "Our Team", "Medical Review Board", "Careers"].map((link, index) => (
                  <li key={index}><a href="#" className="hover:text-[#FFECD6] transition">{link}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#FFECD6] mb-3">Resources</h4>
              <ul className="space-y-2 text-sm">
                {["Perimenopause Symptoms", "Hormone Guide", "Symptom Library", "Research"].map((link, index) => (
                  <li key={index}><a href="#" className="hover:text-[#FFECD6] transition">{link}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#FFECD6] mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                {["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"].map((link, index) => (
                  <li key={index}><a href="#" className="hover:text-[#FFECD6] transition">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-white/70 max-w-3xl mx-auto mb-3">
              This perimenopause symptoms quiz is designed for educational purposes. It is not intended to replace professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider about your health concerns.
            </p>
            <p className="text-sm">© 2025 Peritrack | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
