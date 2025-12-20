import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="text-center md:text-left">
             <div className="relative h-14 w-64 mb-4 mx-auto md:mx-0">
                <Image src="/images/logo-white.png" alt="Karobar Solution" fill className="object-contain object-left" />
             </div>
              <p className="text-slate-400 text-sm mt-3 max-w-xs leading-relaxed">
                Pakistani wholesalers aur retailers ke liye behtareen business partner.
              </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h4 className="font-bold text-lg mb-2">Important Links</h4>
            <Link href="/blog" className="text-slate-400 hover:text-white transition-colors">Business Blog</Link>
            <Link href="/blog?filter=stories" className="text-slate-400 hover:text-white transition-colors">Success Stories</Link>
            <Link href="/support" className="text-slate-400 hover:text-white transition-colors">Technical Support</Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h4 className="font-bold text-lg mb-2">Legal</h4>
            <Link href="/privacy-policy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Karobar Solution. Made with ❤️ in Pakistan.</p>
        </div>
      </div>
    </footer>
  );
}

