import { FC, useState } from "react";
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
import { usePetitionAnswers, usePetitionFields } from "./hooks";
import { theme } from "../../../../../constants/theme";

type FillPetitionProps = {
  animalID: string;
  shelterID: string;
  userID: string;
  onClose: () => void;
};

export const FillPetition: FC<FillPetitionProps> = ({
  animalID,
  shelterID,
  userID,
  onClose,
}) => {
  const { loading, error, fields } = usePetitionFields(shelterID);
  const { answers, petitionErros, handleAnswerChange, submitPetition } =
    usePetitionAnswers(animalID, shelterID, userID, fields);

  if (error) {
    return (
      <ErrorPage
        text="Unable to load animal petition."
        action="Please try again."
        button={<Button text="Close" onPress={onClose} />}
      />
    );
  }

  return (
    <LoadingWrapper isLoading={loading} text="Loading petition...">
      <View style={styles.container}>
        <Typography text="Fill petition:" />
        {fields.map((field, index) => {
          return (
            <View key={`FIELD-${index}`}>
              <FormLabel text={field.text} errors={petitionErros[index]} />
              {field.type === "text" ? (
                <Input
                  placeholder="Enter your response"
                  text={answers[index]}
                  onChange={(value) => handleAnswerChange(index, value)}
                />
              ) : field.type === "radio" ? (
                <>
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
                </>
              ) : null}
            </View>
          );
        })}
        <Button text="Submit" onPress={submitPetition} />
        <Button text="Cancel" onPress={onClose} variant="secondary" />
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
