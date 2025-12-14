import { Phone, Mail, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <section className="py-20 bg-slate-900 text-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Hum Se Raabta Karein</h2>
          <p className="text-slate-400">Koi sawal? Koi pareshani? Hum hazir hain.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* WhatsApp Card */}
          <a 
            href="https://wa.me/923314460028" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-green-500 transition-all hover:bg-slate-800/80"
          >
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
            <p className="text-slate-300 font-mono text-lg">+92 331 4460028</p>
            <span className="text-xs text-green-400 mt-2 block opacity-0 group-hover:opacity-100 transition-opacity">Abhi Message Karein &rarr;</span>
          </a>

          {/* Call Card */}
          <a 
            href="tel:+923314460028"
            className="group bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-indigo-500 transition-all hover:bg-slate-800/80"
          >
            <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Phone className="w-8 h-8 text-indigo-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Call Karein</h3>
            <p className="text-slate-300 font-mono text-lg">+92 331 4460028</p>
            <span className="text-xs text-indigo-400 mt-2 block opacity-0 group-hover:opacity-100 transition-opacity">Abhi Call Milayein &rarr;</span>
          </a>

          {/* Email Card */}
          <a 
            href="mailto:contact@karobarsolution.com"
            className="group bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all hover:bg-slate-800/80"
          >
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <p className="text-slate-300 text-sm sm:text-base">contact@karobarsolution.com</p>
            <span className="text-xs text-blue-400 mt-2 block opacity-0 group-hover:opacity-100 transition-opacity">Email Likhein &rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}

