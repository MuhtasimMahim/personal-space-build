
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { BlogPost as BlogPostType } from "@/store/blogStore";

const BlogPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';
  const isMobile = useIsMobile();
  
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPost = () => {
      setIsLoading(true);
      
      try {
        // Check if this is a preview
        if (isPreview) {
          const previewData = localStorage.getItem('previewPost');
          if (previewData) {
            const previewPost = JSON.parse(previewData);
            if (previewPost.id === postId) {
              setPost(previewPost);
              setIsLoading(false);
              return;
            }
          }
        }
        
        // Otherwise load from the blog posts in localStorage
        const storedPosts = localStorage.getItem('blogPosts');
        if (storedPosts) {
          const allPosts: BlogPostType[] = JSON.parse(storedPosts);
          const foundPost = allPosts.find(p => p.id === postId);
          
          if (foundPost) {
            setPost(foundPost);
          } else {
            // Fallback to hardcoded posts if not found
            const fallbackPosts: BlogPostType[] = [
              {
                id: "exploring-korea",
                title: "Exploring Korea: A Journey Through Tradition, Tech, and Taste",
                slug: "exploring-korea",
                imageUrl: "/lovable-uploads/9e702ff5-79a9-4f0a-87cc-6321ce202520.png",
                date: "August 25, 2024",
                comments: 0,
                content: "Day 1: Arrival In Seoul We reached Incheon Airport at 2 pm. Our mentor, Min Jae Kim, welcomed us warmly. The airport is strategically positioned...",
                excerpt: "Day 1: Arrival In Seoul We reached Incheon Airport at 2 pm. Our mentor, Min Jae Kim, welcomed us warmly. The airport is strategically positioned...",
                status: "published" as "published" | "draft"
              },
              {
                id: "dubai-robotics-competition",
                title: "From Circuitry to Souks: My Dubai Robotics Competition Experience",
                slug: "dubai-robotics-competition",
                imageUrl: "/lovable-uploads/8becc6bf-0cf8-454b-9262-3189afaa46a4.png",
                date: "June 17, 2024",
                comments: 0,
                content: "About the Contest Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet,",
                excerpt: "About the Contest Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet,",
                status: "published" as "published" | "draft"
              },
              {
                id: "wordpress-site-development",
                title: "WordPress Site Development with techy theme",
                slug: "wordpress-site-development",
                imageUrl: "/lovable-uploads/ab3b8695-e4f7-4e9e-8b80-951baa334acb.png",
                date: "March 16, 2024",
                comments: 0,
                content: "Add Your Heading Text Here Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
                excerpt: "Add Your Heading Text Here Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
                status: "published" as "published" | "draft"
              }
            ];
            
            const fallbackPost = fallbackPosts.find(p => p.id === postId);
            setPost(fallbackPost || null);
          }
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPost();
  }, [postId, isPreview]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0c0f16] text-white flex items-center justify-center">
        <div className="animate-pulse">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0c0f16] text-white flex items-center justify-center">
        <div className="text-xl">Post not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0f16] text-white">
      {isPreview && (
        <div className="fixed top-0 left-0 right-0 bg-amber-500 text-black py-2 px-4 text-center z-50">
          Preview Mode - This is how your post will look when published
        </div>
      )}
      
      {!isPreview && (
        <>
          <Sidebar />
          <Navbar />
        </>
      )}
      
      <div className={`${isPreview ? 'pt-12' : isMobile ? 'pt-20' : 'pt-20 ml-[172px]'} px-6 md:px-10 lg:px-16`}>
        <div className="max-w-4xl mx-auto">
          <article className="py-10">
            <h1 className="text-cyan text-4xl md:text-5xl font-bold mb-6">{post?.title}</h1>
            
            <div className="text-[#888888] text-sm mb-8">
              {post?.date} • {post?.status === 'draft' ? "(Draft)" : ""}
            </div>
            
            {post?.imageUrl && (
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8"
              />
            )}
            
            <div 
              className="prose prose-invert max-w-none prose-headings:text-cyan prose-a:text-cyan hover:prose-a:text-cyan/80"
              dangerouslySetInnerHTML={{ __html: post?.content || "" }}
            />
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
