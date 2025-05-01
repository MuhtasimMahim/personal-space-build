
import { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const InfoCard = ({ title, description, icon }: InfoCardProps) => {
  return (
    <div className="glass-card p-6 flex flex-col items-center animate-fade-in">
      <div className="mb-4">
        {icon}
      </div>
      <div className="text-zinc-400 text-sm uppercase">{description}</div>
      <h3 className="text-cyan text-xl font-semibold">{title}</h3>
    </div>
  );
};

export default InfoCard;
