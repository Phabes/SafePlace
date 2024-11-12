import React, { FC, useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, View } from "react-native";
import { Typography } from "../Typography/Typography";
import { theme } from "../../constants/theme";
import { Dropdown } from "react-native-element-dropdown";
import { SelectData } from "../../types";

export type SelectProps = {
  selectData: Array<SelectData>;
  value: string;
  onSelect: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
};

export const Select: FC<SelectProps> = ({
  selectData,
  value,
  onSelect,
  disabled = false,
  placeholder = "",
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const styles = useStyles(isFocus, disabled);

  return (
    <Dropdown
      style={styles.dropdown}
      data={selectData}
      disable={disabled}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? placeholder : ""}
      placeholderStyle={styles.placeholder}
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        onSelect(item.value);
        setIsFocus(false);
      }}
      renderItem={(item) => (
        <View style={styles.option}>
          <Typography
            variant="body-large"
            text={item.label}
            color={disabled ? "background-disabled" : "text-primary"}
          />
        </View>
      )}
      selectedTextStyle={styles.selectedText}
      renderRightIcon={() => (
        <FontAwesomeIcon
          icon={faChevronDown}
          size={theme.spacing(8)}
          style={styles.selectedText}
        />
      )}
    />
  );
};

const useStyles = (isFocus: boolean, disabled: SelectProps["disabled"]) => {
  const borderColor = disabled
    ? "background-disabled"
    : isFocus
    ? "action-selected"
    : "background-subtle";
  const selectedText = disabled ? "background-disabled" : "text-primary";
  const placeholderText = disabled ? "background-disabled" : "text-secondary";

  return StyleSheet.create({
    dropdown: {
      borderWidth: theme.spacing(1),
      borderColor: theme.colors[borderColor],
      paddingHorizontal: theme.spacing(4),
      paddingVertical: theme.spacing(1),
      borderRadius: theme.spacing(2),
    },
    placeholder: {
      textTransform: "capitalize",
      color: theme.colors[placeholderText],
    },
    option: { padding: theme.spacing(2), borderTopWidth: 1 },
    selectedText: {
      color: theme.colors[selectedText],
    },
  });
};
