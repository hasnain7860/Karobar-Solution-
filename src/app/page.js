import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SocialProof from "./components/SocialProof";
import ProblemSolution from "./components/ProblemSolution";
import Industries from "./components/Industries"; 
import Features from "./components/Features";
import DetailedFeatures from "./components/DetailedFeatures"; 
import HowItWorks from "./components/HowItWorks"; 
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Script id="schema-software" type="application/ld+json">
        {`
{
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Karobar Solution",
    "operatingSystem": "Windows, Android, Web",
    "applicationCategory": "BusinessApplication",
    "description": "Pakistan's #1 Wholesale POS Software. Manage Stock, Udhaar, and Profit offline.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "4" // Tumhare 4 clients
    },
    "offers": {
      "@type": "Offer",
      "price": "2000", 
      "priceCurrency": "PKR"
    },
    "author": {
      "@type": "Organization",
      "name": "Karobar Solution",
      "url": "https://karobarsolution.com"
    }
  };
        `}
      </Script>

      <main className="min-h-screen flex flex-col relative bg-slate-50">
        <Navbar />
        
        {/* 1. Hero Section */}
        <Hero />
        
        {/* 2. Trust Section */}
        <SocialProof />
        
        {/* 3. Comparison Section */}
        <ProblemSolution />
        
        {/* 4. Target Audience (NEW) */}
        <Industries />
        
        {/* 5. Main Visual Features */}
        <Features />
        
        {/* 6. Comprehensive Feature List (NEW) */}
        <DetailedFeatures />
        
        {/* 7. Process Steps (NEW) */}
        <HowItWorks />
        
        {/* 8. Pricing Section */}
        <Pricing />
        
        {/* 9. FAQs */}
        <FAQ />
        
        {/* 10. Contact Section */}
        <Contact />
        
        <Footer />
        
        {/* Floating Elements */}
        <FloatingWhatsApp />
      </main>
    </>
  );
}



