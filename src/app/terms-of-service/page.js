import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Terms of Service | Karobar Solution",
};

export default function TermsOfService() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-slate max-w-none text-slate-700 space-y-6">
            <p className="text-lg font-medium">Karobar Solution use karne se pehle in sharaait (Terms) ko parh lein.</p>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">1. Subscription & Payments</h2>
              <p>
                Karobar Solution ek paid software hai. Aap ko mahana (monthly) ya salana (yearly) fees ada karni hogi. Fees time par ada na karne ki soorat mein hum aap ka account temporary block karne ka haq rakhte hain.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">2. Account Security</h2>
              <p>
                Apna Password aur Login details mehfooz rakhna aap ki zimmedari hai. Agar aap apna password kisi aur ko dete hain aur wo data delete kar deta hai, to Karobar Solution is ka zimmedar nahi hoga.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">3. Limitation of Liability</h2>
              <p>
                Hum poori koshish karte hain ke software 24/7 chale. Lekin technical masail, internet ki kharabi, ya bijli jane ki wajah se agar aap ke karobar mein koi nuqsan hota hai, to Karobar Solution us maali nuqsan ka zimmedar nahi hoga.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">4. Prohibited Usage</h2>
              <p>
                Is software ko kisi bhi ghair-qanooni (illegal) karobar ya activity ke liye use karna mana hai. Aisi soorat mein account foran ban kar diya jaye ga.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">5. Updates</h2>
              <p>
                Hum waqt ke sath naye features add karte rehte hain. Terms of Service kabhi bhi update ho sakti hain.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

