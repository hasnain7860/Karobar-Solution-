import { X, CheckCircle2 } from "lucide-react";

export default function ProblemSolution() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Purana Register Choriye, Smart Baniye.</h2>
          <p className="mt-4 text-slate-600">Kab tak parchiuon mein dimaagh khapayein ge?</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* The Problem (Old Way) */}
            <div className="p-8 bg-red-50/30 border-b md:border-b-0 md:border-r border-slate-100">
              <h3 className="text-xl font-bold text-red-700 mb-6 flex items-center">
                <span className="mr-2 text-2xl">❌</span> Purana Register System
              </h3>
              <ul className="space-y-4">
                {[
                  "Raat ko 2 ghante hisaab milana parta hai.",
                  "Stock ginne ke liye dukan band karni parti hai.",
                  "Parchi kho gayi to Udhaar mar gaya.",
                  "Internet band to kaam band."
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-slate-700">
                    <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
  
            {/* The Solution (New Way) */}
            <div className="p-8 bg-green-50/30">
               <h3 className="text-xl font-bold text-green-700 mb-6 flex items-center">
                <span className="mr-2 text-2xl">✅</span> Karobar Solution App
              </h3>
              <ul className="space-y-4">
                {[
                  "Din khatam hotay hi 1-Click Closing Report.",
                  "Chalti dukan mein Stock Audit karein.",
                  "Mobile toot jaye, Data Cloud pe mehfooz hai.",
                  "Offline Mode: Bina Internet ke bill banayen."
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}