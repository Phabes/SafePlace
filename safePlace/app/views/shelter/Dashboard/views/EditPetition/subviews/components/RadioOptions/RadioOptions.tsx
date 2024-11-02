import { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Button,
  CheckBox,
  Icon,
  Input,
  Typography,
} from "../../../../../../../../components";
import { theme } from "../../../../../../../../constants/theme";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { PetitionRadioOption } from "../../../../../../../../types";

type RadioOptionsType = {
  radioOptions: Array<PetitionRadioOption>;
  handleAddOption: () => void;
  handleOptionChange: (index: number, values: string) => void;
  handleCheckboxChange: (index: number) => void;
  handleOptionDelete: (index: number) => void;
};

export const RadioOptions: FC<RadioOptionsType> = ({
  radioOptions,
  handleAddOption,
  handleOptionChange,
  handleCheckboxChange,
  handleOptionDelete,
}) => {
  return (
    <View style={styles.container}>
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
      <View style={styles.radioOptions}>
        {radioOptions.map((option, index) => (
          <View
            key={`RADIO-${index}`}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <View style={styles.inputContainer}>
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

const styles = StyleSheet.create({
  container: { gap: theme.spacing(1) },
  radioOptions: { gap: theme.spacing(1) },
  inputContainer: { flex: 1 },
});
