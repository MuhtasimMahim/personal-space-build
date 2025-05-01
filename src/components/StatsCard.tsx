
interface StatsCardProps {
  number: string;
  description: string;
}

const StatsCard = ({ number, description }: StatsCardProps) => {
  return (
    <div className="glass-card p-6 text-center animate-fade-in">
      <div className="text-white text-4xl font-bold mb-1">{number}</div>
      <div className="text-zinc-400 uppercase text-sm tracking-wider">{description}</div>
    </div>
  );
};

export default StatsCard;
