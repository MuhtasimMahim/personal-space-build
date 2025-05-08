
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogStore, BlogPost } from "@/store/blogStore";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { PencilIcon, TrashIcon, EyeIcon } from "lucide-react";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";

const AdminBlogPosts = () => {
  const { posts, deletePost } = useBlogStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  
  // Filter posts based on search term
  const filteredPosts = posts.filter(
    post => post.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    deletePost(id);
    setPostToDelete(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-cyan">Blog Posts</h1>
        <Button 
          onClick={() => navigate("/admin/posts/new")}
          className="bg-cyan hover:bg-cyan/80"
        >
          New Post
        </Button>
      </div>
      
      <div className="mb-6">
        <Input 
          placeholder="Search posts..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#1a1a1a] border-gray-700 max-w-md"
        />
      </div>
      
      <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-[#222] border-b border-gray-800">
              <TableHead className="text-gray-300">Title</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead className="text-gray-300">Date</TableHead>
              <TableHead className="text-gray-300 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <TableRow 
                  key={post.id} 
                  className="hover:bg-[#222] border-b border-gray-800"
                >
                  <TableCell>
                    <span className="font-medium">{post.title}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                      post.status === 'published' 
                        ? 'bg-cyan/20 text-cyan' 
                        : 'bg-amber-500/20 text-amber-500'
                    }`}>
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate(`/blog/${post.id}`)}
                        title="View Post"
                        className="h-8 w-8 p-0"
                      >
                        <EyeIcon size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate(`/admin/posts/edit/${post.id}`)}
                        title="Edit Post"
                        className="h-8 w-8 p-0 text-cyan"
                      >
                        <PencilIcon size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setPostToDelete(post)}
                        title="Delete Post"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                      >
                        <TrashIcon size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  {search ? 'No posts match your search' : 'No posts found. Create your first post!'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={postToDelete !== null}
        onOpenChange={(open) => !open && setPostToDelete(null)}
      >
        <AlertDialogContent className="bg-[#1a1a1a] border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the post "{postToDelete?.title}".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-gray-700">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => postToDelete && handleDelete(postToDelete.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdminBlogPosts;
