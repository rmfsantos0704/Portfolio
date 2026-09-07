import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Plasma from "../components/ui/Plasma";

export default function Home() {
  return (
    <div className="home-page">
      <div className="homepage-plasma" aria-hidden="true">
        <Plasma color="#6366f1" speed={0.6} scale={1.1} opacity={0.55} />
      </div>
      <main className="home-page-content">
      <Hero />
      <Projects />
      <Skills />
      <About />
      </main>
    </div>
  );
}