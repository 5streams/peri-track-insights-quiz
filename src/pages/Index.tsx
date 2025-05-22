import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FBF9F6]">
      <header className="bg-white py-3 px-4 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
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
        <section className="bg-[#FFECD6] py-10 md:py-16 text-center border-b border-[#5D4154]/10">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-[#5D4154] mb-4">
              Perimenopause Symptoms Quiz
            </h1>
            
            <p className="text-lg max-w-2xl mx-auto mb-6 text-[#7D6174]">
              Identify your perimenopause symptoms and discover what's causing them in just 2 minutes
            </p>
            
            <Button 
              asChild
              className="bg-[#5D4154] hover:bg-[#7D6174] text-white px-8 py-5 text-lg font-semibold rounded-full shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl"
            >
              <Link to="/quiz">Take The FREE Perimenopause Quiz</Link>
            </Button>
            
            <div className="mt-3 text-sm text-[#7D6174]">
              Free 2 Minute Assessment • Get Results Immediately
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-10 bg-[#FFECD6]/50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-center font-playfair text-2xl md:text-3xl font-bold text-[#5D4154] mb-6">
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
                  <div className="w-10 h-10 bg-[#5D4154] text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.content}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                asChild
                className="bg-[#5D4154] hover:bg-[#7D6174] text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg"
              >
                <Link to="/quiz">Take The FREE Quiz</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials - Condensed */}
        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-center font-playfair text-2xl md:text-3xl font-bold text-[#5D4154] mb-6">
              WOMEN WHO FOUND ANSWERS
            </h2>
            
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  quote: "After taking this assessment, I finally understood my symptoms were perimenopause, not just stress.",
                  author: "— Jennifer, 44"
                },
                {
                  quote: "This quiz helped me understand my night sweats were classic perimenopause symptoms. The recommendations actually worked.",
                  author: "— Karen, 45"
                },
                {
                  quote: "I couldn't understand my sudden memory issues. This assessment identified them as perimenopause symptoms.",
                  author: "— Patricia, 43"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-[#FFECD6]/30 p-5 rounded-xl shadow-sm">
                  <p className="mb-3 text-sm italic">"{testimonial.quote}"</p>
                  <p className="font-semibold text-[#5D4154] text-sm">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="py-10 bg-[#5D4154] text-center text-white" id="quiz">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-4">
              IDENTIFY YOUR PERIMENOPAUSE SYMPTOMS TODAY
            </h2>
            
            <p className="max-w-2xl mx-auto mb-6">
              Join over 30,000 women who've gained clarity with our free 2-minute assessment.
            </p>
            
            <Button 
              asChild
              className="bg-white hover:bg-gray-100 text-[#5D4154] px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl"
            >
              <Link to="/quiz">Take The FREE Quiz Now</Link>
            </Button>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6 text-sm">
              {["Private & Secure", "HIPAA Compliant", "Medically Reviewed"].map((badge, index) => (
                <div key={index} className="bg-white/10 px-4 py-1 rounded-full">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#5D4154] text-white py-6 px-4 text-sm">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-6 w-6 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-[#FFECD6] rounded-full" />
                </div>
                <span className="text-lg font-playfair font-bold">Peritrack</span>
              </div>
              <p className="text-xs text-white/80">
                Helping women understand and navigate perimenopause symptoms.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#FFECD6] mb-2">Company</h4>
              <ul className="space-y-1 text-xs">
                {["About Us", "Medical Review", "Careers"].map((link, index) => (
                  <li key={index}><a href="#" className="hover:text-[#FFECD6] transition">{link}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#FFECD6] mb-2">Resources</h4>
              <ul className="space-y-1 text-xs">
                {["Perimenopause Symptoms", "Hormone Guide", "Research"].map((link, index) => (
                  <li key={index}><a href="#" className="hover:text-[#FFECD6] transition">{link}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#FFECD6] mb-2">Legal</h4>
              <ul className="space-y-1 text-xs">
                {["Terms", "Privacy", "Contact"].map((link, index) => (
                  <li key={index}><a href="#" className="hover:text-[#FFECD6] transition">{link}</a></li>
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
