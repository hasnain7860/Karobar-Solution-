import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          
          {/* Logo in Footer */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
             <div className="relative h-14 w-64 mb-4 mx-auto md:mx-0">
                <Image
                  src="/images/logo-white.png" // White Text Logo
                  alt="Karobar Solution"
                  fill
                  className="object-contain object-left" 
                />
             </div>
              <p className="text-slate-400 text-sm mt-3 max-w-xs leading-relaxed">
                Pakistani wholesalers aur retailers ke liye behtareen business partner. Munafa barhao, pareshani ghatao.
              </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-slate-400 justify-center font-medium">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/support" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center md:text-left text-white text-sm">
          <p>&copy; {new Date().getFullYear()} Karobar Solution. All rights reserved. Made with ❤️ in Pakistan.</p>
        </div>
      </div>
    </footer>
  );
}


