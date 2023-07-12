import z from "zod";
import { ValidationSchema } from "@/components/form";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormRow } from "@/components/form-row";

export const stageThreeSchema = z.object({
  testi2: z.string().min(1, { message: "Testi2 is required." }),
});

export function StageThree({
  register,
  errors,
}: {
  register: UseFormRegister<ValidationSchema>;
  errors: FieldErrors<ValidationSchema>;
}) {
  return (
    <>
      <FormRow
        id="testi2"
        label="Testi2"
        errors={errors.testi2}
        inputProps={{
          id: "testi2",
          placeholder: "Testi2",
          ...register("testi2", { required: true }),
        }}
      />
    </>
  );
}
