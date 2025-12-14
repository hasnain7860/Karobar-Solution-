import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Privacy Policy | Karobar Solution",
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
          <p className="text-slate-500 mb-8">Last Updated: December 14, 2025</p>

          <div className="prose prose-slate max-w-none text-slate-700 space-y-6">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">1. Aap Ka Data, Aap Ki Milkiyat</h2>
              <p>
                Karobar Solution par jo bhi data (Products, Sales, Customers) aap enter karte hain, wo 100% aap ki milkiyat (property) hai. Hum aap ka data kisi teesri party ko nahi bechte.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">2. Data Kahan Store Hota Hai?</h2>
              <p>
                Hum <strong>Google Firebase</strong> aur <strong>Cloud Firestore</strong> use karte hain jo ke duniya ke sab se mehfooz servers maane jate hain. Data encrypted form mein hota hai.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">3. Hum Kon Si Maloomat Lete Hain?</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Account Registration ke liye Phone Number aur Email.</li>
                <li>App chalane ke liye Device Information (Mobile Model, OS Version).</li>
                <li>Usage Statistics (taake hum software ko behtar bana sakein).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">4. Data Deletion (Account Khatam Karna)</h2>
              <p>
                Agar aap kabhi bhi Karobar Solution chorna chahein, to aap humein request kar sakte hain. Hum 48 ghanton ke andar aap ka sara data apne servers se mukammal delete kar denge.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2">5. Contact Us</h2>
              <p>
                Agar aap ko privacy ke hawalay se koi sawal hai, to humein email karein: <a href="mailto:contact@karobarsolution.com" className="text-indigo-600 font-bold">contact@karobarsolution.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

