import { Database, Users, BarChart3, CheckCircle2, ArrowRight } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Stock Management",
      desc: "Register par kaat-chaat khatam. Apni dukan ka poora stock digital karein. Low stock aur expiry ka foran pata karein.",
      points: ["Low Stock Alerts", "Expiry Date Tracking", "Fast Product Search"],
      icon: Database,
      color: "text-blue-600",
      bg: "bg-blue-50",
      gradient: "from-blue-50 to-blue-100",
      border: "border-blue-200",
      reverse: false, 
    },
    {
      title: "Udhaar / Ledger Khata",
      desc: "Parchi kho gayi to paise gaye? Ab nahi. Har customer ka hisaab Cloud par mehfooz hai. Aik click par purana bill nikalain.",
      points: ["Auto-Calculation", "WhatsApp Reminder", "Customer History"],
      icon: Users,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      gradient: "from-indigo-50 to-indigo-100",
      border: "border-indigo-200",
      reverse: true, 
    },
    {
      title: "Profit & Loss Reports",
      desc: "Andazon par karobar na karein. Rozana shaam ko check karein ke aaj asal mein kitna 'Munafa' hua aur kitna 'Nuqsan'.",
      points: ["Daily / Monthly Reports", "Expense Tracking", "Sales Summary"],
      icon: BarChart3,
      color: "text-green-600",
      bg: "bg-green-50",
      gradient: "from-green-50 to-green-100",
      border: "border-green-200",
      reverse: false, 
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Sirf Software Nahi, <span className="text-indigo-600">Munafa Machine.</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Har feature aap ke business ko tez, asaan aur mehfooz banane ke liye design kiya gaya hai.
          </p>
        </div>

        {/* Features List (Zig-Zag Layout with Abstract Cards) */}
        <div className="space-y-24">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${feature.reverse ? 'lg:flex-row-reverse' : ''}`}
            >
              
              {/* Text Side */}
              <div className="flex-1 text-center lg:text-left">
                <div className={`inline-flex items-center justify-center p-3 rounded-xl ${feature.bg} ${feature.color} mb-6`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {feature.desc}
                </p>
                
                <ul className="space-y-3 inline-block text-left mb-8">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-center text-slate-700 font-medium">
                      <CheckCircle2 className={`w-5 h-5 mr-3 ${feature.color}`} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual Side (Abstract Art Placeholder) */}
              <div className="flex-1 w-full relative">
                <div className={`relative rounded-3xl overflow-hidden shadow-sm border ${feature.border} bg-gradient-to-br ${feature.gradient} aspect-video flex items-center justify-center group`}>
                  
                  {/* Floating Big Icon (Abstract) */}
                  <feature.icon className={`w-32 h-32 ${feature.color} opacity-10 transform group-hover:scale-110 transition-transform duration-700`} />
                  
                  {/* Decorative Pattern Circles */}
                  <div className={`absolute top-10 right-10 w-20 h-20 ${feature.color.replace('text-', 'bg-')} opacity-5 rounded-full blur-2xl`}></div>
                  <div className={`absolute bottom-10 left-10 w-32 h-32 ${feature.color.replace('text-', 'bg-')} opacity-5 rounded-full blur-3xl`}></div>

                  {/* "Coming Soon" Badge (Optional - removes awkwardness) */}
                  <div className="absolute bottom-6 right-6">
                     <span className={`text-xs font-bold uppercase tracking-wider ${feature.color} opacity-60 bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm`}>
                        Live Demo Coming Soon
                     </span>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


