"use client";

import { useState, useEffect } from "react";
import { Zap, Circle } from "lucide-react";

export default function ThemeToggle() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Simulamos un toggle visual sin cambiar el tema (siempre dark futurista)
    const interval = setInterval(() => {
      setIsActive(prev => !prev);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      onClick={handleClick}
      className="relative p-2 rounded-xl bg-black/50 border border-white/30 hover:border-cyan-400/60 hover:bg-white/10 transition-all duration-300 group"
      aria-label="Balance energético"
    >
      <div className="relative w-6 h-6">
        {isActive ? (
          <Zap className="w-6 h-6 text-cyan-400 icon-neon electric-pulse" />
        ) : (
          <Circle className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
        )}
        
        {/* Yin-Yang efecto visual */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-3 h-6 bg-white rounded-l-full"></div>
          <div className="w-3 h-6 bg-black rounded-r-full transform -translate-y-6 translate-x-3"></div>
          <div className="absolute top-1.5 left-1.5 w-1 h-1 bg-black rounded-full"></div>
          <div className="absolute bottom-1.5 right-1.5 w-1 h-1 bg-white rounded-full"></div>
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 to-white/20 blur-sm"></div>
      </div>
    </button>
  );
}