import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // A tiny delay ensures the DOM is fully painted and your 
      // IntersectionObserver animations in Projects.jsx don't throw off the scroll position
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // If there's no hash, always start at the top of the page
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null; // This component doesn't render anything visually
}