import { theme } from "@/app/constants/theme";
import { FC, useCallback, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputEndEditingEventData,
  TextInputFocusEventData,
} from "react-native";

type InputProps = {
  text: string;
  keyboardType?: "default" | "numeric";
  placeholder?: string;
  disabled?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  variant?: "default" | "error";
  centerText?: boolean;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
};

export const Input: FC<InputProps> = ({
  text,
  disabled = false,
  keyboardType = "default",
  placeholder = "",
  autoCapitalize = "sentences",
  variant = "default",
  centerText = false,
  onChange,
  onBlur,
}) => {
  const [type, setType] = useState<InputProps["variant"] | "active">(variant);

  const onChangeInput = useCallback(
    (value: string) => {
      onChange(value);
    },
    [onChange]
  );

  const onFocusInput = useCallback(() => {
    setType("active");
  }, []);

  const onBlurInput = useCallback(
    (value: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
      setType(variant);
      onBlur?.(value.nativeEvent.text);
    },
    [variant, onBlur]
  );

  const styles = useStyles(type, disabled, text, centerText);

  return (
    <TextInput
      placeholder={placeholder}
      value={text}
      keyboardType={keyboardType}
      onChangeText={onChangeInput}
      onFocus={onFocusInput}
      onEndEditing={onBlurInput}
      editable={!disabled}
      autoCapitalize={autoCapitalize}
      style={[styles.input, theme.typography["body-medium"]]}
    />
  );
};

const useStyles = (
  type: InputProps["variant"] | "active",
  disabled: InputProps["disabled"],
  text: InputProps["text"],
  centerText: InputProps["centerText"]
) => {
  const borderColor =
    type == "default"
      ? "background-subtle"
      : type == "active"
      ? "action-selected"
      : type == "error"
      ? "text-error"
      : "background-subtle";
  const textColor = disabled
    ? "text-disabled"
    : text != ""
    ? "text-primary"
    : "text-secondary";
  const elevation = !disabled ? 2 : 1;
  const textAlign = centerText ? "center" : "left";

  return StyleSheet.create({
    input: {
      color: theme.colors[textColor],
      borderColor: theme.colors[borderColor],
      borderWidth: 1,
      elevation,
      borderRadius: theme.spacing(2),
      paddingHorizontal: theme.spacing(4),
      paddingVertical: theme.spacing(2),
      backgroundColor: theme.colors["background-primary"],
      textAlign,
    },
  });
};
