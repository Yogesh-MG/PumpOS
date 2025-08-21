import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary-foreground to-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse"></div>
      
      <div className="text-center z-10 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-scale-in">
            GymPro
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light">
            Complete Fitness Management System
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;