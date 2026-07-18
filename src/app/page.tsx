import Hero from "@/components/hero/Hero";
import AboutSection from "@/components/sections/about/AboutSection";
import ContactSection from "@/components/sections/contact/ContactSection";
import CreativeSection from "@/components/sections/CreativeSection";
import Footer from "@/components/sections/footer/Footer";
import EditorialSection from "@/components/sections/EditorialSection";
import Marquee from "@/components/sections/Marquee";
import MotionLabSection from "@/components/sections/motionlab/MotionLabSection";
import ProcessSection from "@/components/sections/process/ProcessSection";
import TechStackSection from "@/components/sections/techstack/TechStackSection";
import UILibrarySection from "@/components/sections/uilibrary/UILibrarySection";
import ProjectsSection from "@/components/sections/projects/ProjectsSection";
import TimelineSection from "@/components/sections/timeline/TimelineSection";

export default function Home() {
  return (
    <main>
      {/* 1 — Cinematic landing hero */}
      <Hero />
      {/* 2 — Editorial: text left, portrait right */}
      <EditorialSection />
      {/* 3 — Mirrored: portrait left, text right */}
      <CreativeSection />
      {/* 4 — Infinite marquee */}
      <Marquee />
      {/* 5 — Scroll-driven story timeline */}
      <TimelineSection />
      {/* 6 — Projects */}
      <ProjectsSection />
      {/* 7 — Process (working method) */}
      <ProcessSection />
      {/* 8 — Motion Lab (horizontal experiment gallery) */}
      <MotionLabSection />
      {/* 9 — UI Library (live component specimens) */}
      <UILibrarySection />
      {/* 10 — Tech Stack (editorial toolkit) */}
      <TechStackSection />
      {/* 11 — About ("Behind the Work") */}
      <AboutSection />
      {/* 12 — Contact */}
      <ContactSection />
      {/* 13 — Footer */}
      <Footer />
    </main>
  );
}
