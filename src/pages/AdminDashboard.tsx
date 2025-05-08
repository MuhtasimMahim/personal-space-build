
import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#0c0f16] text-white">
      <header className="bg-[#1a1a1a] border-b border-gray-800 py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-cyan">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="text-sm text-gray-400 hover:text-white"
            >
              View Site
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              size="sm"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-6">
        <div className="flex">
          <aside className="w-56 mr-6">
            <nav className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
              <ul className="space-y-2">
                <li>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => navigate("/admin/dashboard")}
                  >
                    Dashboard
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => navigate("/admin/posts")}
                  >
                    Blog Posts
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-cyan"
                    onClick={() => navigate("/admin/posts/new")}
                  >
                    + New Post
                  </Button>
                </li>
              </ul>
            </nav>
          </aside>
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
