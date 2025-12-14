import { Check, ShieldCheck, Database, Zap, PhoneCall } from "lucide-react";

export default function Pricing() {
  return (
    <section className="py-20 bg-indigo-50" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Apni Zaroorat Ke Mutabiq Package Chunain</h2>
        <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
            Choti dukan ho ya bara warehouse, hamare paas sab ke liye hal maujood hai.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* Package 1: Starter */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
                <div className="p-8">
                    <h3 className="text-xl font-bold text-slate-900">Starter (Choti Dukan)</h3>
                    <p className="text-sm text-slate-500 mt-2">Retailers ke liye behtareen</p>
                    <div className="my-6">
                        <span className="text-4xl font-extrabold text-slate-900">Rs. 2,000</span>
                        <span className="text-slate-500">/Month</span>
                    </div>
                    <ul className="space-y-4 text-left text-sm mb-8">
                        <li className="flex items-start"><Check className="w-5 h-5 text-green-500 mr-2 shrink-0" /> Unlimited Products</li>
                        <li className="flex items-start"><Check className="w-5 h-5 text-green-500 mr-2 shrink-0" /> 1 User Login</li>
                        <li className="flex items-start"><Check className="w-5 h-5 text-green-500 mr-2 shrink-0" /> Online/Offline Mode</li>
                        <li className="flex items-start"><Check className="w-5 h-5 text-green-500 mr-2 shrink-0" /> Basic Reports</li>
                        <li className="flex items-start"><Check className="w-5 h-5 text-green-500 mr-2 shrink-0" /> WhatsApp Support</li>
                    </ul>
                    <a href="https://wa.me/923314460028?text=I+want+Starter+Package" className="block w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg transition-colors">
                        Select Starter
                    </a>
                </div>
            </div>

            {/* Package 2: Professional (Highlighted) */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-indigo-600 transform md:-translate-y-4 relative">
                <div className="bg-indigo-600 text-white text-xs font-bold uppercase tracking-wide py-1 text-center">
                    Most Popular
                </div>
                <div className="p-8">
                    <h3 className="text-2xl font-bold text-slate-900">Wholesaler Pro</h3>
                    <p className="text-sm text-slate-500 mt-2">Serious karobar ke liye</p>
                    <div className="my-6">
                        <span className="text-5xl font-extrabold text-indigo-600">Rs. 3,500</span>
                        <span className="text-slate-500">/Month</span>
                    </div>
                    <ul className="space-y-4 text-left text-sm mb-8">
                        <li className="flex items-start"><Check className="w-5 h-5 text-indigo-600 mr-2 shrink-0" /> <strong>Unlimited Users & Staff</strong></li>
                        <li className="flex items-start"><Check className="w-5 h-5 text-indigo-600 mr-2 shrink-0" /> <strong>1GB Cloud Storage</strong> (5 Lakh Bills)</li>
                        <li className="flex items-start"><Check className="w-5 h-5 text-indigo-600 mr-2 shrink-0" /> Advanced Profit/Loss Reports</li>
                        <li className="flex items-start"><Check className="w-5 h-5 text-indigo-600 mr-2 shrink-0" /> Priority WhatsApp Support</li>
                        {/* THE KILLER FEATURE */}
                        <li className="flex items-start bg-yellow-50 p-2 rounded-lg border border-yellow-100">
                            <Zap className="w-5 h-5 text-yellow-600 mr-2 shrink-0" /> 
                            <span className="font-semibold text-slate-800">New Feature on Demand</span>
                        </li>
                    </ul>
                    <a href="https://wa.me/923314460028?text=I+want+Pro+Package" className="block w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors shadow-lg">
                        Get Pro Package
                    </a>
                </div>
            </div>

            {/* Package 3: Custom / Enterprise */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
                <div className="p-8">
                    <h3 className="text-xl font-bold text-slate-900">Custom / LifeTime</h3>
                    <p className="text-sm text-slate-500 mt-2">Bari agencies aur distributors</p>
                    <div className="my-6">
                        <span className="text-3xl font-bold text-slate-900">Call Us</span>
                    </div>
                    <ul className="space-y-4 text-left text-sm mb-8">
                        <li className="flex items-start"><Check className="w-5 h-5 text-slate-400 mr-2 shrink-0" /> Dedicated Server Setup</li>
                        <li className="flex items-start"><Check className="w-5 h-5 text-slate-400 mr-2 shrink-0" /> Custom App Branding</li>
                        <li className="flex items-start"><Check className="w-5 h-5 text-slate-400 mr-2 shrink-0" /> Full Team Training</li>
                        <li className="flex items-start"><Check className="w-5 h-5 text-slate-400 mr-2 shrink-0" /> 24/7 Dedicated Manager</li>
                        <li className="flex items-start"><Check className="w-5 h-5 text-slate-400 mr-2 shrink-0" /> One-Time Payment Option</li>
                    </ul>
                    <a href="https://wa.me/923314460028?text=I+need+Custom+Package" className="block w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg transition-colors">
                        <PhoneCall className="w-4 h-4 inline mr-2" />
                        Call for Price
                    </a>
                </div>
            </div>

        </div>
        
        {/* Money Back Guarantee */}
        <div className="mt-12 inline-flex items-center justify-center bg-green-50 px-6 py-3 rounded-full border border-green-100">
             <ShieldCheck className="w-5 h-5 text-green-600 mr-2" />
             <span className="text-green-800 font-medium">30 Din Money Back Guarantee. Agar pasand na aaye to paise wapis.</span>
        </div>
      </div>
    </section>
  );
}


