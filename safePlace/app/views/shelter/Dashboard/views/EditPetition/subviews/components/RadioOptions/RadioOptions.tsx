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
import { PetitionRadioOption } from "../../../../../../../../types";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
      <View style={styles.radioTitle}>
        <Typography text="Options:" />
        <Button text="Add Option" onPress={handleAddOption} size="small" />
      </View>
      <View style={styles.radioOptions}>
        {radioOptions.map((option, index) => (
          <View key={`RADIO-${index}`} style={styles.radioOption}>
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
  radioTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  radioOptions: { gap: theme.spacing(1) },
  radioOption: { flexDirection: "row", alignItems: "center" },
  inputContainer: { flex: 1 },
});
