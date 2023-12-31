import { createContext, useContext, useState } from "react";

const stages = [
  {
    id: "stage-one",
    label: "Basic Details",
  },
  {
    id: "stage-two",
    label: "Prove Your Motivation",
  },
  {
    id: "stage-three",
    label: "Previous Experience",
  },
  {
    id: "stage-four",
    label: "Roblox Game",
  },
  {
    id: "stage-five",
    label: "Personality Traits",
  },
] as const;

export const StageContext = createContext({
  currentStage: 0,
  furthestStage: 0,
  stageCount: stages.length,
  finalStage: stages.length - 1,
  toNextStage: () => console.log("next stage"),
  toPrevStage: () => console.log("prev stage"),
  onPassStage: (stage: number) => console.log("pass stage", stage),
});

export function StageProvider({ children }: { children: React.ReactNode }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [furthestStage, setFurthestStage] = useState(0);

  const toNextStage = () => {
    setCurrentStage((prev) => prev + 1);
  };

  const toPrevStage = () => {
    setCurrentStage((prev) => prev - 1);
  };

  const onPassStage = (stage: number) => {
    setFurthestStage((prev) => Math.max(prev, stage + 1));
  };

  return (
    <StageContext.Provider
      value={{
        currentStage,
        furthestStage,
        stageCount: stages.length,
        finalStage: stages.length - 1,
        toNextStage,
        toPrevStage,
        onPassStage,
      }}
    >
      {children}
    </StageContext.Provider>
  );
}

export function useStage() {
  const context = useContext(StageContext);

  const prevStage = stages[Math.max(0, context.currentStage - 1)];
  const currentStage = stages[context.currentStage];
  const nextStage =
    stages[Math.min(context.currentStage + 1, context.stageCount - 1)];
  const furthestStage = stages[context.furthestStage];
  const finalStage = stages[context.finalStage];

  const isFirstStage = context.currentStage === 0;
  const isFinalStage = context.currentStage === context.finalStage;

  return {
    ...context,
    prevStage,
    currentStage,
    nextStage,
    finalStage,
    furthestStage,
    isFirstStage,
    isFinalStage,
  };
}
