"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WizardProgress } from "@/components/generate/progress";
import { OptionCard } from "@/components/generate/option-card";
import { LoadingOverlay } from "@/components/generate/loading-overlay";
import {
  audienceSuggestions,
  colorThemes,
  ctaGoals,
  ideaExamples,
  saveGeneration,
  visualStyles,
  type ColorThemeId,
  type CtaGoalId,
  type VisualStyleId,
} from "@/lib/generation";
import { generateLandingPage } from "@/lib/generation-client";
import { cn } from "@/lib/utils";

const steps = [
  { id: "idea", label: "Idea" },
  { id: "audience", label: "Audience" },
  { id: "style", label: "Style" },
  { id: "theme", label: "Colors" },
  { id: "goal", label: "Goal" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const slide = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 48 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -48 }),
};

export function GenerateWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [genStage, setGenStage] = useState(0);
  const [genError, setGenError] = useState<string | null>(null);

  const [idea, setIdea] = useState("");
  const [audience, setAudience] = useState("");
  const [style, setStyle] = useState<VisualStyleId | null>(null);
  const [theme, setTheme] = useState<ColorThemeId | null>(null);
  const [ctaGoal, setCtaGoal] = useState<CtaGoalId | null>(null);

  const canContinue = [
    idea.trim().length >= 10,
    audience.trim().length >= 2,
    style !== null,
    theme !== null,
    ctaGoal !== null,
  ][step];

  const go = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const handleGenerate = useCallback(async () => {
    setGenerating(true);
    setGenError(null);
    setGenStage(0);
    try {
      const result = await generateLandingPage(
        {
          idea: idea.trim(),
          audience: audience.trim(),
          style: style ?? "minimal",
          theme: theme ?? "aurora",
          ctaGoal: ctaGoal ?? "waitlist",
        },
        setGenStage
      );
      saveGeneration(result);
      router.push("/preview");
    } catch (err) {
      setGenError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }, [idea, audience, style, theme, ctaGoal, router]);

  return (
    <MotionConfig reducedMotion="user">
    <div className="mx-auto w-full max-w-2xl">
      <WizardProgress steps={steps} current={step} onStepClick={go} />

      <div className="relative mt-12 min-h-[26rem]">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease }}
          >
            {step === 0 && (
              <StepShell
                title="What's your startup idea?"
                subtitle="One or two sentences is perfect. The more specific, the better the result."
              >
                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  autoFocus
                  rows={4}
                  placeholder="e.g. An app that matches dog owners with trusted local sitters..."
                  className="glass w-full resize-none rounded-2xl p-5 text-base leading-relaxed placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none"
                />
                <div className="mt-4 flex flex-wrap gap-2">
                  {ideaExamples.map((example) => (
                    <button
                      key={example}
                      type="button"
                      onClick={() => setIdea(example)}
                      className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                    >
                      {example.slice(0, 44)}…
                    </button>
                  ))}
                </div>
              </StepShell>
            )}

            {step === 1 && (
              <StepShell
                title="Who is it for?"
                subtitle="We tailor the tone, copy, and imagery to your audience."
              >
                <input
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  autoFocus
                  placeholder="e.g. Busy dog owners in big cities"
                  className="glass w-full rounded-2xl p-5 text-base placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none"
                />
                <div className="mt-4 flex flex-wrap gap-2">
                  {audienceSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setAudience(suggestion)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs transition-colors",
                        audience === suggestion
                          ? "border-primary/50 bg-primary/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      )}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </StepShell>
            )}

            {step === 2 && (
              <StepShell
                title="Pick a visual style"
                subtitle="Sets the overall personality of your page."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {visualStyles.map((s) => (
                    <OptionCard
                      key={s.id}
                      selected={style === s.id}
                      onSelect={() => setStyle(s.id)}
                    >
                      <h3 className="pr-8 font-medium">{s.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {s.description}
                      </p>
                    </OptionCard>
                  ))}
                </div>
              </StepShell>
            )}

            {step === 3 && (
              <StepShell
                title="Choose a color theme"
                subtitle="You can fine-tune every color after generation."
              >
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {colorThemes.map((t) => (
                    <OptionCard
                      key={t.id}
                      selected={theme === t.id}
                      onSelect={() => setTheme(t.id)}
                    >
                      <div className="flex gap-1.5">
                        {t.swatches.map((color) => (
                          <span
                            key={color}
                            className="size-6 rounded-full border border-white/10"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <p className="mt-3 pr-6 text-sm font-medium">{t.name}</p>
                    </OptionCard>
                  ))}
                </div>
              </StepShell>
            )}

            {step === 4 && (
              <StepShell
                title="What should visitors do?"
                subtitle="Your entire page is optimized around this one action."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {ctaGoals.map((goal) => (
                    <OptionCard
                      key={goal.id}
                      selected={ctaGoal === goal.id}
                      onSelect={() => setCtaGoal(goal.id)}
                    >
                      <h3 className="pr-8 font-medium">{goal.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {goal.description}
                      </p>
                    </OptionCard>
                  ))}
                </div>
              </StepShell>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => go(step - 1)}
          className={cn(step === 0 && "invisible")}
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>

        {step < steps.length - 1 ? (
          <Button size="lg" disabled={!canContinue} onClick={() => go(step + 1)}>
            Continue
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button
            size="lg"
            disabled={!canContinue}
            onClick={handleGenerate}
            className="group"
          >
            <Sparkles className="size-4 transition-transform group-hover:rotate-12" />
            Generate my page
          </Button>
        )}
      </div>

      <AnimatePresence>
        {generating && (
          <LoadingOverlay
            stage={genStage}
            error={genError}
            onRetry={handleGenerate}
            onDismiss={() => {
              setGenerating(false);
              setGenError(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
}

function StepShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-gradient sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}
