import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MessageCircle, Mail, Phone } from "lucide-react";

export const metadata = {
  title: "Support Center | Karobar Solution",
};

export default function Support() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Hum Aap Ki Madad Ke Liye Hazir Hain</h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            Koi takleef? Koi sawal? Hamari support team se raabta karein.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            
            {/* WhatsApp Card */}
            <a 
              href="https://wa.me/923314460028"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-green-500 hover:shadow-md transition-all group"
            >
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">WhatsApp Support</h3>
              <p className="text-slate-500 mb-4">Sab se tez jawab ke liye.</p>
              <span className="text-green-600 font-bold">Chat Now &rarr;</span>
            </a>

            {/* Email Card */}
            <a 
              href="mailto:contact@karobarsolution.com"
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all group"
            >
              <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Email Support</h3>
              <p className="text-slate-500 mb-4">Official queries ke liye.</p>
              <span className="text-indigo-600 font-bold">Email Us &rarr;</span>
            </a>

          </div>

          <div className="mt-16 bg-white p-8 rounded-2xl border border-slate-200 text-left">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Troubleshooting</h3>
            <ul className="space-y-4 text-slate-600">
              <li className="flex items-start">
                <span className="mr-3 text-indigo-600 font-bold">1.</span>
                <span><strong>App load nahi ho rahi?</strong> Apna internet connection check karein aur page refresh karein.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-indigo-600 font-bold">2.</span>
                <span><strong>Bill print nahi ho raha?</strong> Check karein ke Thermal Printer Bluetooth se connect hai ya nahi.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-indigo-600 font-bold">3.</span>
                <span><strong>Password bhool gaye?</strong> Login page par "Forgot Password" par click karein.</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

