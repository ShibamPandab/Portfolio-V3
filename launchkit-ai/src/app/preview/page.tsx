import type { Metadata } from "next";
import { PreviewShell } from "@/components/preview/preview-shell";

export const metadata: Metadata = {
  title: "Preview your page",
  description: "Your AI-generated landing page, ready to review and publish.",
};

export default function PreviewPage() {
  return <PreviewShell />;
}
