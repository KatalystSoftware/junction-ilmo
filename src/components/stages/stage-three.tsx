import { useEffect } from "react";
import z from "zod";
import { ValidationSchema } from "@/components/form";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormRow } from "@/components/form-row";

const stageFields = z.object({
  platformURL: z
    .string()
    .min(1, { message: "Platform URL is required" })
    .toLowerCase()
    .includes("eu.junctionplatform.com", {
      message: "Platform URL must be a valid Junction platform URL",
    }),
  motivation: z
    .string()
    .min(1, { message: "Motivation is required" })
    .min(2000, { message: "Motivation must be at least 2000 characters long" })
    .includes("Junction is my favourite hackathon.", {
      message: "Motivation must include 'Junction is my favourite hackathon.'",
    })
    .startsWith("I want to attend Junction because", {
      message: "Motivation must start with 'I want to attend Junction because'",
    })
    .endsWith("I'm here just for the free food.", {
      message: "Motivation must end with 'I'm here just for the free food.'",
    }),
  diet: z
    .string()
    .min(1, {
      message: "Dietary restrictions are required, you must have one.",
    })
    .emoji({ message: "Dietary restrictions must be specified with emojis." })
    .includes("🥦", { message: "Dietary restrictions must include '🥦'" })
    .min(48, {
      message: "Dietary restrictions must be at least 48 characters long",
    }),
});

export const stageThreeSchema = stageFields;

const stageSchemaKeys = Object.keys(stageFields.shape);

export function StageThree({
  touchedFields,
  register,
  errors,
  onPassStage,
}: {
  touchedFields: Partial<Readonly<{ [K in keyof ValidationSchema]?: boolean }>>;
  register: UseFormRegister<ValidationSchema>;
  errors: FieldErrors<ValidationSchema>;
  onPassStage: () => void;
}) {
  useEffect(() => {
    const hasStageErrors = stageSchemaKeys.some(
      (key) => !!errors[key as keyof typeof errors],
    );
    const hasTouchedAllStageValues = stageSchemaKeys.every(
      (key) => !!touchedFields[key as keyof typeof touchedFields],
    );

    if (hasTouchedAllStageValues && !hasStageErrors) {
      onPassStage();
    }
  }, [errors, touchedFields, onPassStage]);

  return (
    <>
      <FormRow
        id="platformURL"
        label="We recently changed the URL of our Junction platform. What's the URL of the new platform?"
        errors={errors.platformURL}
        inputProps={{
          id: "platformURL",
          placeholder: "Platform URL",
          ...register("platformURL", { required: true }),
        }}
      />
      <FormRow
        id="motivation"
        label="Why do you want to be accepted to this hackathon, and why should we choose you? Please note that we regard a well-written letter of motivation very highly when reviewing applications."
        errors={errors.motivation}
        inputProps={{
          id: "motivation",
          placeholder: "Motivation",
          ...register("motivation", { required: true }),
        }}
      />
      <FormRow
        id="diet"
        label="What are your dietary restrictions?"
        errors={errors.diet}
        inputProps={{
          id: "diet",
          placeholder: "Dietary Restrictions",
          ...register("diet", { required: true }),
        }}
      />
    </>
  );
}
