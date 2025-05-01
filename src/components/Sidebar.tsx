
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-[172px] bg-[#13151c] border-r border-[#2a2a2a] flex flex-col justify-between p-4">
      <div>
        <div className="mb-8">
          <Link to="/" className="flex flex-col items-center mb-2">
            <img src="/lovable-uploads/7b5e9311-33fc-4e20-a620-a6d601e632a6.png" 
                 alt="Logo" 
                 className="w-20 h-20" />
            <div className="text-white font-bold mt-2 text-center">MUHTASIM MAHIM</div>
            <div className="text-[#888888] text-xs mt-1 text-center">I WRITE CODE</div>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-cyan font-medium mb-4">Muhtasim Mahim</h2>
        </div>

        <nav className="flex flex-col gap-4">
          <Link to="/" className="text-white hover:text-cyan transition-colors">
            Home
          </Link>
          <Link to="/education" className="text-white hover:text-cyan transition-colors">
            Education &<br />Work Experience
          </Link>
          <Link to="/skills" className="text-white hover:text-cyan transition-colors">
            Technical Skills
          </Link>
          <Link to="/achievements" className="text-white hover:text-cyan transition-colors">
            Achievements &<br />Certificates
          </Link>
          <Link to="/web-development" className="text-white hover:text-cyan transition-colors">
            Web Development<br />Portfolio
          </Link>
          <Link to="/app-development" className="text-white hover:text-cyan transition-colors">
            App Development<br />Portfolio
          </Link>
        </nav>
      </div>

      <div className="text-[#888888] text-xs text-center">
        ©muhtasimmahim.com
      </div>
    </div>
  );
};

export default Sidebar;
