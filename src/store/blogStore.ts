import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string;
  date: string;
  status: 'draft' | 'published';
  excerpt: string;
  comments?: number;
}

// Initial data from the existing blog
const initialBlogPosts: BlogPost[] = [
  {
    id: "exploring-korea",
    title: "Exploring Korea: A Journey Through Tradition, Tech, and Taste",
    slug: "exploring-korea",
    imageUrl: "/lovable-uploads/9e702ff5-79a9-4f0a-87cc-6321ce202520.png",
    date: "August 25, 2024",
    status: 'published',
    content: "Day 1: Arrival In Seoul We reached Incheon Airport at 2 pm. Our mentor, Min Jae Kim, welcomed us warmly. The airport is strategically positioned...",
    excerpt: "Day 1: Arrival In Seoul We reached Incheon Airport at 2 pm. Our mentor, Min Jae Kim, welcomed us warmly. The airport is strategically positioned..."
  },
  {
    id: "dubai-robotics-competition",
    title: "From Circuitry to Souks: My Dubai Robotics Competition Experience",
    slug: "dubai-robotics-competition",
    imageUrl: "/lovable-uploads/8becc6bf-0cf8-454b-9262-3189afaa46a4.png",
    date: "June 17, 2024",
    status: 'published',
    content: "About the Contest Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet,",
    excerpt: "About the Contest Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet,"
  },
  {
    id: "wordpress-site-development",
    title: "WordPress Site Development with techy theme",
    slug: "wordpress-site-development",
    imageUrl: "/lovable-uploads/ab3b8695-e4f7-4e9e-8b80-951baa334acb.png",
    date: "March 16, 2024",
    status: 'published',
    content: "Add Your Heading Text Here Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    excerpt: "Add Your Heading Text Here Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
  }
];

// Create a blog store hook
export const useBlogStore = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      try {
        const parsedPosts = JSON.parse(storedPosts);
        // Validate that parsedPosts is an array
        if (Array.isArray(parsedPosts)) {
          // Validate each post has required fields
          const validPosts = parsedPosts.filter(post => 
            post && 
            typeof post.id === 'string' &&
            typeof post.title === 'string' &&
            typeof post.slug === 'string' &&
            typeof post.content === 'string' &&
            typeof post.date === 'string' &&
            typeof post.status === 'string' &&
            ['published', 'draft'].includes(post.status)
          );
          
          if (validPosts.length > 0) {
            setPosts(validPosts);
          } else {
            throw new Error('No valid posts found in storage');
          }
        } else {
          throw new Error('Invalid posts data format');
        }
      } catch (error) {
        console.error('Error loading blog posts:', error);
        localStorage.removeItem('blogPosts');
        setPosts(initialBlogPosts);
        toast.error('Error loading saved posts. Using default posts instead.');
      }
    } else {
      setPosts(initialBlogPosts);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever posts change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('blogPosts', JSON.stringify(posts));
      } catch (error) {
        console.error('Error saving blog posts:', error);
        toast.error('Failed to save posts to storage');
      }
    }
  }, [posts, isLoaded]);

  // Function to add a new post
  const addPost = (post: Omit<BlogPost, 'id' | 'date'>) => {
    try {
      const newPost: BlogPost = {
        ...post,
        id: post.slug,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      };

      setPosts((currentPosts) => [...currentPosts, newPost]);
      toast.success(`Post "${post.title}" ${post.status === 'published' ? 'published' : 'saved as draft'}`);
      return newPost;
    } catch (error) {
      console.error('Error adding post:', error);
      toast.error('Failed to add post');
      throw error;
    }
  };

  // Function to update an existing post
  const updatePost = (id: string, updatedPost: Partial<BlogPost>) => {
    try {
      setPosts((currentPosts) => 
        currentPosts.map((post) => 
          post.id === id ? { ...post, ...updatedPost } : post
        )
      );
      toast.success(`Post "${updatedPost.title || ''}" updated`);
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post');
      throw error;
    }
  };

  // Function to delete a post
  const deletePost = (id: string) => {
    try {
      setPosts((currentPosts) => currentPosts.filter((post) => post.id !== id));
      toast.success('Post deleted');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
      throw error;
    }
  };

  // Function to get a single post
  const getPost = (id: string): BlogPost | undefined => {
    try {
      return posts.find((post) => post.id === id);
    } catch (error) {
      console.error('Error getting post:', error);
      return undefined;
    }
  };

  // Generate excerpt from content
  const generateExcerpt = (content: string, maxLength = 150): string => {
    // Remove any HTML tags
    let plainText = content.replace(/<[^>]+>/g, '');
    
    if (plainText.length <= maxLength) return plainText;
    
    // Truncate and add ellipsis
    return plainText.substring(0, maxLength - 3) + '...';
  };

  return {
    posts,
    addPost,
    updatePost,
    deletePost,
    getPost,
    generateExcerpt,
  };
};
