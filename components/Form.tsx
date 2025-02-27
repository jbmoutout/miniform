"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  emotions,
  formSchema,
  FormValues,
  transformEmotionValue,
  transformFormData,
} from "../lib/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const formFields = [
  { name: "name" as const, label: "Name", type: "text" },
  { name: "pseudo" as const, label: "Pseudo", type: "text" },
] as const;

export default function EmotionForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      pseudo: "",
      emotionSlider: 3,
    },
  });

  const [submitResult, setSubmitResult] = useState<string>("");

  const onSubmit = (data: FormValues) => {
    const transformedData = transformFormData(data);
    setSubmitResult(JSON.stringify(transformedData, null, 2));
  };

  const watchName = form.watch("name");
  const watchPseudo = form.watch("pseudo");
  const watchEmotion = form.watch("emotionSlider");

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Mini Form</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {formFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: fieldProps }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      <Input {...fieldProps} />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}

            {!watchName && !watchPseudo && (
              <p className="text-sm text-destructive">
                Mandatory name or pseudo
              </p>
            )}

            <FormField
              control={form.control}
              name="emotionSlider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emotion</FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      <Slider
                        min={1}
                        max={5}
                        step={1}
                        value={[field.value]}
                        onValueChange={(vals) => field.onChange(vals[0])}
                        className="w-full"
                      />
                      <div className="flex justify-between px-1">
                        {Object.entries(emotions).map(([level, emotion]) => (
                          <span
                            key={level}
                            className="flex flex-col items-center text-xs text-muted-foreground"
                          >
                            <p className="text-xl">{emotion.emoji}</p>
                            <p className="text-xl">{emotion.name}</p>
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Current emotion:{" "}
                        {emotions[watchEmotion as keyof typeof emotions].name}{" "}
                        {emotions[watchEmotion as keyof typeof emotions].emoji}
                        <br />
                        Backend value:{" "}
                        {transformEmotionValue(watchEmotion).toFixed(2)}
                      </p>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>

        {submitResult && (
          <div className="mt-6 space-y-2">
            <h2 className="text-lg font-semibold">Form Submission Result:</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
              {submitResult}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
