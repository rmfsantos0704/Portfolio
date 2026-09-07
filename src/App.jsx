import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import BubbleMenu from "./components/ui/BubbleMenu";
import Entry from "./pages/Entry";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import Certificates from "./pages/Certificates";
import Contact from "./pages/Contact";

function App() {
  const location = useLocation();
  const isEntry = location.pathname === "/";
  const menuItems = [
    { label: "Home", link: "/portfolio#top" },
    { label: "About", link: "/portfolio#about" },
    { label: "Skills", link: "/portfolio#skills" },
    { label: "Projects", link: "/portfolio#projects" },
    { label: "Certificates", link: "/certificates" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <div className={isEntry ? "entry-shell" : "min-h-screen bg-bg"}>
      {!isEntry && location.pathname !== "/projects" && !location.pathname.startsWith("/projects/") && (
        <BubbleMenu
          logo={<span>RS<span aria-hidden="true">.</span></span>}
          items={menuItems.map((item) => ({ label: item.label, href: item.link }))}
          menuAriaLabel="Toggle portfolio navigation"
          menuBg="#26244B"
          menuContentColor="#ffffff"
        />
      )}
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/portfolio" element={<Home />} />
        <Route path="/about" element={<Navigate to="/portfolio#about" replace />} />
        <Route path="/skills" element={<Navigate to="/portfolio#skills" replace />} />
        <Route path="/projects" element={<Navigate to="/portfolio#projects" replace />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </div>
  );
}

export default App;