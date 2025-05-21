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
        {/* Hero Section */}
        <section className="bg-[#FFECD6] py-8 text-center border-b border-[#5D4154]/10">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-[#5D4154] mb-4">
              AI-Powered Perimenopause Symptoms Quiz: Discover What's Really Happening to Your Body
            </h1>
            
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6 text-[#7D6174] italic">
              7 out of 10 women will experience perimenopause symptoms for 4-10 years before menopause begins. Most don't recognize what's happening.
            </p>
            
            <Button 
              asChild
              className="bg-[#5D4154] hover:bg-[#7D6174] text-white px-8 py-5 text-lg font-semibold rounded-full shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl after:content-[' →']"
            >
              <Link to="/quiz">START MY FREE ASSESSMENT</Link>
            </Button>
          </div>
        </section>
        
        {/* Symptoms Checklist */}
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
            <h3 className="text-center font-playfair text-2xl font-semibold text-[#5D4154] mb-4">
              Is This You? Take Our 2-Minute Quiz
            </h3>
            
            {[
              "Unexplained weight gain, especially around your middle",
              "Sleep disruptions, even when you're exhausted",
              "Mood changes that feel different from your normal ups and downs",
              "Hot flashes or night sweats that seem to come from nowhere",
              "Brain fog or trouble concentrating at work",
              "Irregular periods or sudden heavy bleeding",
              "Unexplained fatigue that sleep doesn't fix"
            ].map((item, index) => (
              <div key={index} className="relative pl-8 mb-2 text-lg">
                <span className="absolute left-0 text-[#A7C4A0] font-bold">✓</span>
                {item}
              </div>
            ))}
          </div>
          
          <div className="text-center my-6 text-lg font-semibold text-[#5D4154]">
            27,843 women took this quiz last month to find answers.
          </div>
          
          <div className="bg-white p-5 rounded-xl shadow-md max-w-3xl mx-auto my-6 italic text-center">
            <p className="text-lg mb-2">
              "After 2 years of thinking I was just stressed or getting older, this quiz helped me understand my symptoms were actually hormonal changes. Finally having clarity changed everything."
            </p>
            <p className="font-semibold text-[#5D4154] not-italic">— Jennifer, 44</p>
          </div>
          
          <div className="text-center mb-8">
            <Button 
              asChild
              className="bg-[#5D4154] hover:bg-[#7D6174] text-white px-8 py-5 text-lg font-semibold rounded-full shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl after:content-[' →']"
            >
              <Link to="/quiz">START MY FREE ASSESSMENT</Link>
            </Button>
          </div>
        </div>
        
        {/* Benefits Section */}
        <section className="py-8 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-[#5D4154] mb-6">
              Why Women Are Taking This AI-Powered Perimenopause Symptoms Quiz
            </h2>
            
            <p className="text-center max-w-3xl mx-auto mb-6 text-lg">
              Perimenopause can begin in your late 30s or early 40s – much earlier than most women realize. The challenge? <strong>These symptoms are often mistaken for stress, aging, thyroid issues, or depression.</strong>
            </p>
            
            <p className="text-center mb-6 text-lg">
              Our comprehensive perimenopause symptoms assessment helps you:
            </p>
            
            <div className="grid md:grid-cols-2 gap-5 mb-8">
              {[
                {
                  title: "Identify Your Symptoms",
                  content: "Discover which perimenopause symptoms you're experiencing and how they relate to each other."
                },
                {
                  title: "Understand Hormone Changes",
                  content: "Learn how your hormones might be changing and what that means for your symptoms."
                },
                {
                  title: "Get Personalized Guidance",
                  content: "Receive recommendations tailored to your specific symptom pattern and hormone profile."
                },
                {
                  title: "AI-Powered Analysis",
                  content: "Our advanced AI technology analyzes your symptoms and provides insights human assessments might miss."
                }
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-[#FFECD6] p-6 rounded-xl shadow-sm transition transform hover:-translate-y-1"
                >
                  <h3 className="font-semibold text-xl text-[#5D4154] mb-3">{benefit.title}</h3>
                  <p>{benefit.content}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                asChild
                className="bg-[#5D4154] hover:bg-[#7D6174] text-white px-8 py-5 text-lg font-semibold rounded-full shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl after:content-[' →']"
              >
                <Link to="/quiz">TAKE THE FREE QUIZ NOW</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-8 bg-[#FFECD6]">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-[#5D4154] mb-6">
              The Perimenopause Symptom Confusion
            </h2>
            
            <p className="text-center max-w-3xl mx-auto mb-6 text-lg">
              Many women suffer through perimenopause symptoms for years without realizing what's happening. Our research shows:
            </p>
            
            <div className="grid md:grid-cols-3 gap-5 mb-6">
              {[
                {
                  number: "82%",
                  text: "of women don't connect their symptoms to hormone changes"
                },
                {
                  number: "63%",
                  text: "of women have never discussed perimenopause with their doctor"
                },
                {
                  number: "75%",
                  text: "of women feel better once they understand what's happening in their bodies"
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
            
            <div className="bg-white p-5 rounded-xl shadow-md max-w-3xl mx-auto italic text-center">
              <p className="text-lg mb-2">
                "I thought I was losing my mind until I took this assessment. Finding out my symptoms were likely perimenopause was actually a relief. Now I have a path forward."
              </p>
              <p className="font-semibold text-[#5D4154] not-italic">— Sarah, 41</p>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-8 bg-[#FFECD6]">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-[#5D4154] mb-6">
              How the AI-Powered Perimenopause Assessment Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[
                {
                  step: "1",
                  title: "Answer 8 Simple Questions",
                  content: "Tell us about your specific symptoms and experiences in our quick assessment."
                },
                {
                  step: "2",
                  title: "AI Analyzes Your Patterns",
                  content: "Our advanced AI technology processes your responses to identify hormone patterns."
                },
                {
                  step: "3",
                  title: "Get Actionable Guidance",
                  content: "Discover tailored recommendations for your specific situation."
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
            
            <p className="text-center italic mb-6">
              Your results are completely private and secure. We comply with all health privacy regulations.
            </p>
            
            <div className="text-center">
              <Button 
                asChild
                className="bg-[#5D4154] hover:bg-[#7D6174] text-white px-8 py-5 text-lg font-semibold rounded-full shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl after:content-[' →']"
              >
                <Link to="/quiz">BEGIN MY SYMPTOMS ASSESSMENT</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Results Preview */}
        <section className="py-8 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-[#5D4154] mb-6">
              Discover Your Perimenopause Profile
            </h2>
            
            <p className="text-center max-w-3xl mx-auto mb-6 text-lg">
              After completing this quick assessment, you'll receive:
            </p>
            
            <div className="grid md:grid-cols-3 gap-5 mb-6">
              {[
                {
                  title: "Your Hormone Balance Score",
                  content: "Understand where you might be in the perimenopause transition and what it means for you."
                },
                {
                  title: "AI-Powered Symptom Analysis",
                  content: "Our advanced AI technology identifies patterns in your symptoms that might be missed by standard assessments."
                },
                {
                  title: "Personalized Next Steps",
                  content: "Get clear guidance on what might help your specific situation and symptoms."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                  <h3 className="font-playfair text-xl font-semibold mb-3 text-[#5D4154]">{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                asChild
                className="bg-[#5D4154] hover:bg-[#7D6174] text-white px-8 py-5 text-lg font-semibold rounded-full shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl after:content-[' →']"
              >
                <Link to="/quiz">START MY FREE ASSESSMENT</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-8 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-[#5D4154] mb-6">
              Common Questions About Perimenopause Symptoms
            </h2>
            
            <div className="space-y-4 max-w-3xl mx-auto mb-6">
              {[
                {
                  question: "Q: At what age does perimenopause typically start?",
                  answer: "Perimenopause commonly begins in a woman's 40s, but can start in the late 30s. The transition lasts 4-10 years before reaching menopause. Many women experience symptoms for years before recognizing the connection to hormonal changes."
                },
                {
                  question: "Q: How is perimenopause different from menopause?",
                  answer: "Perimenopause is the transitional phase leading up to menopause. During perimenopause, hormone levels fluctuate widely, causing various symptoms. Menopause is officially diagnosed after 12 consecutive months without a period. The symptoms can be quite different between these phases."
                },
                {
                  question: "Q: Can perimenopause symptoms come and go?",
                  answer: "Yes, perimenopause symptoms often fluctuate. You might experience intense symptoms for weeks or months, followed by periods of relief as hormone levels temporarily stabilize. This unpredictable pattern is one reason many women don't recognize what's happening."
                },
                {
                  question: "Q: Should I talk to my doctor about perimenopause symptoms?",
                  answer: "Absolutely. While perimenopause is natural, severe symptoms can be managed. Our assessment can help you prepare for that conversation with specific information about your experiences. Having clear data about your symptoms can help your healthcare provider better address your needs."
                }
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6">
                  <h4 className="font-semibold text-[#5D4154] mb-2 text-lg">{faq.question}</h4>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                asChild
                className="bg-[#5D4154] hover:bg-[#7D6174] text-white px-8 py-5 text-lg font-semibold rounded-full shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl after:content-[' →']"
              >
                <Link to="/quiz">TAKE THE FREE QUIZ NOW</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-8 bg-[#FFECD6]">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-center font-playfair text-3xl md:text-4xl font-bold text-[#5D4154] mb-6">
              Women Like You Found Answers With Our Assessment
            </h2>
            
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  quote: "I was gaining weight despite eating well and exercising. After taking this quiz, I learned how perimenopause affects metabolism and what I could do differently. Three months later, I'm feeling so much better.",
                  author: "— Michelle, 47"
                },
                {
                  quote: "The night sweats were making it impossible to sleep. Understanding they were hormone-related helped me find solutions that actually worked. I'm finally sleeping through the night again.",
                  author: "— Karen, 45"
                },
                {
                  quote: "The brain fog was affecting my performance at work. After taking this assessment, I understood why and made some changes that have made a huge difference.",
                  author: "— Patricia, 43"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                  <p className="mb-4">"{testimonial.quote}"</p>
                  <p className="font-semibold text-[#5D4154]">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="py-8 bg-[#FFECD6] text-center" id="quiz">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#5D4154] mb-4">
              Ready to Get AI-Powered Insights About Your Symptoms?
            </h2>
            
            <p className="max-w-2xl mx-auto mb-6 text-lg">
              Join over 30,000 women who've gained clarity about their perimenopause symptoms through our AI-powered assessment. This free quiz takes just 2 minutes.
            </p>
            
            <Button 
              asChild
              className="bg-[#5D4154] hover:bg-[#7D6174] text-white px-8 py-5 text-lg font-semibold rounded-full shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl after:content-[' →']"
            >
              <Link to="/quiz">BEGIN MY SYMPTOMS ASSESSMENT</Link>
            </Button>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6 text-sm text-gray-600">
              {["Private & Secure", "HIPAA Compliant", "Medically Reviewed by Dr. Jennifer Miller, Board-Certified OB/GYN"].map((badge, index) => (
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
                Helping women understand and navigate perimenopause with clarity and confidence through AI-powered insights and personalized guidance.
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
                {["Blog", "Symptom Library", "Hormone Guide", "Research"].map((link, index) => (
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
              This perimenopause symptoms quiz is designed for educational purposes. It is not intended to replace professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider about any health concerns.
            </p>
            <p className="text-sm">© 2025 Peritrack | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
