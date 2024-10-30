import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Typography } from "../Typography";
import { Checkbox } from "react-native-paper";
import { theme } from "../../constants/theme";

export type CheckBoxProps = {
  checked: boolean;
  onPress: () => void;
  label?: string;
  disabled?: boolean;
};

export const CheckBox: FC<CheckBoxProps> = ({
  checked,
  onPress,
  label,
  disabled = false,
}) => {
  const color = theme.colors["text-success"];

  return (
    <View style={styles.container}>
      <Checkbox
        status={checked ? "checked" : "unchecked"}
        onPress={onPress}
        color={color}
        uncheckedColor={color}
        disabled={disabled}
      />
      {label && (
        <Typography
          text={label}
          variant="body-medium"
          color={disabled ? "text-secondary" : "text-primary"}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  label: {
    flex: 1,
  },
});
