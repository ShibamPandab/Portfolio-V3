import type { GenerationResult } from "@/lib/generation";

const columns = [
  { title: "Product", links: ["Features", "Pricing", "FAQ"] },
  { title: "Company", links: ["About", "Blog", "Contact"] },
  { title: "Legal", links: ["Privacy", "Terms"] },
];

export function GFooter({ brand }: { brand: GenerationResult["brand"] }) {
  return (
    <footer className="border-t" style={{ borderColor: "var(--gp-border)" }}>
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-10 @md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <span className="font-semibold">{brand.name}</span>
            <p
              className="mt-3 max-w-xs text-sm leading-relaxed"
              style={{ color: "var(--gp-muted)" }}
            >
              {brand.tagline}.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-medium">{column.title}</h3>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <span
                      className="cursor-pointer text-sm hover:underline"
                      style={{ color: "var(--gp-muted)" }}
                    >
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p
          className="mt-12 border-t pt-6 text-xs"
          style={{ borderColor: "var(--gp-border)", color: "var(--gp-muted)" }}
        >
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
