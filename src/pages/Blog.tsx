
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBlogStore } from "@/store/blogStore";

const Blog = () => {
  const isMobile = useIsMobile();
  const { posts } = useBlogStore();
  
  // Only show published posts on the public blog page
  const publishedPosts = posts.filter(post => post.status === "published");
  
  return (
    <div className="min-h-screen bg-[#0c0f16] text-white">
      <Sidebar />
      <Navbar />
      
      <div className={`${isMobile ? '' : 'ml-[172px]'} pt-20 px-6 md:px-10 lg:px-16`}>
        <div className="max-w-7xl mx-auto">
          <section className="py-10">
            <h1 className="text-cyan text-6xl font-bold mb-16 text-center">Blog</h1>
            
            {publishedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {publishedPosts.map((post) => (
                  <div key={post.id} className="bg-[#1a1a1a] rounded-lg overflow-hidden animate-fade-in">
                    <Link to={`/blog/${post.id}`}>
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-52 object-cover hover:opacity-90 transition-opacity"
                      />
                    </Link>
                    <div className="p-6">
                      <Link to={`/blog/${post.id}`}>
                        <h3 className="text-cyan text-2xl mb-2 hover:text-opacity-80 transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <div className="text-[#888888] text-sm mb-4">
                        {post.date}
                      </div>
                      <p className="text-gray-300 mb-4">
                        {post.excerpt}
                      </p>
                      <Link 
                        to={`/blog/${post.id}`}
                        className="text-cyan hover:text-opacity-80 transition-colors"
                      >
                        Read More »
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-16">
                <p className="text-xl">No blog posts published yet.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Blog;
