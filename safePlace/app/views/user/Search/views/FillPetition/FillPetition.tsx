import { FC } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  ErrorPage,
  FormLabel,
  Input,
  LoadingWrapper,
  RadioBox,
  Typography,
} from "../../../../../components";
import { theme } from "../../../../../constants/theme";
import { PetitionAnswer } from "../../../../../types";
import { usePetitionFieldsAndAnswers } from "./hooks";

type FillPetitionProps = {
  animalName: string;
  shelterID: string;
  onClose: (answers?: Array<PetitionAnswer>) => Promise<void>;
};

export const FillPetition: FC<FillPetitionProps> = ({
  animalName,
  shelterID,
  onClose,
}) => {
  const {
    loadingMessage,
    loading,
    errorMessage,
    error,
    setError,
    fields,
    answers,
    petitionErrors,
    handleAnswerChange,
    submitPetition,
  } = usePetitionFieldsAndAnswers(shelterID, onClose);

  if (error) {
    const errorButton =
      errorMessage === "Unable to load animal petition." ? (
        <Button text="Close" onPress={() => onClose()} />
      ) : (
        <Button text="Try again" onPress={() => setError(false)} />
      );

    return (
      <ErrorPage
        text={errorMessage}
        action="Please try again."
        button={errorButton}
      />
    );
  }

  return (
    <LoadingWrapper isLoading={loading} text={loadingMessage}>
      <View style={styles.container}>
        <Typography text={`Fill petition for: ${animalName}`} />
        {fields.map((field, index) => {
          return (
            <View key={`FIELD-${index}`}>
              <FormLabel text={field.text} errors={petitionErrors[index]} />
              {field.type === "text" ? (
                <Input
                  placeholder="Enter your response"
                  text={answers[index]}
                  onChange={(value) => handleAnswerChange(index, value)}
                />
              ) : field.type === "radio" ? (
                <View>
                  {field.options.map((option, radioIndex) => {
                    return (
                      <RadioBox
                        key={`RADIO-${index}-${radioIndex}`}
                        id={`RADIO-${index}-${radioIndex}`}
                        label={option.text}
                        value={radioIndex.toString()}
                        selected={answers[index] === radioIndex.toString()}
                        onPress={() => {
                          handleAnswerChange(index, radioIndex.toString());
                        }}
                      />
                    );
                  })}
                </View>
              ) : null}
            </View>
          );
        })}
        <Button text="Submit" onPress={submitPetition} />
        <Button text="Cancel" onPress={() => onClose()} variant="secondary" />
      </View>
    </LoadingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing(3),
  },
  fields: { gap: theme.spacing(1) },
});
