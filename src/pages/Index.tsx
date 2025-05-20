
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFECD6]/30">
      <header className="bg-white py-4 px-6 shadow-md">
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
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-[#5D4154] mb-6">
            Understand Your Body's Transition
          </h1>
          
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-gray-700">
            7 out of 10 women experience perimenopause symptoms for 4-10 years before menopause. 
            Most don't recognize what's happening.
          </p>
          
          <Button 
            asChild
            className="bg-[#5D4154] hover:bg-[#5D4154]/90 text-white px-8 py-7 text-lg"
          >
            <Link to="/quiz">Start Perimenopause Quiz</Link>
          </Button>
          
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 bg-[#A7C4A0]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#A7C4A0" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-3 text-[#5D4154]">Identify Your Symptoms</h3>
              <p className="text-gray-600">Discover which of your symptoms are related to perimenopause and what they mean.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 bg-[#A7C4A0]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#A7C4A0" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-3 text-[#5D4154]">Track Your Changes</h3>
              <p className="text-gray-600">Monitor your hormonal transition with personalized tracking tools.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="h-12 w-12 bg-[#A7C4A0]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#A7C4A0" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-3 text-[#5D4154]">Find Relief</h3>
              <p className="text-gray-600">Get personalized recommendations to manage your symptoms effectively.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#5D4154] text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 Peritrack. All rights reserved.</p>
          <p className="text-sm opacity-70 mt-2">Supporting women through perimenopause and beyond.</p>
        </div>
      </footer>
    </div>
  );
}
