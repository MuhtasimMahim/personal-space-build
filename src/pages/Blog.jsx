
import { useState } from "react";
import { Link, useRoute } from "../contexts/RouteContext";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const blogPosts = [
  {
    id: "exploring-korea",
    title: "Exploring Korea: A Journey Through Tradition, Tech, and Taste",
    imageUrl: "/lovable-uploads/9e702ff5-79a9-4f0a-87cc-6321ce202520.png",
    date: "August 25, 2024",
    comments: 0,
    excerpt: "Day 1: Arrival In Seoul We reached Incheon Airport at 2 pm. Our mentor, Min Jae Kim, welcomed us warmly. The airport is strategically positioned..."
  },
  {
    id: "dubai-robotics-competition",
    title: "From Circuitry to Souks: My Dubai Robotics Competition Experience",
    imageUrl: "/lovable-uploads/8becc6bf-0cf8-454b-9262-3189afaa46a4.png",
    date: "June 17, 2024",
    comments: 0,
    excerpt: "About the Contest Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet,"
  },
  {
    id: "wordpress-site-development",
    title: "WordPress Site Development with techy theme",
    imageUrl: "/lovable-uploads/ab3b8695-e4f7-4e9e-8b80-951baa334acb.png",
    date: "March 16, 2024",
    comments: 0,
    excerpt: "Add Your Heading Text Here Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
  }
];

const Blog = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-[#0c0f16] text-white">
      <Sidebar />
      <Navbar />
      
      <div className={`${isMobile ? '' : 'ml-[172px]'} pt-20 px-6 md:px-10 lg:px-16`}>
        <div className="max-w-7xl mx-auto">
          <section className="py-10">
            <h1 className="text-cyan text-6xl font-bold mb-16 text-center">Blog</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
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
                      {post.date} • {post.comments === 0 ? "No Comments" : `${post.comments} Comments`}
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
          </section>
        </div>
      </div>
    </div>
  );
};

export default Blog;
