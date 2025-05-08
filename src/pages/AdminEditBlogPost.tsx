
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogStore, BlogPost } from "@/store/blogStore";
import { toast } from "@/components/ui/sonner";
import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { EyeIcon, PencilIcon, ImageIcon } from "lucide-react";

const AdminEditBlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { getPost, addPost, updatePost, generateExcerpt } = useBlogStore();
  const navigate = useNavigate();
  const previewWindowRef = useRef<Window | null>(null);

  // Get existing post if editing
  const existingPost = id ? getPost(id) : undefined;
  const isEditMode = !!existingPost;

  // Form state
  const [title, setTitle] = useState(existingPost?.title || "");
  const [slug, setSlug] = useState(existingPost?.slug || "");
  const [content, setContent] = useState(existingPost?.content || "");
  const [imageUrl, setImageUrl] = useState(existingPost?.imageUrl || "");
  const [isPublished, setIsPublished] = useState(existingPost?.status === "published");

  // Preview window management
  useEffect(() => {
    return () => {
      // Close preview window when component unmounts
      if (previewWindowRef.current && !previewWindowRef.current.closed) {
        previewWindowRef.current.close();
      }
    };
  }, []);

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    // Only auto-generate slug if it's a new post or the slug hasn't been manually edited
    if (!isEditMode || slug === generateSlug(title)) {
      setSlug(generateSlug(newTitle));
    }
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>): Promise<string> => {
    return new Promise((resolve, reject) => {
      const file = e.target.files?.[0];
      if (!file) {
        reject("No file selected");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        resolve(imageDataUrl);
      };
      reader.onerror = () => reject("Error reading file");
      reader.readAsDataURL(file);
    });
  };

  // Handle featured image upload
  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const imageDataUrl = await handleImageUpload(e);
      setImageUrl(imageDataUrl);
    } catch (error) {
      toast.error("Failed to upload image");
      console.error("Image upload error:", error);
    }
  };

  // Save post
  const handleSavePost = () => {
    if (!title || !slug || !content) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Generate excerpt from content
    const excerpt = generateExcerpt(content);
    const postStatus = isPublished ? "published" as const : "draft" as const;

    try {
      if (isEditMode && existingPost) {
        updatePost(existingPost.id, {
          title,
          slug,
          content,
          imageUrl,
          excerpt,
          status: postStatus
        });
        navigate("/admin/posts");
      } else {
        const newPost = addPost({
          title,
          slug,
          content,
          imageUrl,
          excerpt,
          status: postStatus
        });
        navigate("/admin/posts");
      }
    } catch (error) {
      toast.error("Failed to save post");
      console.error("Save error:", error);
    }
  };

  // Preview post
  const handlePreviewPost = () => {
    const previewPost: BlogPost = {
      id: existingPost?.id || slug,
      title,
      slug,
      content,
      imageUrl,
      date: existingPost?.date || new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      status: "draft",
      excerpt: generateExcerpt(content)
    };

    // Store preview data in localStorage
    localStorage.setItem('previewPost', JSON.stringify(previewPost));

    // Open preview in new window
    const previewWindow = window.open(`/blog/${previewPost.id}?preview=true`, '_blank');
    if (previewWindow) previewWindowRef.current = previewWindow;
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-cyan">
          {isEditMode ? "Edit Post" : "Create New Post"}
        </h1>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handlePreviewPost}
            className="border-gray-700 hover:bg-gray-800 gap-2"
          >
            <EyeIcon size={16} />
            Preview
          </Button>
          <Button onClick={handleSavePost} className="bg-cyan hover:bg-cyan/80">
            {isPublished ? "Publish" : "Save Draft"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Post title"
              className="bg-[#1a1a1a] border-gray-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="post-url-slug"
              className="bg-[#1a1a1a] border-gray-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <RichTextEditor
              initialValue={content}
              onChange={setContent}
              onImageUpload={handleImageUpload}
            />
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Published</Label>
                  <Switch
                    id="published"
                    checked={isPublished}
                    onCheckedChange={setIsPublished}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Featured Image</Label>
                  <div className="mt-1">
                    {imageUrl ? (
                      <div className="relative group">
                        <img
                          src={imageUrl}
                          alt="Featured"
                          className="w-full h-40 object-cover rounded-md border border-gray-700"
                        />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            onClick={() => document.getElementById('featuredImage')?.click()}
                            className="text-white hover:bg-black/30"
                          >
                            Change Image
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-40 bg-[#0c0f16] border border-dashed border-gray-700 rounded-md cursor-pointer hover:bg-[#121620] transition-colors" onClick={() => document.getElementById('featuredImage')?.click()}>
                        <div className="text-center">
                          <ImageIcon className="mx-auto text-gray-400" />
                          <p className="mt-2 text-sm text-gray-400">
                            Click to upload image
                          </p>
                        </div>
                      </div>
                    )}
                    <input
                      type="file"
                      id="featuredImage"
                      accept="image/*"
                      onChange={handleFeaturedImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button onClick={handleSavePost} className="bg-cyan hover:bg-cyan/80 w-full">
              {isEditMode ? "Update" : "Save"} {isPublished ? "& Publish" : "Draft"}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/posts")}
              className="border-gray-700 hover:bg-gray-800"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEditBlogPost;
