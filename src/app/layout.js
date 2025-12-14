import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Karobar Solution | Pakistan's #1 Wholesale POS Software",
  description: "Internet ke baghair chalne wala wahid software. Stock, Udhaar, aur Munafa ka 100% accurate hisaab.",
  
  // --- Yahan Icons add karo ---
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', type: 'image/png' },
      { url: '/favicon-16x16.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon.png',
      },
    ],
  },
  manifest: '/site.webmanifest', // Mobile users ke liye zaroori hai
  // ---------------------------

  openGraph: {
    title: "Karobar Solution - Munafa Barhao",
    description: "Stock aur Udhaar ka hisaab rakhna ab asaan.",
    url: "https://karobarsolution.com",
    siteName: "Karobar Solution",
    locale: "en_PK",
    type: "website",
    // Images wala hissa neeche explain kiya hai
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        {children}
      </body>
    </html>
  );
}


