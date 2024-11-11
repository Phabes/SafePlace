import { FC, useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {
  StyleSheet
} from "react-native";
import { theme } from "../../constants/theme";


export type DropdownProps = {
  onChange: (value:any) => void;
  options:any;
  value:string|undefined;
  label?: string;
  disabled?: boolean;
};

export const Dropdown: FC<DropdownProps> = ({
  onChange,
  options,
  value,
  label="",
  disabled=false
}) =>{
  const [open, setOpen] = useState(false);
  const [localValue,setLocalValue] = useState<string>(value?value:"");

  useEffect(()=>{
    onChange(localValue);
  },[localValue])
  
  const placeholderStyles = {
    color: theme.colors["text-disabled"],
    elevation: 1,
    ...theme.typography["body-medium"]
  }

  const textStyle = {
    color: theme.colors["text-primary"],
    elevation: 1,
    ...theme.typography["body-medium"]
  }
  const styles = useStyles(open, disabled);

  return(
    <DropDownPicker
      placeholder={label}
      open={open}
      value={localValue}
      items={options}
      disabled={disabled}
      onPress={(e)=>{console.log(e)}}
      setOpen={setOpen}
      setValue={setLocalValue}
      listMode="SCROLLVIEW"
      closeOnBackPressed={true}
      dropDownContainerStyle={styles.input}
      style={styles.input}
      placeholderStyle={placeholderStyles}
      textStyle={textStyle}
      />
  )
}


const useStyles = (
  isActive: boolean,
  disabled: boolean,
) => {
  const borderColor =
    isActive ? "action-selected":"background-subtle"

  const textColor = disabled
    ? "text-disabled"
    :  "text-primary";
  const elevation = !disabled ? 2 : 1;

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
    },
  });
};
