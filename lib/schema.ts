import { z } from "zod";

export const emotions = {
  1: { name: "sad", value: 0.5, emoji: "😢" },
  2: { name: "calm", value: 0.8, emoji: "😌" },
  3: { name: "happy", value: 1.0, emoji: "😊" },
  4: { name: "joyful", value: 1.5, emoji: "😃" },
  5: { name: "ptdr", value: 2.0, emoji: "🤣" },
} as const;

export const formSchema = z
  .object({
    name: z.string().optional(),
    pseudo: z.string().optional(),
    emotionSlider: z.number().min(1).max(5),
  })
  .refine((data) => data.name || data.pseudo, {
    message: "Mandatory name or pseudo",
    path: ["name", "pseudo"],
  });

export type FormValues = z.infer<typeof formSchema>;

export function transformEmotionValue(frontendValue: number): number {
  return 1 + (frontendValue - 1) / 4;
}

export function transformFormData(data: FormValues) {
  const emotionName =
    emotions[data.emotionSlider as keyof typeof emotions].name;
  return {
    ...data,
    emotionValue: {
      [emotionName]: transformEmotionValue(data.emotionSlider),
    },
  };
}
