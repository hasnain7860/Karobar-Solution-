import { ShoppingBag, Wrench, Smartphone, Pill, ShoppingCart, Zap } from "lucide-react";

export default function Industries() {
  const industries = [
    { name: "General Wholesale", icon: ShoppingCart },
    { name: "Mobile & Electronics", icon: Smartphone },
    { name: "Spare Parts / Autos", icon: Wrench },
    { name: "Medical / Pharmacy", icon: Pill },
    { name: "Garments / Shoes", icon: ShoppingBag },
    { name: "Hardware & Tools", icon: Zap },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Kya Ye Mere Business Ke Liye Hai?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Karobar Solution har us business ke liye perfect hai jahan Stock aur Udhaar ka kaam hota hai.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {industries.map((industry, index) => (
            <div key={index} className="flex flex-col items-center p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all cursor-default">
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-indigo-600">
                <industry.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800">{industry.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

