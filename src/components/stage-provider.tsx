import { createContext, useContext, useState } from "react";

const stages = [
  {
    id: "stage-one",
    label: "Basic Details",
  },
  {
    id: "stage-two",
    label: "Some Details",
  },
  {
    id: "stage-three",
    label: "More Details",
  },
  {
    id: "stage-four",
    label: "Roblox Game",
  },
  {
    id: "stage-five",
    label: "More info about you",
  },
] as const;

export const StageContext = createContext({
  currentStage: 0,
  furthestStage: 0,
  stageCount: stages.length,
  finalStage: stages.length - 1,
  toNextStage: () => console.log("next stage"),
  toPrevStage: () => console.log("prev stage"),
});

export function StageProvider({ children }: { children: React.ReactNode }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [furthestStage, setFurthestStage] = useState(0);

  const toNextStage = () => {
    setCurrentStage((prev) => prev + 1);
    setFurthestStage((prev) => Math.max(prev, currentStage + 1));
  };

  const toPrevStage = () => {
    setCurrentStage((prev) => prev - 1);
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

  const isFirstStage = context.currentStage === 0;
  const isFinalStage = context.currentStage === context.finalStage;

  return {
    ...context,
    prevStage,
    currentStage,
    nextStage,
    furthestStage,
    isFirstStage,
    isFinalStage,
  };
}
