import { notFound } from "next/navigation";
import { postRegistry } from "../../data/postRegistry.js";

 
// SEO Metadata automatically handle hogi yahan se
export async function generateMetadata({ params }) {

  const p  = await params;
  
  
  const slug = p.slug
  console.log(slug)
  console.log(postRegistry[slug])
  const post = postRegistry[slug];

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Karobar Solution`,
    description: post.description,
  };
}

export default async function BlogSlugPage({ params }) {
    const p  = await params;
  
  
  const slug = p.slug
  const postData = postRegistry[slug];

  if (!postData) {
    notFound(); // Agar slug registry mein nahi hai
  }

  // Registry se component nikal kar render karein
  const BlogPostComponent = postData.component;

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <BlogPostComponent />
      
      {/* Universal CTA - Jo har post ke neechay hona chahiye */}
      <div className="mt-12 p-8 bg-slate-900 text-white rounded-2xl text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to upgrade your Karobar?</h2>
        <button className="bg-blue-600 px-6 py-2 rounded-lg font-semibold">
          Get Started Now
        </button>
      </div>
    </article>
  );
}

