import z from "zod";
import { ValidationSchema } from "@/components/form";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormRow } from "@/components/form-row";

export const stageTwoSchema = z
  .object({
    currentTime: z.string().min(1, { message: "Time is required." }),
    file: z.instanceof(FileList),
  })
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
      return file.size > 1000000000;
    },
    {
      path: ["file"],
      message: "Must be at least 1 GB.",
    },
  );
export function StageTwo({
  register,
  errors,
}: {
  register: UseFormRegister<ValidationSchema>;
  errors: FieldErrors<ValidationSchema>;
}) {
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
    </>
  );
}
