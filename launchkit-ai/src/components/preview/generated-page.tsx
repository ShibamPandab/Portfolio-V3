import type { GenerationResult } from "@/lib/generation";
import { buildPreviewTheme } from "@/lib/preview-theme";
import { cn } from "@/lib/utils";
import { GHero } from "@/components/preview/sections/g-hero";
import { GFeatures } from "@/components/preview/sections/g-features";
import { GTestimonials } from "@/components/preview/sections/g-testimonials";
import { GPricing } from "@/components/preview/sections/g-pricing";
import { GFaq } from "@/components/preview/sections/g-faq";
import { GCta } from "@/components/preview/sections/g-cta";
import { GFooter } from "@/components/preview/sections/g-footer";

/**
 * The full generated site. Purely data-driven: content from `result`, colors
 * and shape from the --gp-* theme vars. `@container` makes every section
 * respond to the frame width, so the mobile toggle shows real mobile layout.
 */
export function GeneratedPage({ result }: { result: GenerationResult }) {
  const theme = buildPreviewTheme(result.input.style, result.input.theme);

  return (
    <div
      className={cn("@container overflow-hidden", theme.rootClass)}
      style={{
        ...theme.vars,
        backgroundColor: "var(--gp-bg)",
        color: "var(--gp-fg)",
      }}
    >
      <GHero brand={result.brand} hero={result.hero} />
      <GFeatures features={result.features} />
      <GTestimonials testimonials={result.testimonials} />
      <GPricing pricing={result.pricing} />
      <GFaq faq={result.faq} />
      <GCta cta={result.cta} ctaLabel={result.hero.cta} />
      <GFooter brand={result.brand} />
    </div>
  );
}
