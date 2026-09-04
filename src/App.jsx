import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import Certificates from "./pages/Certificates";
import Entry from "./pages/Entry";
function App() {
  const location = useLocation();
  const isHome = location.pathname === "/portfolio";
  const isEntry = location.pathname === "/";
  const isOpeningPortfolio = isHome && location.state?.fromEntry;

  return (
    <div className={`${isEntry ? "entry-shell" : "min-h-screen bg-bg"} ${isOpeningPortfolio ? "portfolio-opening" : ""}`}>
      {isHome && <Navbar />}
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/portfolio" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/certificates" element={<Certificates />} />
      </Routes>
      {!isEntry && (
        <footer className="border-t border-white/5 py-8 text-center text-xs text-muted">
          Built by Russel Santos
        </footer>
      )}
    </div>
  );
}

export default App;
