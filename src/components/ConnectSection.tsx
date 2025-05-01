
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ConnectSection = () => {
  return (
    <div className="glass-card p-6 md:p-8 flex flex-col items-start animate-fade-in">
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
        Let's<br />
        get <span className="text-cyan">connected.</span>
      </div>
      <p className="text-white mb-6 max-w-lg">
        Feel free to reach out for collaborations or just a friendly chat. I'm always open to discussing new projects or opportunities to be part of your vision.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link to="/contact">
          <Button variant="outline" className="border border-cyan text-cyan hover:bg-cyan hover:text-black transition-colors">
            CONTACT ME
          </Button>
        </Link>
        <Link to="/projects">
          <Button variant="outline" className="border border-white text-white hover:bg-white hover:text-black transition-colors">
            VIEW PROJECTS
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ConnectSection;
