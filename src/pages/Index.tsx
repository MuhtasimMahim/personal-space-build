
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ProfileCard from "@/components/ProfileCard";
import CategoryCard from "@/components/CategoryCard";
import StatsCard from "@/components/StatsCard";
import ConnectSection from "@/components/ConnectSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ProgrammerIcon from "@/components/ProgrammerIcon";
import ProjectShowcase from "@/components/ProjectShowcase";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-[#0c0f16] text-white">
      <Sidebar />
      <Navbar />
      
      <div className={`${isMobile ? '' : 'ml-[172px]'} pt-20 px-6 md:px-10 lg:px-16`}>
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ProfileCard />
              </div>
              <div className="flex flex-col justify-center">
                <div className="glass-card p-6 text-center mb-6">
                  <h2 className="text-white bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent inline-block">
                    ADD YOUR HEADING TEXT HERE
                  </h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <CategoryCard 
                icon={<ProgrammerIcon />}
                subtitle="MORE ABOUT ME"
                title="Credentials"
                link="/credentials"
              />
              <CategoryCard 
                icon={<ProgrammerIcon />}
                subtitle="SHOWCASE"
                title="Projects"
                link="/projects"
              />
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard number="04" description="YEARS EXPERIENCE" />
              <StatsCard number="+3" description="HONORS" />
              <StatsCard number="+10" description="TOTAL PROJECTS" />
            </div>
          </section>

          {/* Connect Section */}
          <section className="py-10">
            <ConnectSection />
          </section>

          {/* Categories Section */}
          <section className="py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CategoryCard 
                icon={<ProgrammerIcon />}
                subtitle="BLOG"
                title="Blogs"
                link="/blogs"
              />
              <CategoryCard 
                icon={<ProgrammerIcon />}
                subtitle="SPECIALIZATION"
                title="My Skills"
                link="/skills"
              />
              <CategoryCard 
                icon={<ProgrammerIcon />}
                subtitle="STAY WITH ME"
                title="Profiles"
                link="/profiles"
              />
            </div>
          </section>

          {/* Experience Section */}
          <section className="py-10">
            <ExperienceSection />
          </section>

          {/* Skills Section */}
          <section className="py-10">
            <SkillsSection />
          </section>
          
          {/* Project Showcase Section */}
          <section className="py-10 mb-10">
            <ProjectShowcase />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;
