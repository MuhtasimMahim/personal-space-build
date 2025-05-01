
interface SkillItemProps {
  title: string;
  description: string;
}

const SkillItem = ({ title, description }: SkillItemProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </div>
  );
};

const SkillsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
      <div className="glass-card p-8">
        <h2 className="text-cyan mb-6">TECH SKILLS & EXPERIENCES</h2>
        
        <SkillItem
          title="Android App Development"
          description="Our team developed an android app called 'Until The EU' with react native in a contest organized by Korea Digital Education Frontiers Association (KEFA) and the Korean Education Ministry Developed android app for DRMC IT Club with WebView."
        />
        
        <SkillItem
          title="Web Development"
          description="Developed website for DRMC IT Club with WordPress and HTML Developed website for VPG Esports Developed my personal portfolio website"
        />
      </div>
      
      <div className="glass-card p-8">
        <h2 className="text-cyan mb-6">TECH SKILLS & EXPERIENCES</h2>
        
        <SkillItem
          title="Competitive Programming"
          description="Problem solver at Codeforces Problem setter in 6th DRMC International Tech Carnival 2023, 5th DRMC International Tech Carnival 2022, 4th DRMC International Tech Expo 2021, DRMC Virtual National Tech Carnival 2021 and PROGenius Cszer"
        />
        
        <SkillItem
          title="Software Proficiency"
          description="Used software like Word, Excel, PowerPoint, VS Code, Code Blocks and Android Studio to conduct coding related tasks and other basic tasks for personal use."
        />
      </div>
    </div>
  );
};

export default SkillsSection;
