import { useEffect } from "react";
import z from "zod";
import { ValidationSchema } from "@/components/form";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormRow } from "@/components/form-row";

export const stageFields = z.object({
  currentTime: z.string().min(1, { message: "Time is required." }),
  file: z.instanceof(FileList),
  hackathons: z.string().ip({
    message: "The number of attended hackathons must be a valid IP address.",
  }),
});

export const stageTwoSchema = stageFields
  .refine(
    (data) => Math.abs(Date.parse(data.currentTime) - Date.now()) < 60 * 1000, // times differ by less than a minute
    {
      path: ["currentTime"],
      message: "Time must be the current time.",
    },
  )
  .refine(
    (data) => {
      const file = data.file[0];
      return !!file && file.size > 1000000000;
    },
    {
      path: ["file"],
      message: "Must be at least 1 GB.",
    },
  );

const stageSchemaKeys = Object.keys(stageFields.shape);

export function StageTwo({
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
        id="time"
        label="Current time"
        errors={errors.currentTime}
        inputProps={{
          type: "datetime-local",
          id: "time",
          placeholder: "Current time",
          ...register("currentTime", { required: true }),
        }}
      />
      <FormRow
        id="file"
        label="File of at least 1 GB"
        errors={errors.file}
        inputProps={{
          type: "file",
          id: "file",
          ...register("file", { required: true }),
        }}
      />
      <FormRow
        id="hackathons"
        label="The number of hackathons you've attended"
        errors={errors.hackathons}
        inputProps={{
          id: "hackathons",
          placeholder: "Hackathons",
          ...register("hackathons", { required: true }),
        }}
      />
    </>
  );
}
