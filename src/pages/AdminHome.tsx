
import React from "react";
import { useNavigate } from "react-router-dom";
import { useBlogStore } from "@/store/blogStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PencilIcon, BookIcon } from "lucide-react";

const AdminHome = () => {
  const { posts } = useBlogStore();
  const navigate = useNavigate();
  
  const publishedPosts = posts.filter((post) => post.status === "published");
  const draftPosts = posts.filter((post) => post.status === "draft");
  
  const recentPosts = [...posts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 5);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-cyan">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-400 text-sm font-normal">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{posts.length}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-400 text-sm font-normal">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-cyan">{publishedPosts.length}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-400 text-sm font-normal">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-500">{draftPosts.length}</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Posts</h2>
          <Button 
            variant="outline" 
            onClick={() => navigate("/admin/posts")}
            className="text-sm border-gray-700 hover:bg-gray-800"
          >
            View All
          </Button>
        </div>
        
        {recentPosts.length > 0 ? (
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden">
            <div className="divide-y divide-gray-800">
              {recentPosts.map((post) => (
                <div key={post.id} className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium hover:text-cyan cursor-pointer" onClick={() => navigate(`/admin/posts/edit/${post.id}`)}>
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                      {post.status === "published" ? (
                        <><BookIcon size={14} className="text-cyan" /> Published</>
                      ) : (
                        <><PencilIcon size={14} className="text-amber-500" /> Draft</>
                      )}
                      <span className="mx-2">•</span>
                      {post.date}
                    </p>
                  </div>
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/admin/posts/edit/${post.id}`)}
                    className="hover:bg-gray-800 text-cyan"
                  >
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-400">No posts yet. Create your first post!</p>
        )}
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={() => navigate("/admin/posts/new")} 
          className="bg-cyan hover:bg-cyan/80"
        >
          Create New Post
        </Button>
      </div>
    </>
  );
};

export default AdminHome;
