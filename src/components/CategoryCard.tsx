
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  icon: ReactNode;
  subtitle: string;
  title: string;
  link: string;
}

const CategoryCard = ({ icon, subtitle, title, link }: CategoryCardProps) => {
  return (
    <Link to={link} className="glass-card p-8 flex flex-col items-center animate-fade-in hover:border-cyan/30 transition-colors">
      <div className="mb-6">
        {icon}
      </div>
      <div className="text-zinc-400 uppercase text-sm">{subtitle}</div>
      <h3 className="text-cyan text-xl font-semibold">{title}</h3>
    </Link>
  );
};

export default CategoryCard;
