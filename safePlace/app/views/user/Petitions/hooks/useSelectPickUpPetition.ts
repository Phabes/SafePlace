import { useState } from "react";
import { SignedPetitionsUserFormat } from "../../../../types";

export const useSelectPickUpPetition = () => {
  const [selectedPetition, setSelectedPetition] =
    useState<SignedPetitionsUserFormat>();

  return {
    selectedPetition,
    setSelectedPetition,
  };
};
