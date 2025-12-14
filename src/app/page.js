import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SocialProof from "./components/SocialProof";
import ProblemSolution from "./components/ProblemSolution";
import Industries from "./components/Industries"; // NEW
import Features from "./components/Features";
import DetailedFeatures from "./components/DetailedFeatures"; // NEW
import HowItWorks from "./components/HowItWorks"; // NEW
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
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web, Windows, Android",
            "description": "Best POS and Inventory management software for Pakistani wholesalers. Works offline.",
            "offers": {
              "@type": "Offer",
              "price": "2000",
              "priceCurrency": "PKR"
            }
          }
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


