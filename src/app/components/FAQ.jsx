"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import Script from 'next/script';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl bg-white mb-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <button 
        className="w-full py-5 px-6 flex justify-between items-center text-left focus:outline-none bg-white hover:bg-slate-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-bold text-slate-800 pr-4 flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-indigo-500 shrink-0 hidden sm:block" />
            {question}
        </span>
        {isOpen ? <ChevronUp className="text-indigo-600 w-5 h-5 flex-shrink-0" /> : <ChevronDown className="text-slate-400 w-5 h-5 flex-shrink-0" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 pt-2 text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed text-base">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function FAQ() {
  const faqs = [
    {
      q: "Kya mera Karobar ka Data mehfooz hai? Kya aap mera Munafa dekh sakte hain?",
      a: "Aap ka data 100% mehfooz hai. Hum Google Firebase Enterprise Cloud use karte hain jo Banks level ki security deta hai. Aap ka Stock, Sale aur Munafa (Profit) sirf AAP ke pass show hota hai. Hamari team ko bhi aap ke andarun-e-khata (internal data) tak rasai nahi hoti."
    },
    {
      q: "Agar Internet chala jaye to kya dukaan band ho jaye gi?",
      a: "Bilkul nahi. Karobar Solution 'Offline-First' technology par bana hai. Aap bina internet ke bill banayein, stock check karein. Jaise hi internet wapis ayega, data khud-ba-khud Cloud par save (Backup) ho jaye ga. Aap ka kaam kabhi nahi rukega."
    },
    {
      q: "Mere staff ko computer chalana nahi ata, kya wo ye use kar sakenge?",
      a: "Jee haan. Hum ne isay 'WhatsApp' se bhi zyada asaan banaya hai. Agar aap ka salesman mobile use kar sakta hai, to wo ye software bhi chala sakta hai. Hum poori training video aur live support bhi dete hain."
    },
    {
      q: "Kya mujhe naya Computer ya Laptop khareedna pare ga?",
      a: "Zaroori nahi. Ye software aap ke purane Laptop, PC, Tablet, ya Mobile par bhi chal jata hai. Bhaari hardware ki zaroorat nahi hai. Sirf Google Chrome browser hona chahiye."
    },
    {
      q: "Agar staff ghalti se sara Udhaar ya Stock delete kar de to?",
      a: "Hum ne 'Staff Lock' feature diya hai. Aap apne staff ko sirf 'Bill Bananay' ki ijazat de sakte hain. Wo purana data delete nahi kar sakte aur na hi Reports dekh sakte hain. Maalik (Admin) ke pass full control hota hai."
    },
    {
      q: "Payment ka kya tareeqa hai?",
      a: "Aap EasyPaisa, JazzCash, ya Bank Transfer ke zariye mahana fees ada kar sakte hain. Koi hidden charges nahi hain."
    },
    {
      q: "Kya main baad mein apna Data Excel mein nikal sakta hoon?",
      a: "Jee haan, kisi bhi waqt. Aap apna poora Customer Ledger, Stock List, aur Sales Report aik click par Excel ya PDF mein download kar sakte hain."
    }
  ];

  // Prepare JSON-LD Schema for Google SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Inject Schema into Head */}
        <Script id="faq-schema" type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </Script>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Aam Poochay Jane Walay Sawalat (FAQ)</h2>
          <p className="text-slate-500">
            Agar aap ka sawal yahan nahi hai, to humein WhatsApp par message karein.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}


