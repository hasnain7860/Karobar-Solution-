"use client";
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
// Note: Client component mein Registry direct import karna parega ya API se lena parega
// Abhi ke liye hum registry ka logic simulate kar rahe hain
import { postRegistry } from '../data/postRegistry';

export default function BlogListingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Registry ko array mein convert karein
  const posts = Object.entries(postRegistry).map(([slug, data]) => ({
    slug,
    ...data
  }));

  // Filtering Logic
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || post.category?.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const categories = ['all', 'tips', 'stories', 'features'];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-4">Karobar Knowledge Hub</h1>
          <p className="text-slate-600">Apne business ko digital karne ke tips aur success stories.</p>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 justify-between items-center">
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold capitalize transition-all ${
                  activeFilter === cat ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col h-full">
                <div className="h-48 bg-slate-200 relative">
                   <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest">
                     {post.category || 'Karobar'}
                   </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>READ MORE →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400">Koi post nahi mili. Kuch aur search karein.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

