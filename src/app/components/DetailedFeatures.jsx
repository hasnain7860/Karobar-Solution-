import { CheckCircle2, Zap, PenTool } from "lucide-react";

export default function DetailedFeatures() {
  const features = [
    "Barcode Scanning Support",
    "Thermal Printer (58mm / 80mm) Support",
    "Profit & Loss Reports (Rozana/Mahana)",
    "Customer Udhaar Khata (Ledger)",
    "Supplier / Vendor Management",
    "Expense Tracking (Chaye/Pani ka kharcha)",
    "Low Stock Alerts",
    "Multi-User (Staff Login)",
    "Mobile & Laptop Dono Pe Chalay",
    "PDF Invoice Share (WhatsApp)",
    "Excel Import / Export",
    "Urdu & English Language Support"
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Sirf Software Nahi, Service Bhi!</h2>
          <p className="text-slate-600">
            Ek mukammal system jo aap ki dukan ki har zaroorat poori kare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Feature on Demand Highlight */}
            <div className="col-span-1 md:col-span-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 text-center md:text-left">
                    <h3 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
                        <Zap className="w-6 h-6 text-yellow-300" />
                        Koi Naya Feature Chahiye?
                    </h3>
                    <p className="text-indigo-100 mt-2 max-w-2xl">
                        Dusre software wale kehte hain "Ye mumkin nahi". Hum kehte hain "Ho jaye ga".
                        Agar aap ko koi khaas feature chahiye, humari team **Priority** par update kare gi.
                    </p>
                </div>
                <div className="shrink-0">
                    <span className="inline-flex items-center px-6 py-3 border border-white/30 bg-white/10 rounded-lg backdrop-blur-sm font-semibold text-white">
                        <PenTool className="w-5 h-5 mr-2" />
                        Custom Development Included
                    </span>
                </div>
            </div>
        </div>

        {/* Regular Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center p-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-slate-700 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


