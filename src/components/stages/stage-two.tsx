import z from "zod";
import { ValidationSchema } from "@/components/form";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormRow } from "@/components/form-row";

export const stageTwoSchema = z.object({
  testi: z.string().min(1, { message: "Testi is required." }),
});

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
