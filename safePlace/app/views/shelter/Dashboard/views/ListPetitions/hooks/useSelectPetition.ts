import { useState } from "react";
import { SignedPetitionsShelterFormat } from "../../../../../../types";

export const useSelectPetition = () => {
  const [selectedPetition, setSelectedPetition] =
    useState<SignedPetitionsShelterFormat>();

  return {
    selectedPetition,
    setSelectedPetition,
  };
};
