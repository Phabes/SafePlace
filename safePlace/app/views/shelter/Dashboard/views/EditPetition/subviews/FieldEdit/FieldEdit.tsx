import { StyleSheet, View } from "react-native";
import { FC } from "react";
import { Button, RadioBox, Typography } from "../../../../../../../components";
import { PetitionField } from "../../../../../../../types";
import { theme } from "../../../../../../../constants/theme";
import { RADIO_FIELD_TYPES } from "../../../../../../../constants/radioFieldTypes";
import { Question, RadioOptions } from "../components";
import { usePetitionRadioOptions, usePetitionFieldType } from "../hooks";
import { useInputValue } from "../../../../../../../components/Input/hooks";

type FieldEditProps = {
  close: () => void;
  editField: (field: PetitionField) => void;
  field: PetitionField;
};

export const FieldEdit: FC<FieldEditProps> = ({ close, editField, field }) => {
  const { fieldType, setFieldType } = usePetitionFieldType(field.type);
  const [questionText, setQuestionText] = useInputValue(field.text);
  const {
    radioOptions,
    setRadioOptions,
    handleAddOption,
    handleOptionChange,
    handleCheckboxChange,
    handleOptionDelete,
  } = usePetitionRadioOptions(field.type === "radio" ? field.options : []);

  const resetForm = () => {
    setQuestionText("");
    setRadioOptions([{ text: "", conforming: false }]);
  };

  const createFieldObject = () => {
    if (fieldType == "text") {
      const field: PetitionField = {
        type: fieldType,
        text: questionText,
      };

      editField(field);
    }

    if (fieldType === "radio") {
      if (!radioOptions.map((option) => option.conforming).includes(true)) {
        return;
      }

      const field: PetitionField = {
        type: fieldType,
        text: questionText,
        options: radioOptions,
      };

      editField(field);
    }

    close();
  };

  return (
    <View style={styles.container}>
      <View>
        <Typography text="Select Question Type:" />
        {RADIO_FIELD_TYPES.map((radio) => {
          return (
            <RadioBox
              key={`FIELD_TYPE-${radio.id}`}
              id={radio.id}
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
        <Button text="Edit Field" onPress={createFieldObject} />
        <Button text="Cancel" onPress={close} variant="secondary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: theme.spacing(3) },
  buttons: { gap: theme.spacing(2) },
});
