import { useState } from "react";

export const useLoadingAndErrorMessages = (
  startLoadingMessage: string,
  startErrorMessage: string
) => {
  const [loadingMessage, setLoadingMessage] = useState(startLoadingMessage);
  const [errorMessage, setErrorMessage] = useState(startErrorMessage);

  return {
    loadingMessage,
    setLoadingMessage,
    errorMessage,
    setErrorMessage,
  };
};
