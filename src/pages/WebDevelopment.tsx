
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ProjectCard from "@/components/ProjectCard";

const WebDevelopment = () => {
  return (
    <div className="min-h-screen bg-[#0c0f16] text-white">
      <Sidebar />
      <Navbar />
      
      <div className="ml-[172px] pt-20 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <section className="py-10">
            <h1 className="text-cyan text-6xl font-bold mb-16 text-center">Web Development</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <ProjectCard 
                imageUrl="/lovable-uploads/ab3b8695-e4f7-4e9e-8b80-951baa334acb.png"
                title="VPG Esports"
                link="/projects/vpg-esports"
              />
              <ProjectCard 
                imageUrl="/lovable-uploads/ab3b8695-e4f7-4e9e-8b80-951baa334acb.png"
                title="DRMC IT Club"
                link="/projects/drmc-it-club"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WebDevelopment;
