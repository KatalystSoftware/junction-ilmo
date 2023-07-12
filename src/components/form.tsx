import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useStage } from "@/components/stage-provider";
import { StageOne, stageOneSchema } from "@/components/stages/stage-one";
import { StageTwo, stageTwoSchema } from "@/components/stages/stage-two";
import { StageThree, stageThreeSchema } from "./stages/stage-three";

const validationSchema = stageOneSchema
  .and(stageTwoSchema)
  .and(stageThreeSchema);

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
        <TabsContent value="stage-three">
          <StageThree register={register} errors={errors} />
        </TabsContent>
      </Tabs>
    </form>
  );
}
