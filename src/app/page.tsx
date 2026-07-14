import Hero from "@/components/hero/Hero";
import CreativeSection from "@/components/sections/CreativeSection";
import EditorialSection from "@/components/sections/EditorialSection";

export default function Home() {
  return (
    <main>
      {/* 1 — Cinematic landing hero */}
      <Hero />
      {/* 2 — Editorial: text left, portrait right */}
      <EditorialSection />
      {/* 3 — Mirrored: portrait left, text right */}
      <CreativeSection />
    </main>
  );
}
