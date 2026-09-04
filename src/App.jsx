import { Routes, Route, useLocation } from "react-router-dom";
import StaggeredMenu from "./components/ui/StaggeredMenu";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import Certificates from "./pages/Certificates";
import Entry from "./pages/Entry";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";

function App() {
  const location = useLocation();
  const isEntry = location.pathname === "/";
  const isOpeningPortfolio = location.pathname === "/portfolio" && location.state?.fromEntry;
  const menuItems = [
    { label: "Home", link: "/portfolio" },
    { label: "About", link: "/about" },
    { label: "Skills", link: "/skills" },
    { label: "Projects", link: "/projects" },
    { label: "Certificates", link: "/certificates" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <div className={`${isEntry ? "entry-shell" : "min-h-screen bg-bg"} ${isOpeningPortfolio ? "portfolio-opening" : ""}`}>
      {!isEntry && (
        <StaggeredMenu
          position="right"
          items={menuItems}
          displaySocials={false}
          displayItemNumbering
          isFixed
          colors={["#090c14", "#5b4ff5", "#22d3ee"]}
          accentColor="#22d3ee"
          menuButtonColor="#f2f4f8"
          openMenuButtonColor="#f2f4f8"
          logoUrl=""
        />
      )}
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/portfolio" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/certificates" element={<Certificates />} />
      </Routes>
    </div>
  );
}

export default App;