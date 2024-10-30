import { useEffect, useState } from "react";
import { Button, CheckBox, Input, Typography } from "../../../../../components";
import { TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-radio-buttons-group";
import { theme } from "../../../../../constants/theme";
import { getPetition, savePetition } from "../../../../../services/petitions";
import { useAppSelector } from "../../../../../redux/hooks";
import { selectUserID } from "../../../../../redux/accountSlice";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export const EditPetition = () => {
  const userID = useAppSelector(selectUserID);
  const [addNew, setAddNew] = useState<boolean>(false);
  const [fields, setFields] = useState<Array<any>>([]);
  const [questionType, setQuestionType] = useState<string>("Text");
  const [questionText, setQuestionText] = useState("");
  const [radioOptions, setRadioOptions] = useState<string[]>([""]);
  const [selectedOptions, setSelectedOptions] = useState<boolean[]>([false]);

  useEffect(() => {
    if (!userID) {
      return;
    }

    (async () => {
      const x: Array<any> = await getPetition(userID);
      setFields(x);
    })();
  }, []);

  useEffect(() => {
    resetForm();
  }, [questionType]);

  const resetForm = () => {
    setFields([]);
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
      setFields([...fields, field]);
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

      setFields([...fields, field]);
    }

    setAddNew(false);
  };

  const save = () => {
    if (!userID) {
      return;
    }
    savePetition(fields, userID);
  };

  return (
    <>
      {!addNew && (
        <View style={{ gap: theme.spacing(3) }}>
          <View>
            {fields.map((field, index) => {
              return <Typography key={`TYPO-${index}`} text={field.text} />;
            })}
          </View>
          <Button text="New Field" onPress={() => setAddNew(true)} />
          <Button text="Save Petition" onPress={save} />
        </View>
      )}
      {addNew && (
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
                      key={index}
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
                      <TouchableOpacity
                        onPress={() => handleOptionDelete(index)}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          color={theme.colors["text-primary"]}
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
          <Button
            text="Cancel"
            onPress={() => {
              setAddNew(false);
            }}
            variant="secondary"
          />
        </View>
      )}
    </>
  );
};
