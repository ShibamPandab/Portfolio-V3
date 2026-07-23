import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the 60-second generation actually work?",
    answer:
      "You describe your idea in plain English. Our AI analyzes your market and audience, selects a layout from our design system, writes tailored copy, and assembles a complete page — typically in 40–60 seconds.",
  },
  {
    question: "Can I edit the page after it's generated?",
    answer:
      "Yes. Every section, headline, color, and image is editable in the visual editor. You can also regenerate individual sections without touching the rest of the page.",
  },
  {
    question: "Do I own the pages I create?",
    answer:
      "Completely. Your pages, copy, and any exported code are yours to use anywhere — even if you cancel your subscription.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "On the Pro plan and above, you can connect any custom domain with automatic SSL. Free plans publish to a launchkit.ai subdomain.",
  },
  {
    question: "What about SEO and page speed?",
    answer:
      "Pages are statically rendered and served from a global edge network, with semantic HTML, Open Graph tags, and sitemaps generated automatically. Most pages score 95+ on Lighthouse.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes — free forever, no credit card required. You get 3 generated pages on a LaunchKit subdomain, which is plenty to validate an idea.",
  },
];

export function Faq() {
  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Everything you need to know before you launch."
      />
      <Reveal className="mx-auto mt-12 max-w-2xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}
