import { FieldError } from "react-hook-form";
import { PetitionField, PetitionFieldType } from "../../../../../../types";

const petitionFieldError = ["Answer required", "Choose option"];

export const validatePetitionField = (
  answer: string,
  type: PetitionFieldType
): number => {
  if (!answer) {
    if (type == "text") {
      return 0;
    } else {
      return 1;
    }
  }

  return -1;
};

export const createPetitionFieldError = (errorType: number) => {
  const error: FieldError = {
    type: "validate",
    message: petitionFieldError[errorType],
  };

  return error;
};

export const createPetitionAnswers = (
  fields: Array<PetitionField>,
  answers: { [key: number]: string }
) => {
  const answersDB = fields.map((field, index) => {
    const answer = {
      text: field.text,
      answer:
        field.type === "radio"
          ? field.options[parseInt(answers[index])].text
          : answers[index],
    };

    return answer;
  });

  return answersDB;
};
