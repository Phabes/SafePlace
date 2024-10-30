import { TouchableOpacity, View } from "react-native";
import { FC, useEffect, useState } from "react";
import {
  Button,
  CheckBox,
  Input,
  Typography,
} from "../../../../../../../components";
import { theme } from "../../../../../../../constants/theme";
import { RadioButton } from "react-native-radio-buttons-group";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type FieldAddProps = {
  close: () => void;
  addField: (field: any) => void;
};

export const FieldAdd: FC<FieldAddProps> = ({ close, addField }) => {
  const [questionType, setQuestionType] = useState<string>("Text");
  const [questionText, setQuestionText] = useState("");
  const [radioOptions, setRadioOptions] = useState<string[]>([""]);
  const [selectedOptions, setSelectedOptions] = useState<boolean[]>([false]);

  useEffect(() => {
    resetForm();
  }, [questionType]);

  const resetForm = () => {
    setQuestionText("");
    setRadioOptions([""]);
    setSelectedOptions([false]);
  };

  const handleAddOption = () => {
    setRadioOptions([...radioOptions, ""]);
    setSelectedOptions([...selectedOptions, false]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...radioOptions];
    updatedOptions[index] = value;
    setRadioOptions(updatedOptions);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedSelection = [...selectedOptions];
    updatedSelection[index] = !updatedSelection[index];
    setSelectedOptions(updatedSelection);
  };

  const handleOptionDelete = (index: number) => {
    if (radioOptions.length === 1) {
      return;
    }

    setRadioOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
    setSelectedOptions((prevSelected) =>
      prevSelected.filter((_, i) => i !== index)
    );
  };

  const createFieldObject = () => {
    if (questionType == "Text") {
      const field = {
        type: questionType,
        text: questionText,
      };

      addField(field);
    }

    if (questionType === "Radio") {
      if (!selectedOptions.includes(true)) {
        return;
      }

      const field = {
        type: questionType,
        text: questionText,
        options: radioOptions.map((option, index) => ({
          text: option,
          conforming: selectedOptions[index],
        })),
      };

      addField(field);
    }

    close();
  };
  return (
    <View style={{ gap: theme.spacing(3) }}>
      <View>
        <Typography text="Select Question Type:" />

        <RadioButton
          id="Text"
          containerStyle={{ marginHorizontal: 0 }}
          borderColor={theme.colors["text-success"]}
          color={theme.colors["text-success"]}
          label="Text"
          value="Text"
          selected={"Text" === questionType}
          onPress={setQuestionType}
        />

        <RadioButton
          id="Radio"
          containerStyle={{ marginHorizontal: 0 }}
          borderColor={theme.colors["text-success"]}
          color={theme.colors["text-success"]}
          label="Radio"
          value="Radio"
          selected={"Radio" === questionType}
          onPress={setQuestionType}
        />
      </View>

      {questionType === "Text" && (
        <View>
          <Typography text="Question:" />
          <Input text={questionText} onChange={setQuestionText} />
        </View>
      )}

      {questionType === "Radio" && (
        <View style={{ gap: theme.spacing(4) }}>
          <View>
            <Typography text="Question:" />
            <Input text={questionText} onChange={setQuestionText} />
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography text="Options:" />
              <Button
                text="Add Option"
                onPress={handleAddOption}
                size="small"
              />
            </View>
            <View style={{ gap: theme.spacing(1) }}>
              {radioOptions.map((option, index) => (
                <View
                  key={`RADIO-${index}`}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <View style={{ flex: 1 }}>
                    <Input
                      text={option}
                      onChange={(value) => handleOptionChange(index, value)}
                    />
                  </View>
                  <CheckBox
                    checked={selectedOptions[index]}
                    onPress={() => handleCheckboxChange(index)}
                  />
                  <TouchableOpacity onPress={() => handleOptionDelete(index)}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      color={theme.colors["text-success"]}
                      size={theme.spacing(8)}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
      <Button text="Add Field" onPress={createFieldObject} />
      <Button text="Cancel" onPress={close} variant="secondary" />
    </View>
  );
};
