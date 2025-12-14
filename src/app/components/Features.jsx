import Image from "next/image";
import { Database, Users, BarChart3 } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Stock Management",
      desc: "Kon si item khatam ho rahi hai, aur kon si expiry ke qareeb hai—foran pata karein.",
      icon: Database,
      image: "/images/product-list.png", // Make sure this image exists
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Udhaar / Ledger",
      desc: "Kis se kitna lena hai aur kis ko kitna dena hai. Sab kuch aap ki ungliyon par.",
      icon: Users,
      image: "/images/ledger.png", // Make sure this image exists
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Profit / Loss",
      desc: "Aaj kitna kamaya? Asal munafa janiye, andazon pe business na karein.",
      icon: BarChart3,
      image: "/images/reports.png", // Make sure this image exists
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Sirf Software Nahi, Munafa Barhanay Ki Machine.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
              
              {/* Screenshot Area */}
              <div className="relative h-56 bg-slate-100 border-b border-slate-100 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}