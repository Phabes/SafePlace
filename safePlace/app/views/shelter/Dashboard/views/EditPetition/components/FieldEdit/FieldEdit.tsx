import { TouchableOpacity, View } from "react-native";
import { FC, useState } from "react";
import {
  Button,
  CheckBox,
  Input,
  Typography,
} from "../../../../../../../components";
import { Field, PetitionRadioOption } from "../../../../../../../types";
import { theme } from "../../../../../../../constants/theme";
import { RadioButton } from "react-native-radio-buttons-group";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type FieldEditProps = {
  close: () => void;
  editField: (field: Field) => void;
  type: string;
  text: string;
  radios?: Array<PetitionRadioOption>;
};

export const FieldEdit: FC<FieldEditProps> = ({
  close,
  editField,
  type,
  text,
  radios = [],
}) => {
  const [questionType, setQuestionType] = useState<string>(type);
  const [questionText, setQuestionText] = useState(text);
  const [radioOptions, setRadioOptions] =
    useState<Array<PetitionRadioOption>>(radios);

  const resetForm = () => {
    setQuestionText("");
    setRadioOptions([{ text: "", conforming: false }]);
  };

  const handleAddOption = () => {
    setRadioOptions([...radioOptions, { text: "", conforming: false }]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...radioOptions];
    updatedOptions[index].text = value;
    setRadioOptions(updatedOptions);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedSelection = [...radioOptions];
    updatedSelection[index].conforming = !updatedSelection[index].conforming;
    setRadioOptions(updatedSelection);
  };

  const handleOptionDelete = (index: number) => {
    if (radioOptions.length === 1) {
      return;
    }

    setRadioOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
  };

  const createFieldObject = () => {
    if (questionType == "text") {
      const field: Field = {
        type: questionType,
        text: questionText,
      };

      editField(field);
    }

    if (questionType === "radio") {
      if (!radioOptions.map((option) => option.conforming).includes(true)) {
        return;
      }

      const field: Field = {
        type: questionType,
        text: questionText,
        options: radioOptions,
      };

      editField(field);
    }

    close();
  };
  return (
    <View style={{ gap: theme.spacing(3) }}>
      <View>
        <Typography text="Select Question Type:" />

        <RadioButton
          id="text"
          containerStyle={{ marginHorizontal: 0 }}
          borderColor={theme.colors["text-success"]}
          color={theme.colors["text-success"]}
          label="text"
          value="text"
          selected={"text" === questionType}
          onPress={(type) => {
            resetForm();
            setQuestionType(type);
          }}
        />

        <RadioButton
          id="radio"
          containerStyle={{ marginHorizontal: 0 }}
          borderColor={theme.colors["text-success"]}
          color={theme.colors["text-success"]}
          label="radio"
          value="radio"
          selected={"radio" === questionType}
          onPress={(type) => {
            resetForm();
            setQuestionType(type);
          }}
        />
      </View>

      {questionType === "text" && (
        <View>
          <Typography text="Question:" />
          <Input text={questionText} onChange={setQuestionText} />
        </View>
      )}

      {questionType === "radio" && (
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
                      text={option.text}
                      onChange={(value) => handleOptionChange(index, value)}
                    />
                  </View>
                  <CheckBox
                    checked={option.conforming}
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
      <Button text="Edit Field" onPress={createFieldObject} />
      <Button text="Cancel" onPress={close} variant="secondary" />
    </View>
  );
};
