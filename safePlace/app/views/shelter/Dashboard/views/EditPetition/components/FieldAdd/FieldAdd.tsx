import { StyleSheet, View } from "react-native";
import { FC } from "react";
import { Button, Typography } from "../../../../../../../components";
import { Field } from "../../../../../../../types";
import { theme } from "../../../../../../../constants/theme";
import { RadioButton } from "react-native-radio-buttons-group";
import { RADIO_FIELD_TYPES } from "../../../../../../../constants/radioFieldTypes";
import { Question, RadioOptions } from "../components";
import { usePetitionRadioOptions, usePetitionFieldType } from "../hooks";
import { useInputValue } from "../../../../../../../components/Input/hooks";

type FieldAddProps = {
  close: () => void;
  addField: (field: Field) => void;
};

export const FieldAdd: FC<FieldAddProps> = ({ close, addField }) => {
  const { fieldType, setFieldType } = usePetitionFieldType();
  const [questionText, setQuestionText] = useInputValue();
  const {
    radioOptions,
    setRadioOptions,
    handleAddOption,
    handleOptionChange,
    handleCheckboxChange,
    handleOptionDelete,
  } = usePetitionRadioOptions();

  const resetForm = () => {
    setQuestionText("");
    setRadioOptions([{ text: "", conforming: false }]);
  };

  const createFieldObject = () => {
    if (fieldType == "text") {
      const field: Field = {
        type: fieldType,
        text: questionText,
      };

      addField(field);
    }

    if (fieldType === "radio") {
      if (!radioOptions.map((option) => option.conforming).includes(true)) {
        return;
      }

      const field: Field = {
        type: fieldType,
        text: questionText,
        options: radioOptions,
      };

      addField(field);
    }

    close();
  };
  return (
    <View style={styles.container}>
      <View>
        <Typography text="Select Question Type:" />
        {RADIO_FIELD_TYPES.map((radio) => {
          return (
            <RadioButton
              key={`FIELD_TYPE-${radio.id}`}
              id={radio.id}
              containerStyle={{ marginHorizontal: 0 }}
              borderColor={theme.colors["text-success"]}
              color={theme.colors["text-success"]}
              label={radio.label}
              value={radio.value}
              selected={radio.value === fieldType}
              onPress={() => {
                resetForm();
                setFieldType(radio.value);
              }}
            />
          );
        })}
      </View>

      {fieldType === "text" && (
        <Question
          questionText={questionText}
          setQuestionText={setQuestionText}
        />
      )}

      {fieldType === "radio" && (
        <>
          <Question
            questionText={questionText}
            setQuestionText={setQuestionText}
          />
          <RadioOptions
            radioOptions={radioOptions}
            handleAddOption={handleAddOption}
            handleOptionChange={handleOptionChange}
            handleCheckboxChange={handleCheckboxChange}
            handleOptionDelete={handleOptionDelete}
          />
        </>
      )}

      <View style={styles.buttons}>
        <Button text="Add Field" onPress={createFieldObject} />
        <Button text="Cancel" onPress={close} variant="secondary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: theme.spacing(3) },
  buttons: { gap: theme.spacing(2) },
});
