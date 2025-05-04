
import React, { useState, useEffect } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

const screenshots = [
  '/lovable-uploads/5ffff40b-ac17-4c0d-965e-a90ccf6a60e0.png',
  '/lovable-uploads/279837c2-9534-4c6b-84e4-11ad402dcc62.png',
];

const AppShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto rotate screenshots every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % screenshots.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card p-6 mb-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-cyan mb-4">My App Portfolio</h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Check out screenshots of apps I've developed. These projects showcase my skills
          in mobile app development and UI/UX design.
        </p>
      </div>
      
      <div className="flex justify-center items-center relative">
        {/* Screenshots carousel inside the phone frame */}
        <div className="relative max-w-[300px] mx-auto">
          {/* Screenshots container - positioned below the frame in z-index but visible through frame's transparent area */}
          <div className="absolute top-[1.5%] bottom-[1.5%] left-[4%] right-[4%] z-10 overflow-hidden rounded-[25px] bg-white">
            <Carousel className="w-full h-full" 
              opts={{
                align: "center",
                loop: true,
              }}
              setApi={(api) => {
                if (api && currentSlide !== api.selectedScrollSnap()) {
                  api.scrollTo(currentSlide);
                }
              }}
            >
              <CarouselContent>
                {screenshots.map((screenshot, index) => (
                  <CarouselItem key={index} className="flex justify-center items-center">
                    <img 
                      src={screenshot} 
                      alt={`App screenshot ${index + 1}`}
                      className="w-full h-full object-cover" 
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-[-40px]" />
              <CarouselNext className="absolute right-[-40px]" />
            </Carousel>
          </div>
          
          {/* Phone frame - positioned on top but with transparent middle */}
          <img 
            src="/lovable-uploads/fc63a100-e216-4543-91bd-2c95a8f31baf.png" 
            alt="Phone frame" 
            className="w-full h-auto relative z-20"
          />
        </div>
      </div>
      
      {/* Screenshot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {screenshots.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-cyan" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AppShowcase;
