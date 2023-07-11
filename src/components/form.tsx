import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { StageOne } from "@/components/stages/stage-one";
import { useStage } from "@/components/stage-provider";
import { StageTwo } from "@/components/stages/stage-two";

const validationSchema = z
  .object({
    /** Stage One */
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
    /** Stage Two */
    testi: z.string().min(1, { message: "Testi is required." }),
  })
  /** Stage One */
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

export type ValidationSchema = z.infer<typeof validationSchema>;

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    mode: "all",
  });

  const { currentStage } = useStage();

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  return (
    <form
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      className="w-full max-w-2xl"
    >
      <Tabs value={currentStage.id}>
        <TabsContent value="stage-one">
          <StageOne register={register} errors={errors} />
        </TabsContent>
        <TabsContent value="stage-two">
          <StageTwo register={register} errors={errors} />
        </TabsContent>
      </Tabs>
    </form>
  );
}
