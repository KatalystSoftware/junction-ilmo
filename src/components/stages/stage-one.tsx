import { ValidationSchema } from "@/components/form";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormRow } from "@/components/form-row";

export function StageOne({
  register,
  errors,
}: {
  register: UseFormRegister<ValidationSchema>;
  errors: FieldErrors<ValidationSchema>;
}) {
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
