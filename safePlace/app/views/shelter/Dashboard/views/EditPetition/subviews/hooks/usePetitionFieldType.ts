import { useState } from "react";
import { FieldType } from "../../../../../../../types";

export const usePetitionFieldType = (type: FieldType = "text") => {
  const [fieldType, setFieldType] = useState<FieldType>(type);

  return {
    fieldType,
    setFieldType,
  };
};
