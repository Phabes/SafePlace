import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";
import { Typography } from "../Typography";
import { RadioButton } from "react-native-radio-buttons-group";

export type RadioBoxProps = {
  id: string;
  label: string;
  value: string;
  selected: boolean;
  onPress: (id: string) => void;
};

export const RadioBox: FC<RadioBoxProps> = ({
  id,
  label,
  value,
  selected,
  onPress,
}) => {
  return (
    <RadioButton
      id={id}
      containerStyle={styles.container}
      borderColor={theme.colors["text-success"]}
      color={theme.colors["text-success"]}
      label={<Typography text={label} variant="body-small" />}
      value={value}
      selected={selected}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 0, gap: theme.spacing(3) },
});
