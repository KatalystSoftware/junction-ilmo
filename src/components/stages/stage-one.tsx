import z from "zod";
import { ValidationSchema } from "@/components/form";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormRow } from "@/components/form-row";
import { useEffect } from "react";

const stageFields = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email" }),
  confirmEmail: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required." }),
});

export const stageOneSchema = stageFields
  .refine((data) => data.firstName !== data.lastName, {
    path: ["lastName"],
    message: "First name and last name must be different",
  })
  .refine(
    (data) =>
      data.email.startsWith(
        `${data.firstName.toLocaleLowerCase()}.${data.lastName.toLocaleLowerCase()}`,
      ),
    {
      path: ["email"],
      message: "Email must start with first name.last name",
    },
  )
  .refine((data) => data.email !== data.confirmEmail, {
    path: ["confirmEmail"],
    message: "Confirmation email must be different from email",
  });

const stageSchemaKeys = Object.keys(stageFields.shape);

export function StageOne({
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
        id="first-name"
        label="First Name"
        errors={errors.firstName}
        inputProps={{
          id: "first-name",
          placeholder: "First Name",
          ...register("firstName", { required: true }),
        }}
      />
      <FormRow
        id="last-name"
        label="Last Name"
        errors={errors.lastName}
        inputProps={{
          id: "last-name",
          placeholder: "Last Name",
          ...register("lastName", { required: true }),
        }}
      />
      <FormRow
        id="email"
        label="Email"
        errors={errors.email}
        inputProps={{
          id: "email",
          type: "email",
          placeholder: "Email",
          ...register("email", { required: true }),
        }}
      />
      <FormRow
        id="confirm-email"
        label="Confirm Email"
        errors={errors.confirmEmail}
        inputProps={{
          id: "confirm-email",
          type: "email",
          placeholder: "Confirm Email",
          ...register("confirmEmail", { required: true }),
        }}
      />
      <FormRow
        id="phone-number"
        label="Phone Number"
        errors={errors.phoneNumber}
        inputProps={{
          id: "phone-number",
          type: "tel",
          placeholder: "Phone Number",
          ...register("phoneNumber", { required: true }),
        }}
      />
    </>
  );
}
