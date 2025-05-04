
import { createContext, useContext, useState } from 'react';

const RouteContext = createContext(null);

export const RouteProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Custom navigation function without browser history API
  const navigate = (path) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
  };

  // Listen to popstate events (back/forward browser buttons)
  window.addEventListener('popstate', () => {
    setCurrentPath(window.location.pathname);
  });

  return (
    <RouteContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = () => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useRoute must be used within a RouteProvider');
  }
  return context;
};

export const Link = ({ to, className, children }) => {
  const { navigate } = useRoute();
  
  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };
  
  return (
    <a href={to} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};

export const Routes = ({ children }) => {
  const { currentPath } = useRoute();
  
  // Convert children to array
  const childrenArray = Array.isArray(children) ? children : [children];
  
  // Find the matching route
  const matchingRoute = childrenArray.find(child => {
    if (!child) return false;
    // Default path for 404
    if (child.props.path === "*") return true;
    return child.props.path === currentPath;
  });
  
  return matchingRoute || null;
};

export const Route = ({ element }) => {
  return element;
};
