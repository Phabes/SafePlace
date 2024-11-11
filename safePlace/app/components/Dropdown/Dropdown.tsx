import { FC, useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";


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
  
  return(
    <DropDownPicker
      placeholder={label}
      open={open}
      value={localValue}
      items={options}
      disabled={disabled}
      setOpen={setOpen}
      setValue={setLocalValue}
      listMode="SCROLLVIEW"
      closeOnBackPressed={true}
      dropDownContainerStyle={{
      }}
    />
  )
}