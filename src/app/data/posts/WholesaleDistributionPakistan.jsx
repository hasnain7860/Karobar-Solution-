import Image from "next/image";

export default function WholesaleDistributionPakistan() {
  return (
    <section className="max-w-4xl mx-auto py-10 px-4 md:px-0">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
          Pindi Gheb aur Fateh Jang ke Wholesalers ke Liye 2025 ka Behtreen Software
        </h1>
        <div className="flex items-center gap-4 text-slate-500 text-sm font-bold uppercase tracking-wider">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded">Latest Guide 2025</span>
          <span>•</span>
          <span>By Karobar Team</span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="space-y-8 text-lg text-slate-700 leading-relaxed">
        <p>
          Bhai, seedhi si baat hai. Agar aap Pindi Gheb ya Fateh Jang mein wholesale ki dukan chala rahe hain, to aapko pata hoga ke shaam ko register le kar baithna kitna bara azaab hai. Kabhi stock poora nahi nikalta, to kabhi udhaar ka hisab galat ho jata hai. 
        </p>
        
        <p>
          2025 mein bhi agar aap purane tareeqon pe chal rahe hain, to aap apna waqt aur munafa dono zaya kar rahe hain. <strong>Karobar Solution</strong> ko hum ne isi liye banaya hai taake aik aam dukan-dar bhi baghair kisi computer course ke apna poora karobar digital kar sakay.
        </p>

        {/* Local Social Proof Section */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl my-12 border-l-8 border-blue-600">
          <h2 className="text-2xl font-bold text-white mb-4 italic">Ground Reality: 4 Kamyab Business Owners</h2>
          <p className="mb-4 text-slate-300">
            Hum hawa mein baatein nahi karte. Abhi hamare paas 4 live clients hain jo is software ko din raat use kar rahe hain:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">✓</span> 
              <span><strong>Fateh Jang:</strong> 1 Wholesale dealer jo stock matching ki wajah se pareshan thay, ab unka 100% accurate record hai.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">✓</span> 
              <span><strong>Pindi Gheb:</strong> 3 Clients (Retail aur Wholesale) jo pehle udhaar ke liye registers ke panna palat-te thay, ab sirf client ka naam likhte hain aur poora ledger samne aa jata hai.</span>
            </li>
          </ul>
        </div>

        <h2 className="text-3xl font-bold text-slate-900 mt-12">Software dhoondte waqt log ghalti kahan karte hain?</h2>
        <p>
          Aksar log Google par search karte hain <em>"Free software for wholesale business"</em>. Bhai, muft ka software aapka data aur aapka waqt dono tabaah kar sakta hai. Jab aapka internet chala jata hai ya light band hoti hai, to ye online software dhappa kar jate hain.
        </p>
        
        <p>
          <strong>Karobar Solution</strong> ki sab se bari khoobi ye hai ke ye <strong>Internet ke baghair</strong> chalta hai. Aapka data aapke computer mein safe rehta hai. Jab internet aye ga, tab backup ban jaye ga, lekin aapki billing nahi rukegi.
        </p>

        {/* Responsive Image Container for Mobile Screenshot */}
        <div className="my-16 flex flex-col items-center">
          <div className="relative w-full max-w-[350px] aspect-[9/19] rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.1)] border-[8px] border-slate-800">
            <Image 
              src="/images/dashboard.png" 
              alt="Karobar Solution Mobile View Dashboard"
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="mt-6 text-sm text-slate-500 text-center max-w-sm">
            Hum ne interface itna simple rakha hai ke aap mobile se bhi apna munafa dekh sakte hain. (Original Dashboard Preview)
          </p>
        </div>

        <h2 className="text-2xl font-bold text-slate-900">Is Software mein aapko kya milega?</h2>
        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="font-black text-blue-600 mb-2 uppercase text-xs tracking-widest">Inventory Control</h4>
            <p className="text-sm">Stock kab khatam hona hai aur kis item mein sab se zyada munafa hai, ye sab aapko dashboard pe dikhay ga.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="font-black text-blue-600 mb-2 uppercase text-xs tracking-widest">Customer Ledger</h4>
            <p className="text-sm">Pindi Gheb ki market mein udhaar hi sab kuch hai. Har customer ka alag khata aur recovery alerts.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="font-black text-blue-600 mb-2 uppercase text-xs tracking-widest">Expense Tracking</h4>
            <p className="text-sm">Dukan ke bijli ke bill se le kar chaye ke kharche tak, har cheez ka hisab.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="font-black text-blue-600 mb-2 uppercase text-xs tracking-widest">Offline Power</h4>
            <p className="text-sm">Load shedding ki fikar khatam. Database aapki hard drive pe hai, kisi cloud ki zarurat nahi.</p>
          </div>
        </div>

        <p className="pt-6 border-t border-slate-100">
          Agar aap Pindi Gheb ya Fateh Jang ke area mein hain aur apne karobar ko barhana chahte hain, to hamare un 4 kamyab dukan-daron ki tarah aaj hi step uthayein. 2025 technology ka saal hai, purane registers ko jalayein nahi, bas unhein archive kar dein!
        </p>
      </div>

      {/* Localized CTA */}
      <div className="mt-16 p-10 bg-green-50 rounded-[2.5rem] border border-green-100 flex flex-col items-center text-center">
        <h3 className="text-2xl md:text-3xl font-black text-green-900 mb-4">
          Free Demo Chahiye? Pindi Gheb mein hum khud aa kar setup dikha sakte hain!
        </h3>
        <p className="text-green-700 mb-8 max-w-md">
          Hamari team aapke area mein active hai. Bas WhatsApp par message karein aur apne karobar ko sakoon mein layein.
        </p>
        <a 
          href="https://wa.me/923314460028"
          className="bg-green-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-green-700 transition-all shadow-lg hover:shadow-green-200"
        >
          WHATSAPP PE RABTA KAREIN
        </a>
      </div>
    </section>
  );
}

