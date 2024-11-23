import { useState } from "react";
import { PetitionField } from "../../../../../../types";
import { createPetitionFieldError, validatePetitionField } from "../utils";
import { FieldError } from "react-hook-form";

export const usePetitionAnswers = (
  animalID: string,
  shelterID: string,
  userID: string,
  fields: Array<PetitionField>
) => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [petitionErros, setPetitionErrors] = useState<{
    [key: number]: FieldError;
  }>({});

  const handleAnswerChange = (fieldID: number, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [fieldID]: value,
    }));

    if (!petitionErros[fieldID]) {
      return;
    }
    setPetitionErrors((prevPetitionErrors) => {
      const { [fieldID]: _, ...rest } = prevPetitionErrors;
      return rest;
    });
  };

  const submitPetition = () => {
    const errors: { [key: number]: FieldError } = {};

    fields.forEach((field, index) => {
      const errorType = validatePetitionField(answers[index], field.type);
      if (errorType !== -1) {
        const error = createPetitionFieldError(errorType);
        errors[index] = error;
      }
    });

    setPetitionErrors(errors);
  };

  return {
    answers,
    petitionErros,
    handleAnswerChange,
    submitPetition,
  };
};
