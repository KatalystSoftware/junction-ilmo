import { useEffect } from "react";
import z from "zod";
import { ValidationSchema } from "@/components/form";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormRow } from "@/components/form-row";

const stageFields = z.object({
  currentTime: z.string().min(1, { message: "Time is required." }),
  file: z.instanceof(FileList),
  hackathons: z.string().ip({
    message: "The number of attended hackathons must be a valid IP address.",
  }),
});

export const stageThreeSchema = stageFields
  .refine(
    (data) => Math.abs(Date.parse(data.currentTime) - Date.now()) < 60 * 1000, // times differ by less than a minute
    {
      path: ["currentTime"],
      message: "Time must be the current time.",
    },
  )
  .refine((data) => data.file.length === 1, {
    path: ["file"],
    message: "You must upload exactly one file.",
  })
  .refine(
    (data) => {
      const file = data.file[0];
      return !!file && file.size > 1000000000;
    },
    {
      path: ["file"],
      message: "Your video CV must be more than 1GB.",
    },
  );

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
        id="time"
        label="Current time at the time of submission"
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
        label="Video CV, why you should be accepted to Junction"
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
