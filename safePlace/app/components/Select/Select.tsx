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
  disabled?: boolean;
  value: string;
  onSelect: (value: string) => void;
};

export const Select: FC<SelectProps> = ({
  selectData,
  disabled = false,
  value,
  onSelect,
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
      placeholder={!isFocus ? "Select item" : ""}
      searchPlaceholder="Search..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        onSelect(item.value);
        setIsFocus(false);
      }}
      renderItem={(item) => (
        <View style={{ padding: theme.spacing(2), borderTopWidth: 1 }}>
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

  return StyleSheet.create({
    dropdown: {
      borderWidth: theme.spacing(1),
      borderColor: theme.colors[borderColor],
      padding: theme.spacing(1),
      borderRadius: theme.spacing(2),
    },
    selectedText: {
      color: theme.colors[selectedText],
    },
    // label: {
    //   position: "absolute",
    //   backgroundColor: "white",
    //   left: 22,
    //   top: 8,
    //   zIndex: 999,
    //   paddingHorizontal: 8,
    //   fontSize: 14,
    // },
    // placeholderStyle: {
    //   fontSize: 16,
    // },
    // selectedTextStyle: {
    //   fontSize: 16,
    // },
    // iconStyle: {
    //   width: 20,
    //   height: 20,
    // },
    // inputSearchStyle: theme.typography["body-small"],
  });
};
