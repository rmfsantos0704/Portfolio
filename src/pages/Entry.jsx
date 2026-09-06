import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GridMotion from "../components/ui/GridMotion";

const gridMotionImages = [
  "/GridMotion/HD-wallpaper-purple-abstract-amazing-fluid-indigo-pink-violet.jpg",
  "/GridMotion/background-with-blue-black-abstract-flow-design-texture_23-2148097788.avif",
  "/GridMotion/images.jpeg",
  "/GridMotion/indigo___4k_wallpaper_by_abdelrahman_dgbitkm-fullview.jpg",
];

const gridItems = Array.from({ length: 28 }, (_, index) => gridMotionImages[index % gridMotionImages.length]);

export default function Entry() {
  const navigate = useNavigate();
  
  // 1. Add state to trigger the entry animations
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 2. Trigger the state change right after the component mounts
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="entry-page">
      <GridMotion items={gridItems} gradientColor="#090c14" />
      
      <div className="entry-content">
        {/* Added staggered delays (100, 200, 300, 500) to each element */}
        <span 
          className={`entry-kicker transition-all duration-700 ease-out delay-100 block ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Russel Santos / Portfolio
        </span>
        
        <h1 
          className={`transition-all duration-700 ease-out delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Build with intent.
        </h1>
        
        <p 
          className={`transition-all duration-700 ease-out delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Full-stack systems, thoughtful interfaces, and practical digital tools.
        </p>
        
        <button 
          type="button" 
          onClick={() => navigate("/portfolio", { state: { fromEntry: true } })}
          className={`transition-all duration-700 ease-out delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Enter portfolio
          <span aria-hidden="true" className="ml-2">-&gt;</span>
        </button>
      </div>
    </main>
  );
}