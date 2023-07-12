import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useStage } from "@/components/stage-provider";
import { StageOne, stageOneSchema } from "@/components/stages/stage-one";
import { StageTwo, stageTwoSchema } from "@/components/stages/stage-two";
import { StageThree, stageThreeSchema } from "./stages/stage-three";
import { StageFour, stageFourSchema } from "./stages/stage-four";
import { StageFive, stageFiveSchema } from "./stages/stage-five";

const validationSchema = stageOneSchema
  .and(stageTwoSchema)
  .and(stageThreeSchema)
  .and(stageFourSchema)
  .and(stageFiveSchema);

export type ValidationSchema = z.infer<typeof validationSchema>;

export function Form({
  onPassStage,
}: {
  onPassStage: (stage: number) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<ValidationSchema>({
    mode: "all",
    shouldFocusError: false,
    delayError: 0,
    resolver: zodResolver(validationSchema),
  });

  const { currentStage } = useStage();

  const onSubmit: SubmitHandler<ValidationSchema> = () => alert("you did it");

  return (
    <form
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      aria-autocomplete="none"
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      className="w-full max-w-2xl"
    >
      <Tabs value={currentStage.id}>
        <TabsContent value="stage-one">
          <StageOne
            touchedFields={touchedFields}
            register={register}
            errors={errors}
            onPassStage={() => onPassStage(0)}
          />
        </TabsContent>
        <TabsContent value="stage-two">
          <StageTwo
            touchedFields={touchedFields}
            register={register}
            errors={errors}
            onPassStage={() => onPassStage(1)}
          />
        </TabsContent>
        <TabsContent value="stage-three">
          <StageThree
            touchedFields={touchedFields}
            register={register}
            errors={errors}
            onPassStage={() => onPassStage(2)}
          />
        </TabsContent>
        <TabsContent value="stage-four">
          <StageFour
            touchedFields={touchedFields}
            register={register}
            errors={errors}
            onPassStage={() => onPassStage(3)}
          />
        </TabsContent>
        <TabsContent value="stage-five">
          <StageFive
            touchedFields={touchedFields}
            register={register}
            errors={errors}
            onPassStage={() => onPassStage(4)}
          />
        </TabsContent>
      </Tabs>
    </form>
  );
}
