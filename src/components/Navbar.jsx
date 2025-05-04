
import { Link, useRoute } from "../contexts/RouteContext";

const Navbar = () => {
  const { currentPath } = useRoute();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-[#0c0f16]/80 backdrop-blur-md">
      <div className="ml-[172px]">
        <Link to="/">
          <img src="/lovable-uploads/7b5e9311-33fc-4e20-a620-a6d601e632a6.png" 
               alt="Logo" 
               className="w-10 h-10" />
        </Link>
      </div>
      
      <nav className="flex items-center gap-8">
        <Link to="/" className={`${currentPath === '/' ? 'text-cyan' : 'text-white hover:text-cyan'} transition-colors`}>
          Home
        </Link>
        <Link to="/blog" className={`${currentPath.includes('/blog') ? 'text-cyan' : 'text-white hover:text-cyan'} transition-colors`}>
          Blog
        </Link>
        <Link to="/featured" className="text-white hover:text-cyan transition-colors">
          Featured
        </Link>
        <Link to="/certifications" className="text-white hover:text-cyan transition-colors">
          Certifications
        </Link>
        <Link to="/contact" className="text-white hover:text-cyan transition-colors">
          Contact
        </Link>
      </nav>

      <Link 
        to="/cv" 
        className="border border-white text-white hover:bg-white hover:text-black transition-all px-6 py-2"
      >
        DOWNLOAD CV
      </Link>
    </header>
  );
};

export default Navbar;
