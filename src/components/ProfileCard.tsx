
const ProfileCard = () => {
  return (
    <div className="glass-card p-8 flex flex-col md:flex-row gap-8 animate-fade-in">
      <div className="md:w-1/3">
        <img 
          src="/lovable-uploads/52b90e2b-5a4b-4fc5-8c91-f77936570b22.png" 
          alt="Muhtasim Mahim"
          className="rounded-lg w-full object-cover aspect-[3/4]"
        />
      </div>
      <div className="md:w-2/3">
        <div className="text-zinc-400">Programmer</div>
        <h1 className="text-cyan text-4xl md:text-5xl font-bold mb-4">
          Muhtasim<br />
          Zaman Mahim
        </h1>
        <p className="text-white mb-2">Web Developer, Android App</p>
        <p className="text-white mb-2">Developer, Competitive</p>
        <p className="text-white">Programmer</p>
      </div>
    </div>
  );
};

export default ProfileCard;
