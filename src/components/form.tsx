import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormRow } from "@/components/form-row";

const validationSchema = z
  .object({
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
  })
  .refine((data) => data.email === data.confirmEmail, {
    path: ["confirmEmail"],
    message: "Emails must match",
  });

type ValidationSchema = z.infer<typeof validationSchema>;

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    mode: "all",
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  return (
    <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
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
    </form>
  );
}
