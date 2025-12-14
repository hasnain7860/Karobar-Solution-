import { MessageCircle, Settings, TrendingUp } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Humein WhatsApp Karein",
      desc: "Register button dhoondne ki zaroorat nahi. Bas humein message karein, hum aap ki zaroorat samjhenge.",
      icon: MessageCircle,
      color: "bg-green-600"
    },
    {
      title: "Hum Account Setup Karenge",
      desc: "Hum aap ke liye fully configured account banayen ge aur aap ki Gmail par connect kar denge.",
      icon: Settings,
      color: "bg-indigo-600"
    },
    {
      title: "Login Karein aur Cha Jayen",
      desc: "Aap ko tayyar ID/Password mile ga. Bas login karein aur pehla bill banayen.",
      icon: TrendingUp,
      color: "bg-blue-600"
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Shuru Karne Ka Tareeqa (3 Steps)</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Hum jante hain aap masroof hain. Is liye technical kaam hum khud karte hain, aap sirf karobar karein.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-700 -z-10"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center">
              <div className={`w-24 h-24 ${step.color} rounded-full flex items-center justify-center mb-6 shadow-lg shadow-black/50 border-4 border-slate-800 z-10`}>
                <step.icon className="w-10 h-10 text-white" />
              </div>
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 w-full hover:bg-slate-750 transition-colors h-full">
                <div className="inline-block px-3 py-1 bg-slate-900 rounded-full text-xs font-bold text-slate-400 mb-3">
                  Step {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
            <a 
                href="https://wa.me/923314460028"
                className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-all hover:scale-105 shadow-lg"
            >
                <MessageCircle className="w-5 h-5 mr-2" />
                Abhi Account Banwayen
            </a>
        </div>
      </div>
    </section>
  );
}


