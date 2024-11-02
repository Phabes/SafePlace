import { useState } from "react";
import { PetitionFieldType } from "../../../../../../../types";

export const usePetitionFieldType = (type: PetitionFieldType = "text") => {
  const [fieldType, setFieldType] = useState<PetitionFieldType>(type);

  return {
    fieldType,
    setFieldType,
  };
};
