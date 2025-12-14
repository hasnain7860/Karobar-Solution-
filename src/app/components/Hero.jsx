// WhatsApp Logo Component
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Hero() {
  return (
    <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-b from-indigo-50 via-white to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* H1 Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
          Kya Aap Ka <span className="text-indigo-600">Munafa (Profit)</span> Stock Gum Honay Ki Wajah Se Kam Ho Raha Hai?
        </h1>

        {/* Subheading */}
        <p className="mt-4 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          Pakistan ka wahid software jo <span className="font-bold text-slate-900 bg-yellow-100 px-1">Internet ke baghair</span> chalta hai aur aap ke <span className="font-bold text-slate-900">Stock + Udhaar</span> ka 100% accurate hisaab rakhta hai.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <a
            href="https://wa.me/923314460028?text=Salam!%20Mujhe%20Karobar%20Solution%20ka%20Free%20Demo%20chahiye."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl text-white bg-green-600 hover:bg-green-700 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <WhatsAppIcon />
            FREE Demo Book Karein
          </a>
        </div>

        {/* Mobile Mockup - WITH VIDEO */}
        <div className="relative mx-auto w-[280px] sm:w-[320px]">
          {/* Outer Frame (Border) */}
          <div className="relative rounded-[2rem] bg-slate-900 p-2 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-900/10">
            
            {/* Screen Area - Notch Removed */}
            <div className="relative rounded-[1.5rem] overflow-hidden bg-slate-800 aspect-[9/19] flex items-center justify-center">
              
              {/* VIDEO TAG INSTEAD OF IMAGE */}
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                poster="/images/dashboard.png" // Video load hone se pehle ye image dikhegi
              >
                {/* Make sure file exists in public/videos/demo-scroll.mp4 */}
                <source src="/videos/demo-scroll.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

            </div>
          </div>
          
          {/* Decorative Glow */}
          <div className="absolute top-10 -right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-10 -left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>

      </div>
    </section>
  );
}


