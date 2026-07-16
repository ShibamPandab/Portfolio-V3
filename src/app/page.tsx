import Hero from "@/components/hero/Hero";
import CreativeSection from "@/components/sections/CreativeSection";
import EditorialSection from "@/components/sections/EditorialSection";
import Marquee from "@/components/sections/Marquee";

export default function Home() {
  return (
    <main>
      {/* 1 — Cinematic landing hero */}
      <Hero />
      {/* 2 — Editorial: text left, portrait right */}
      <EditorialSection />
      {/* 3 — Mirrored: portrait left, text right */}
      <CreativeSection />
      {/* 4 — Infinite marquee (before the Projects section) */}
      <Marquee />
      {/* 5 — Projects section goes here */}
    </main>
  );
}
