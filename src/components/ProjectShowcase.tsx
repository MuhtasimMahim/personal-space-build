
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProjectItemProps {
  title: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
}

const ProjectItem = ({ title, description, imageUrl, websiteUrl }: ProjectItemProps) => {
  return (
    <div className="flex flex-col items-center max-w-xl mx-auto animate-fade-in">
      <img 
        src={imageUrl}
        alt={title}
        className="w-full object-cover rounded-lg shadow-lg mb-6"
      />
      <h3 className="text-cyan text-3xl font-bold text-center">{title}</h3>
      <p className="text-white mt-4 mb-6 text-center">{description}</p>
      <Link to={websiteUrl} target="_blank" rel="noopener noreferrer">
        <Button 
          variant="outline" 
          className="border border-cyan text-cyan hover:bg-cyan hover:text-black transition-colors"
        >
          VISIT WEBSITE
        </Button>
      </Link>
    </div>
  );
};

const ProjectShowcase = () => {
  return (
    <div className="py-16">
      <h2 className="text-cyan text-4xl md:text-5xl font-bold mb-16 text-center">Project Showcase</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <ProjectItem 
          title="drmcitclub.com" 
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
          imageUrl="/lovable-uploads/bd87bd03-9505-4532-b9ec-6e5c39a0df57.png"
          websiteUrl="https://drmcitclub.com"
        />
        <ProjectItem 
          title="drmcitclub.com" 
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
          imageUrl="/lovable-uploads/bd87bd03-9505-4532-b9ec-6e5c39a0df57.png"
          websiteUrl="https://drmcitclub.com"
        />
      </div>
    </div>
  );
};

export default ProjectShowcase;
