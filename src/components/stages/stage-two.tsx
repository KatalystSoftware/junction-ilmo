import z from "zod";
import { ValidationSchema } from "@/components/form";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormRow } from "@/components/form-row";

export const stageTwoSchema = z
  .object({
    currentTime: z.string().min(1, { message: "Time is required." }),
    testi: z.string().min(1, { message: "Testi is required." }),
  })
  .refine(
    (data) => Math.abs(Date.parse(data.currentTime) - Date.now()) < 60 * 1000, // times differ by less than a minute
    {
      path: ["currentTime"],
      message: "Time must be the current time.",
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
        id="testi"
        label="Testi"
        errors={errors.testi}
        inputProps={{
          id: "testi",
          placeholder: "Testi",
          ...register("testi", { required: true }),
        }}
      />
    </>
  );
}
