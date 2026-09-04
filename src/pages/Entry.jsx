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

  return (
    <main className="entry-page">
      <GridMotion items={gridItems} gradientColor="#090c14" />
      <div className="entry-content">
        <span className="entry-kicker">Russel Santos / Portfolio</span>
        <h1>Build with intent.</h1>
        <p>Full-stack systems, thoughtful interfaces, and practical digital tools.</p>
        <button type="button" onClick={() => navigate("/portfolio", { state: { fromEntry: true } })}>
          Enter portfolio
          <span aria-hidden="true">-&gt;</span>
        </button>
      </div>
    </main>
  );
}