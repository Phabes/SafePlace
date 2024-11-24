import { useState } from "react";
import { PetitionAnswer, PetitionField } from "../../../../../../types";
import {
  createPetitionAnswers,
  createPetitionFieldError,
  validatePetitionField,
} from "../utils";
import { FieldError } from "react-hook-form";

export const usePetitionAnswers = (
  fields: Array<PetitionField>,
  onClose: (answers?: Array<PetitionAnswer>) => void
) => {
  const [loadingFill, setLoadingFill] = useState(false);
  const [errorFill, setErrorFill] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [petitionErrors, setPetitionErrors] = useState<{
    [key: number]: FieldError;
  }>({});

  const handleAnswerChange = (fieldID: number, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [fieldID]: value,
    }));

    if (!petitionErrors[fieldID]) {
      return;
    }
    setPetitionErrors((prevPetitionErrors) => {
      const { [fieldID]: _, ...rest } = prevPetitionErrors;
      return rest;
    });
  };

  const submitPetition = async () => {
    const errors: { [key: number]: FieldError } = {};

    fields.forEach((field, index) => {
      const errorType = validatePetitionField(answers[index], field.type);
      if (errorType !== -1) {
        const error = createPetitionFieldError(errorType);
        errors[index] = error;
      }
    });

    setPetitionErrors(errors);

    const errorsExist = Object.keys(errors).length > 0;
    if (errorsExist) {
      return;
    }

    const answersDB = createPetitionAnswers(fields, answers);
    setLoadingFill(true);
    setErrorFill(false);
    try {
      onClose(answersDB);
    } catch (error) {
      setErrorFill(true);
    } finally {
      setLoadingFill(false);
    }
  };

  return {
    answers,
    loadingFill,
    errorFill,
    petitionErrors,
    handleAnswerChange,
    submitPetition,
    setErrorFill,
  };
};
