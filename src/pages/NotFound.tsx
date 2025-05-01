
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0c0f16] text-white p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-cyan mb-4">404</h1>
        <p className="text-2xl mb-8">Page not found</p>
        <Link to="/" className="bg-cyan text-black px-6 py-3 rounded-lg font-medium hover:bg-cyan/80 transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
