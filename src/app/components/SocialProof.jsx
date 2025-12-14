export default function SocialProof() {
    return (
      <section className="py-10 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">
            In jaisay samajhdaar tajir hum par bharosa karte hain:
          </p>
          
          {/* Logos / Business Names */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-xl md:text-2xl font-black text-slate-700">Ma Trader</span>
            <span className="text-xl md:text-2xl font-black text-slate-700">Bismillah Electronics</span>
            <span className="text-xl md:text-2xl font-black text-slate-700">Naseeb Traders</span>
            <span className="text-xl md:text-2xl font-black text-slate-700">Saqib Wholesale</span>
          </div>
  
          {/* Testimonial */}
          <div className="mt-10 max-w-3xl mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <blockquote className="text-lg text-slate-700 italic">
              "Jab se Karobar Solution lagaya hai, mujhe dukan pe hona zaroori nahi. Main ghar baith kar mobile pe sale check kar leta hoon. Sukoon ho gaya hai."
            </blockquote>
            <div className="mt-4 font-bold text-slate-900">— Sheikh Adnan, Ma Trader (Pindigheb)</div>
          </div>
        </div>
      </section>
    );
  }