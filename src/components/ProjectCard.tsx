
import { Link } from "react-router-dom";

interface ProjectCardProps {
  imageUrl: string;
  title: string;
  link: string;
}

const ProjectCard = ({ imageUrl, title, link }: ProjectCardProps) => {
  return (
    <Link to={link} className="block">
      <div className="rounded-lg overflow-hidden animate-fade-in">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-300"
        />
      </div>
    </Link>
  );
};

export default ProjectCard;
