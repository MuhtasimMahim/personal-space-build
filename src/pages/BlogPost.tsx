import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

// This data would typically come from a database or CMS
const blogPostData = {
  "exploring-korea": {
    title: "Exploring Korea: A Journey Through Tradition, Tech, and Taste",
    date: "August 25, 2024",
    mainImage: "/lovable-uploads/9e702ff5-79a9-4f0a-87cc-6321ce202520.png",
    content: [
      {
        type: "heading",
        content: "Day 1: Arrival In Seoul"
      },
      {
        type: "paragraph",
        content: "We reached Incheon Airport at 2 pm. Our mentor, Min Jae Kim, welcomed us warmly. The airport is strategically positioned and serves as a major hub for international travel in East Asia. After clearing immigration and collecting our luggage, we headed straight to our accommodations in Seoul."
      },
      {
        type: "image",
        url: "/lovable-uploads/9e702ff5-79a9-4f0a-87cc-6321ce202520.png",
        caption: "Group photo at Incheon Airport"
      },
      {
        type: "heading",
        content: "Day 2: Orientation and Connection"
      },
      {
        type: "paragraph",
        content: "Our day began with an orientation session where we met our fellow participants from various countries. We shared our expectations and aspirations for the program. The organizers outlined the itinerary and key learning objectives. Following orientation, we had our first Korean lunch together, experiencing the rich flavors of traditional dishes like Bibimbap and Kimchi."
      },
      {
        type: "image",
        url: "/lovable-uploads/ab3b8695-e4f7-4e9e-8b80-951baa334acb.png",
        caption: "Group orientation session"
      },
      {
        type: "heading",
        content: "Day 3: Project Development"
      },
      {
        type: "paragraph",
        content: "Today was dedicated to our main project work. We were divided into small teams and assigned specific challenges related to sustainable urban development. Our team focused on creating a smart waste management system that could be implemented in Seoul's busy districts. We brainstormed ideas, conducted initial research, and started mapping out our technical approach."
      },
      {
        type: "image",
        url: "/lovable-uploads/8becc6bf-0cf8-454b-9262-3189afaa46a4.png",
        caption: "Teams working on project development"
      },
      {
        type: "heading",
        content: "Day 4: Field Trip and Tech Lab"
      },
      {
        type: "paragraph",
        content: "We visited Samsung's Innovation Museum, where we explored the history of electronic innovations and got a glimpse of future technologies. The interactive exhibits were particularly engaging, allowing us to experience virtual reality, artificial intelligence applications, and next-generation display technologies firsthand. Later, we participated in a workshop at a local tech hub where we learned about Korea's startup ecosystem."
      },
      {
        type: "image",
        url: "/lovable-uploads/9e702ff5-79a9-4f0a-87cc-6321ce202520.png",
        caption: "At Samsung's Innovation Museum"
      },
      {
        type: "heading",
        content: "Day 5: Submission, Evaluation, and Victory"
      },
      {
        type: "paragraph",
        content: "The final day of our project work was intense as we raced against time to complete our prototypes and presentations. Each team had 15 minutes to present their solution to a panel of judges comprising industry experts and academics. Our smart waste management system received positive feedback for its practicality and scalability. The evaluation criteria included innovation, feasibility, potential impact, and presentation quality."
      },
      {
        type: "paragraph",
        content: "To our delight, our team was awarded first place in the competition! The judges commended our comprehensive approach that combined IoT sensors, data analytics, and community engagement strategies. The prize included a monetary award, certificates, and an opportunity to present our idea to Seoul's municipal officials for potential implementation."
      },
      {
        type: "paragraph",
        content: "The award ceremony was followed by a celebratory dinner where we exchanged contacts with other participants and discussed possibilities for future collaborations. This victory was not just about winning a competition; it represented the culmination of our hard work, cross-cultural collaboration, and the valuable skills we had developed throughout the program."
      },
      {
        type: "image",
        url: "/lovable-uploads/ab3b8695-e4f7-4e9e-8b80-951baa334acb.png",
        caption: "Our team receiving the award"
      },
      {
        type: "heading",
        content: "Day 6: Cultural Impacts, Goodbye and Shopping"
      },
      {
        type: "paragraph",
        content: "On our final full day in Korea, we had the morning free to explore Seoul at our own pace. Some of us visited palaces and temples, while others preferred shopping districts like Myeongdong and Dongdaemun. I chose to visit Gyeongbokgung Palace, the main royal palace of the Joseon dynasty, where I was captivated by the traditional architecture and learned more about Korean history."
      },
      {
        type: "paragraph",
        content: "In the afternoon, we all gathered for a cultural workshop where we tried on Hanbok (traditional Korean attire), learned basic Korean calligraphy, and participated in a traditional tea ceremony. This immersive experience gave us deeper insights into Korean cultural heritage and values."
      },
      {
        type: "image",
        url: "/lovable-uploads/8becc6bf-0cf8-454b-9262-3189afaa46a4.png",
        caption: "Shopping at Myeongdong"
      },
      {
        type: "heading",
        content: "Day 7: Departure"
      },
      {
        type: "paragraph",
        content: "As we prepared to leave, there was a mixture of emotions – satisfaction from all that we had accomplished, gratitude for the friendships formed, and a touch of sadness that our journey was ending. At the farewell breakfast, we exchanged small gifts and promised to stay in touch. Our mentor, Min Jae, accompanied us to the airport, ensuring that our departure was as smooth as our arrival."
      },
      {
        type: "paragraph",
        content: "This week-long program in Korea was transformative in many ways. Beyond the technical knowledge gained and the project success, the cross-cultural experiences and connections made have left an indelible mark. As our plane took off from Incheon Airport, I looked down at Seoul's sprawling landscape, carrying with me memories, insights, and inspirations that would continue to influence my personal and professional journey ahead."
      },
      {
        type: "image",
        url: "/lovable-uploads/9e702ff5-79a9-4f0a-87cc-6321ce202520.png",
        caption: "Final group photo before departure"
      }
    ],
    relatedPosts: [
      {
        id: "dubai-robotics-competition",
        title: "From Circuitry to Souks: My Dubai Robotics Competition Experience",
        imageUrl: "/lovable-uploads/8becc6bf-0cf8-454b-9262-3189afaa46a4.png"
      },
      {
        id: "wordpress-site-development",
        title: "WordPress Site Development with techy theme",
        imageUrl: "/lovable-uploads/ab3b8695-e4f7-4e9e-8b80-951baa334acb.png"
      }
    ]
  },
  // Other blog posts would be defined similarly
};

const BlogPost = () => {
  const { postId } = useParams<{postId: string}>();
  const isMobile = useIsMobile();
  
  const post = postId ? blogPostData[postId as keyof typeof blogPostData] : null;
  
  if (!post) {
    return (
      <div className="min-h-screen bg-[#0c0f16] text-white">
        <Sidebar />
        <Navbar />
        <div className={`${isMobile ? '' : 'ml-[172px]'} pt-20 px-6 md:px-10 lg:px-16`}>
          <div className="max-w-4xl mx-auto py-10 text-center">
            <h1 className="text-cyan text-4xl font-bold mb-6">Blog Post Not Found</h1>
            <p className="mb-6">Sorry, the blog post you're looking for doesn't exist.</p>
            <Link to="/blog">
              <Button variant="outline" className="border border-cyan text-cyan hover:bg-cyan hover:text-black transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#0c0f16] text-white">
      <Sidebar />
      <Navbar />
      
      <div className={`${isMobile ? '' : 'ml-[172px]'} pt-20 px-6 md:px-10 lg:px-16`}>
        <div className="max-w-4xl mx-auto py-10">
          <Link to="/blog" className="inline-flex items-center text-cyan mb-8 hover:text-opacity-80 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
          
          <h1 className="text-cyan text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <div className="text-[#888888] text-sm mb-8">{post.date}</div>
          
          <img 
            src={post.mainImage} 
            alt={post.title} 
            className="w-full h-auto mb-8 rounded-lg"
          />
          
          <div className="prose prose-invert max-w-none">
            {post.content.map((section, index) => {
              if (section.type === "heading") {
                return (
                  <h2 key={index} className="text-cyan text-2xl md:text-3xl font-bold mt-8 mb-4">
                    {section.content}
                  </h2>
                );
              } else if (section.type === "paragraph") {
                return (
                  <p key={index} className="text-gray-300 mb-6 leading-relaxed">
                    {section.content}
                  </p>
                );
              } else if (section.type === "image") {
                return (
                  <div key={index} className="mb-8">
                    <img 
                      src={section.url} 
                      alt={section.caption || ''} 
                      className="w-full h-auto rounded-lg"
                    />
                    {section.caption && (
                      <div className="text-[#888888] text-sm mt-2 text-center">
                        {section.caption}
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
          
          <div className="mt-16">
            <h3 className="text-cyan text-2xl font-bold mb-6">Related Posts</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {post.relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id} 
                  to={`/blog/${relatedPost.id}`}
                  className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                >
                  <img 
                    src={relatedPost.imageUrl} 
                    alt={relatedPost.title} 
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-cyan text-lg">{relatedPost.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="mt-16">
            <h3 className="text-cyan text-2xl font-bold mb-6">Leave a Reply</h3>
            <textarea 
              className="w-full bg-[#1a1a1a] border border-[#333333] rounded-lg p-4 text-white mb-4"
              rows={6}
              placeholder="Write your comment here..."
            ></textarea>
            <Button className="bg-cyan text-black hover:bg-cyan/80">Submit Comment</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
