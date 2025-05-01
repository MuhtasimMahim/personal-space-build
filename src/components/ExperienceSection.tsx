
interface EducationItemProps {
  years: string;
  institution: string;
  description: string;
}

const EducationItem = ({ years, institution, description }: EducationItemProps) => (
  <div className="mb-6">
    <div className="text-zinc-400">{years}</div>
    <h3 className="text-white text-xl font-semibold">{institution}</h3>
    <p className="text-zinc-400">{description}</p>
  </div>
);

interface ExperienceItemProps {
  years: string;
  organization: string;
  role: string;
}

const ExperienceItem = ({ years, organization, role }: ExperienceItemProps) => (
  <div className="mb-6">
    <div className="text-zinc-400">{years}</div>
    <h3 className="text-white text-xl font-semibold">{organization}</h3>
    <p className="text-zinc-400">{role}</p>
  </div>
);

const ExperienceSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
      <div className="glass-card p-8">
        <h2 className="text-cyan mb-6">Education</h2>
        
        <EducationItem
          years="2007 - 2017"
          institution="Dhaka Residential Model College"
          description="Primary & Secondary Education"
        />
        
        <EducationItem
          years="2017 - 2023"
          institution="Dhaka Residential Model College"
          description="Higher Secondary education"
        />
      </div>
      
      <div className="glass-card p-8">
        <h2 className="text-cyan mb-6">EXPERIENCE</h2>
        
        <ExperienceItem
          years="2020-Present"
          organization="DRMC IT Club"
          role="Programming Secretary Former Volunteer"
        />
        
        <ExperienceItem
          years="2022-Present"
          organization="English Olympiad"
          role=""
        />
      </div>
    </div>
  );
};

export default ExperienceSection;
