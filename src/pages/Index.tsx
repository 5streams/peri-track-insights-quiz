
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Lock } from "lucide-react";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="bg-white py-3 px-4 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center">
              <div className="h-5 w-5 bg-white rounded-full" />
            </div>
            <span className="text-xl font-playfair font-bold text-purple-600">Peritrack</span>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-white to-slate-100 py-10 md:py-16 text-center border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-slate-800 mb-4">
              Is It Perimenopause? Find Out In 2 Minutes
            </h1>
            
            <p className="text-lg max-w-2xl mx-auto mb-6 text-slate-600">
              Unsure if your symptoms are perimenopause or something else? Take our free quiz to discover what's really happening with your body.
            </p>
            
            <Button 
              asChild
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-5 text-lg font-semibold rounded-full shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl"
            >
              <Link to="/quiz">Take The FREE Perimenopause Quiz</Link>
            </Button>
            
            <div className="mt-3 text-sm text-slate-500">
              Free 2 Minute Assessment • Get Results Immediately
            </div>

            {/* Privacy badges */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm">
                <Lock className="h-3.5 w-3.5 text-purple-600" />
                <span className="text-xs font-medium text-slate-700">100% Private</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm">
                <Shield className="h-3.5 w-3.5 text-purple-600" />
                <span className="text-xs font-medium text-slate-700">Secure & Confidential</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Common Questions Section */}
        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-center font-playfair text-2xl md:text-3xl font-bold text-slate-800 mb-6">
              ARE THESE YOUR SYMPTOMS?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {[
                "Having trouble sleeping even when you're exhausted?",
                "Experiencing mood swings that seem to come out of nowhere?",
                "Noticing weight changes despite no changes to diet or exercise?",
                "Feeling foggy-headed or having trouble concentrating?",
                "Experiencing hot flashes or night sweats?",
                "Noticing changes in your menstrual cycle?"
              ].map((question, index) => (
                <div key={index} className="bg-slate-50 p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
                  <p className="text-slate-700 font-medium">{question}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center bg-slate-50 p-5 rounded-lg shadow-sm mb-6">
              <p className="font-medium text-lg mb-2 text-slate-700">You're not alone. 90% of women don't recognize perimenopause symptoms when they start.</p>
              <p className="text-sm text-slate-600">Our assessment has helped over 30,000 women identify if their symptoms are perimenopause-related.</p>
            </div>
            
            <div className="text-center">
              <Button 
                asChild
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg"
              >
                <Link to="/quiz">Find Out If It's Perimenopause</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-10 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-center font-playfair text-2xl md:text-3xl font-bold text-slate-800 mb-6">
              HOW OUR ASSESSMENT WORKS
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[
                {
                  step: "1",
                  title: "Identify Symptoms",
                  content: "Tell us which symptoms you're experiencing"
                },
                {
                  step: "2",
                  title: "AI Analysis",
                  content: "Our technology identifies hormone patterns"
                },
                {
                  step: "3",
                  title: "Get Insights",
                  content: "Discover which symptoms are perimenopause-related"
                }
              ].map((item, index) => (
                <div key={index} className="text-center bg-white p-5 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2 text-slate-700">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials - Condensed */}
        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-center font-playfair text-2xl md:text-3xl font-bold text-slate-800 mb-6">
              WOMEN WHO FOUND ANSWERS
            </h2>
            
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  quote: "I thought I was just stressed, but the assessment showed my symptoms were classic perimenopause. What a relief to finally know!",
                  author: "— Jennifer, 44"
                },
                {
                  quote: "For months I wondered if something was wrong with me. This quiz confirmed my symptoms were perimenopause and helped me talk to my doctor.",
                  author: "— Karen, 45"
                },
                {
                  quote: "I couldn't understand my sudden memory issues and mood changes. This assessment identified them as perimenopause, not just 'getting older'.",
                  author: "— Patricia, 43"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-slate-50 p-5 rounded-xl shadow-sm">
                  <p className="mb-3 text-sm italic text-slate-700">"{testimonial.quote}"</p>
                  <p className="font-semibold text-purple-600 text-sm">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="py-10 bg-purple-600 text-center text-white" id="quiz">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-4">
              STOP WONDERING AND START KNOWING
            </h2>
            
            <p className="max-w-2xl mx-auto mb-6">
              In just 2 minutes, get clarity on whether your symptoms are perimenopause-related or something else entirely.
            </p>
            
            <Button 
              asChild
              className="bg-white hover:bg-slate-100 text-purple-600 px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl"
            >
              <Link to="/quiz">Take The FREE Quiz Now</Link>
            </Button>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6 text-sm">
              {["Private & Secure", "HIPAA Compliant", "Medically Reviewed"].map((badge, index) => (
                <div key={index} className="bg-purple-700/40 px-4 py-1 rounded-full">
                  {badge}
                </div>
              ))}
            </div>

            {/* Added privacy statement */}
            <p className="mt-5 text-xs text-white/80 max-w-md mx-auto">
              We value your privacy. All information provided is encrypted and will never be shared with third parties. 
              Your data is used solely to provide personalized insights about your hormone health.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-slate-800 text-white py-6 px-4 text-sm">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-6 w-6 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-purple-300 rounded-full" />
                </div>
                <span className="text-lg font-playfair font-bold">Peritrack</span>
              </div>
              <p className="text-xs text-white/80">
                Helping women understand and navigate perimenopause symptoms.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-200 mb-2">Company</h4>
              <ul className="space-y-1 text-xs">
                {["About Us", "Medical Review", "Careers"].map((link, index) => (
                  <li key={index}><a href="#" className="hover:text-purple-300 transition">{link}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-200 mb-2">Resources</h4>
              <ul className="space-y-1 text-xs">
                {["Perimenopause Symptoms", "Hormone Guide", "Research"].map((link, index) => (
                  <li key={index}><a href="#" className="hover:text-purple-300 transition">{link}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-200 mb-2">Legal</h4>
              <ul className="space-y-1 text-xs">
                {["Terms", "Privacy", "Contact"].map((link, index) => (
                  <li key={index}><a href="#" className="hover:text-purple-300 transition">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="text-center text-xs text-white/70 pt-4 border-t border-white/10">
            <p>This quiz is for educational purposes. Always consult with a healthcare provider about health concerns.</p>
            <p className="mt-2">© 2025 Peritrack, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
