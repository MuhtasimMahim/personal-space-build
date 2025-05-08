
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0c0f16] text-white p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-cyan mb-4">404</h1>
        <p className="text-2xl mb-6">Page not found</p>
        <p className="mb-8 text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-4 mb-8">
          <p className="text-lg font-medium text-cyan">Available pages:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/" className="text-white hover:text-cyan transition-colors">
              Home
            </Link>
            <Link to="/blog" className="text-white hover:text-cyan transition-colors">
              Blog
            </Link>
            <Link to="/admin/dashboard" className="text-white hover:text-cyan transition-colors">
              Admin Dashboard
            </Link>
            <Link to="/admin/posts" className="text-white hover:text-cyan transition-colors">
              Manage Posts
            </Link>
            <Link to="/admin/posts/new" className="text-white hover:text-cyan transition-colors">
              New Post
            </Link>
          </div>
        </div>
        
        <Link to="/" className="bg-cyan text-black px-6 py-3 rounded-lg font-medium hover:bg-cyan/80 transition-colors inline-block">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
