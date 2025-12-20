import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function BlogLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Breadcrumbs for SEO */}
      <div className="bg-slate-50 border-b border-slate-100 mt-20">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-blue-600">Blog</Link>
          <span>/</span>
          <span className="text-slate-900 truncate">Post</span>
        </div>
      </div>

      {children}

      {/* Internal Linking / Recommended Posts Placeholder */}
      <section className="bg-slate-50 py-16 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Mazeed Business Tips Chahiye?</h2>
          <Link href="/blog" className="inline-block bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all">
            Poora Blog Dekhein
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

