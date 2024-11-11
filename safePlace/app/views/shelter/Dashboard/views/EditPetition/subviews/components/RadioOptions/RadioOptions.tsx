import { TouchableOpacity, View } from "react-native";
import {
  Button,
  CheckBox,
  Icon,
  Input,
  Typography,
} from "../../../../../../../../components";
import { theme } from "../../../../../../../../constants/theme";
import { FC } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { PetitionRadioOption } from "../../../../../../../../types";

export const RadioOptions: FC<{
  radioOptions: Array<PetitionRadioOption>;
  handleAddOption: () => void;
  handleOptionChange: (index: number, values: string) => void;
  handleCheckboxChange: (index: number) => void;
  handleOptionDelete: (index: number) => void;
}> = ({
  radioOptions,
  handleAddOption,
  handleOptionChange,
  handleCheckboxChange,
  handleOptionDelete,
}) => {
  return (
    <View style={{ gap: theme.spacing(1) }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography text="Options:" />
        <Button text="Add Option" onPress={handleAddOption} size="small" />
      </View>
      <View style={{ gap: theme.spacing(1) }}>
        {radioOptions.map((option, index) => (
          <View
            key={`RADIO-${index}`}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <View style={{ flex: 1 }}>
              <Input
                text={option.text}
                onChange={(value) => handleOptionChange(index, value)}
              />
            </View>
            <CheckBox
              checked={option.conforming}
              onPress={() => handleCheckboxChange(index)}
            />
            <TouchableOpacity onPress={() => handleOptionDelete(index)}>
              <Icon icon={faTrash} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};
