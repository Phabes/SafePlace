import { useCallback, useState } from "react";

export const useInputValue = (
  defaultValue = ""
): [string, (value: string) => void] => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const onChange = useCallback(
    (value: string) => setInputValue(value),
    [setInputValue]
  );

  return [inputValue, onChange];
};
