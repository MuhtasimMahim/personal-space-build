
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Link as LinkIcon
} from "lucide-react";

interface RichTextEditorProps {
  initialValue?: string;
  onChange: (content: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<string>;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue = "",
  onChange,
  onImageUpload
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(initialValue);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialValue;
    }
  }, [initialValue]);

  // Update parent component when content changes
  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      onChange(newContent);
    }
  };

  // Execute command on the editor
  const execCommand = (command: string, value: string | boolean = false) => {
    document.execCommand(command, false, value as string);
    handleContentChange();
    editorRef.current?.focus();
  };

  // Insert heading tags
  const insertHeading = (level: number) => {
    const selection = window.getSelection();
    
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      
      // Create heading element
      const headingElement = document.createElement(`h${level}`);
      headingElement.textContent = selectedText;
      
      // Replace the selected text with the heading element
      range.deleteContents();
      range.insertNode(headingElement);
      
      // Move cursor to the end of the heading
      selection.collapseToEnd();
    }
    
    handleContentChange();
    editorRef.current?.focus();
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const imageUrl = await onImageUpload(e);
      if (imageUrl) {
        execCommand('insertHTML', `<img src="${imageUrl}" alt="Blog image" class="my-4 rounded max-w-full" />`);
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  // Insert link
  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-[#0c0f16]">
      <div className="bg-[#1a1a1a] border-b border-gray-700 p-2 flex flex-wrap gap-1">
        <div className="flex items-center space-x-1 mr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => insertHeading(1)}
            title="Heading 1"
            className="h-8 w-8 p-0"
          >
            <Heading1 size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => insertHeading(2)}
            title="Heading 2"
            className="h-8 w-8 p-0"
          >
            <Heading2 size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => insertHeading(3)}
            title="Heading 3"
            className="h-8 w-8 p-0"
          >
            <Heading3 size={16} />
          </Button>
        </div>
        
        <div className="border-l border-gray-700 h-8 mx-2" />
        
        <div className="flex items-center space-x-1 mr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => execCommand("bold")}
            title="Bold"
            className="h-8 w-8 p-0"
          >
            <Bold size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => execCommand("italic")}
            title="Italic"
            className="h-8 w-8 p-0"
          >
            <Italic size={16} />
          </Button>
        </div>
        
        <div className="border-l border-gray-700 h-8 mx-2" />
        
        <div className="flex items-center space-x-1 mr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => execCommand("insertUnorderedList")}
            title="Bullet List"
            className="h-8 w-8 p-0"
          >
            <List size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => execCommand("insertOrderedList")}
            title="Numbered List"
            className="h-8 w-8 p-0"
          >
            <ListOrdered size={16} />
          </Button>
        </div>
        
        <div className="border-l border-gray-700 h-8 mx-2" />
        
        <div className="flex items-center space-x-1 mr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => execCommand("justifyLeft")}
            title="Align Left"
            className="h-8 w-8 p-0"
          >
            <AlignLeft size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => execCommand("justifyCenter")}
            title="Align Center"
            className="h-8 w-8 p-0"
          >
            <AlignCenter size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => execCommand("justifyRight")}
            title="Align Right"
            className="h-8 w-8 p-0"
          >
            <AlignRight size={16} />
          </Button>
        </div>
        
        <div className="border-l border-gray-700 h-8 mx-2" />
        
        <div className="flex items-center space-x-1">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            title="Insert Image"
            className="h-8 w-8 p-0"
          >
            <ImageIcon size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={insertLink}
            title="Insert Link"
            className="h-8 w-8 p-0"
          >
            <LinkIcon size={16} />
          </Button>
        </div>
      </div>
      
      <div
        ref={editorRef}
        className="p-4 min-h-[300px] text-white focus:outline-none"
        contentEditable
        onInput={handleContentChange}
        onBlur={handleContentChange}
      />
    </div>
  );
};

export default RichTextEditor;
