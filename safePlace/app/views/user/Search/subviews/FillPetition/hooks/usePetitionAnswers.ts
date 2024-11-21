import { useState } from "react";

export const usePetitionAnswers = (
  animalID: string,
  shelterID: string,
  userID: string
) => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleAnswerChange = (fieldId: number, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [fieldId]: value,
    }));
  };

  const submitPetition = () => {
    console.log(answers);
  };

  return {
    answers,
    handleAnswerChange,
    submitPetition,
  };
};
