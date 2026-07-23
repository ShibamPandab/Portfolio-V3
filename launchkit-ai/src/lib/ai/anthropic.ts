import Anthropic from "@anthropic-ai/sdk";
import type { GeneratedContent, GenerationInput } from "@/lib/generation";
import {
  buildUserPrompt,
  outputSchema,
  stageMarkers,
  SYSTEM_PROMPT,
} from "@/lib/ai/prompt";
import type {
  GenerationStreamEvent,
  LandingPageProvider,
} from "@/lib/ai/provider";

const MODEL = "claude-opus-4-8";

export const anthropicProvider: LandingPageProvider = {
  async *generate(
    input: GenerationInput
  ): AsyncGenerator<GenerationStreamEvent> {
    const client = new Anthropic();

    yield { type: "stage", stage: 0 };

    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: 16000,
      thinking: { type: "adaptive" },
      output_config: {
        effort: "medium",
        format: { type: "json_schema", schema: outputSchema },
      },
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildUserPrompt(input) }],
    });

    let buffer = "";
    let stage = 0;
    for await (const event of stream) {
      if (
        event.type === "content_block_delta" &&
        event.delta.type === "text_delta"
      ) {
        buffer += event.delta.text;
        for (const { marker, stage: next } of stageMarkers) {
          if (next > stage && buffer.includes(marker)) {
            stage = next;
            yield { type: "stage", stage: next };
          }
        }
      }
    }

    const message = await stream.finalMessage();

    if (message.stop_reason === "refusal") {
      throw new Error("The model declined to generate content for this idea.");
    }
    if (message.stop_reason === "max_tokens") {
      throw new Error("Generation ran out of space before finishing.");
    }

    const text = message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("");

    const content = JSON.parse(text) as GeneratedContent;
    yield { type: "result", content };
  },
};
