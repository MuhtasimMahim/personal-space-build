
import { RouteProvider, Routes, Route } from "./contexts/RouteContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Index from "./pages/Index";
import WebDevelopment from "./pages/WebDevelopment";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RouteProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/web-development" element={<WebDevelopment />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:exploring-korea" element={<BlogPost />} />
            <Route path="/blog/:dubai-robotics-competition" element={<BlogPost />} />
            <Route path="/blog/:wordpress-site-development" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </RouteProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
