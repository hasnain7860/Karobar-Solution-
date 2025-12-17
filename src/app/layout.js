import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Karobar Solution | Pakistan's #1 Wholesale POS Software",
  description: "Internet ke baghair chalne wala wahid software. Stock, Udhaar, aur Munafa ka 100% accurate hisaab.",
  
  // Icons setup
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', type: 'image/png' },
      { url: '/favicon-16x16.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',

  // OpenGraph (Social Media Share)
  openGraph: {
    title: "Karobar Solution - Munafa Barhao",
    description: "Stock aur Udhaar ka hisaab rakhna ab asaan.",
    url: "https://karobarsolution.com",
    siteName: "Karobar Solution",
    locale: "en_PK",
    type: "website",
    images: [
      {
        url: '/opengraph-image.png', // Jo image hum ne banayi thi
        width: 1200,
        height: 630,
        alt: 'Karobar Solution Dashboard Preview',
      },
    ],
  },

  // --- Search Engine Verification ---
  verification: {
    // Yahan apna Google code paste karna hai (HTML Tag wala)
    google: 'g8ooE2PvtiVaqJxsCSR-RFoixVhFoaKGQhk9JBl4Cgk', 
  },
  // ---------------------------------
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Step 2: GTM Script (Head Code) - Ye Next.js khud Head mein inject karega */}
            <head>
               <link rel="icon" href="/favicon.ico" sizes="any" />
         
                   <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> 
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WLTNLLQT');
        `}
      </Script>
</head>
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        {/* Step 3: GTM NoScript (Body Code) - Ye body ke bilkul shuru mein */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WLTNLLQT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}

