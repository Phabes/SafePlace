import React, { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Typography } from "../Typography";
import { theme } from "../../constants/theme";

export type ButtonProps = {
  text: string;
  onPress: (...args: any) => any;
  size?: "small" | "medium" | "large";
  variant?: "default" | "secondary" | "error";
  disabled?: boolean;
  hasFullWidth?: boolean;
};

export const Button: FC<ButtonProps> = ({
  text,
  onPress,
  size = "medium",
  variant = "default",
  disabled = false,
  hasFullWidth = false,
}) => {
  const styles = useStyles(variant, size, disabled);
  const textColor = disabled ? "text-secondary" : "text-primary";

  return (
    <TouchableOpacity
      style={[styles.container, hasFullWidth && styles.fullWidth]}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <Typography text={text} color={textColor} />
    </TouchableOpacity>
  );
};

const useStyles = (
  variant: ButtonProps["variant"],
  size: ButtonProps["size"],
  disabled: ButtonProps["disabled"]
) => {
  const buttonColor = disabled
    ? "background-subtle"
    : variant === "default"
    ? "text-success"
    : variant === "secondary"
    ? "background-primary"
    : "text-error";
  const buttonSize = size === "large" ? 4 : size === "medium" ? 3 : 2;
  const borderWidth = variant === "secondary" ? theme.spacing(0.5) : 0;
  const borderStyles =
    variant === "secondary"
      ? {
          borderWidth,
          borderColor: theme.colors["text-success"],
        }
      : {};

  return StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors[buttonColor],
      paddingHorizontal: theme.spacing(buttonSize * 2) - borderWidth,
      paddingVertical: theme.spacing(buttonSize) - borderWidth,
      borderRadius: theme.spacing(buttonSize),
      ...borderStyles,
    },
    fullWidth: {
      width: "100%",
    },
  });
};
