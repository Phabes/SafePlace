import { useEffect, useState } from "react";
import { PetitionAnswer, PetitionField } from "../../../../../../types";
import {
  createPetitionAnswers,
  createPetitionFieldError,
  validatePetitionField,
} from "../utils";
import { FieldError } from "react-hook-form";
import { getPetition } from "../../../../../../services";
import { useLoadingAndErrorMessages } from "../../../../../../hooks";

export const usePetitionFieldsAndAnswers = (
  userID: string,
  onClose: (answers?: Array<PetitionAnswer>) => Promise<void>
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fields, setFields] = useState<Array<PetitionField>>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [petitionErrors, setPetitionErrors] = useState<{
    [key: number]: FieldError;
  }>({});
  const { loadingMessage, setLoadingMessage, errorMessage, setErrorMessage } =
    useLoadingAndErrorMessages(
      "Loading petition...",
      "Unable to load animal petition."
    );

  useEffect(() => {
    loadPetitionFields();
  }, []);

  const loadPetitionFields = () => {
    setLoadingMessage("Loading petition...");
    setLoading(true);
    setError(false);
    (async () => {
      try {
        const dbPetitionFields = await getPetition(userID);
        setFields(dbPetitionFields);
      } catch (error) {
        setErrorMessage("Unable to load animal petition.");
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  };

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
    setLoadingMessage("Signing petition...");
    setLoading(true);
    setError(false);
    try {
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
      await onClose(answersDB);
    } catch (error) {
      setErrorMessage("Unable to sign petition.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    loadingMessage,
    loading,
    errorMessage,
    error,
    setError,
    fields,
    answers,
    petitionErrors,
    handleAnswerChange,
    submitPetition,
  };
};
