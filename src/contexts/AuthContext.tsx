import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';

// Get admin credentials from environment variables
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  // Check localStorage on mount to restore session
  useEffect(() => {
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser.email === 'string') {
          setUser(parsedUser);
          setIsAuthenticated(true);
        } else {
          throw new Error('Invalid user data format');
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('adminUser');
        toast.error('Session expired. Please login again.');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simple authentication logic - in a real app, this would validate against a database
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const userData = { email };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('adminUser', JSON.stringify(userData));
        toast.success('Login successful');
        return true;
      } else {
        toast.error('Invalid email or password');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('adminUser');
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
