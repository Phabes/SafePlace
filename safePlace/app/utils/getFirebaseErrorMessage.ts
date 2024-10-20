import { FieldError } from "react-hook-form";

export const getFirebaseErrorMessage = (code: string) => {
  const message =
    code === "auth/invalid-credential"
      ? "Invalid credentials"
      : code === "auth/email-already-in-use"
      ? "Email already in use"
      : code;

  const FieldError: FieldError = {
    type: "validate",
    message,
  };

  return FieldError;
};
