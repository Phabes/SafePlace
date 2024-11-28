import { StyleSheet, View } from "react-native";
import { FC } from "react";
import {
  Button,
  ErrorPage,
  LoadingWrapper,
  Typography,
} from "../../../../../../../components";
import { SignedPetitionsShelterFormat } from "../../../../../../../types";
import { theme } from "../../../../../../../constants/theme";
import { useShelterPetitionAnswers } from "./hooks";

type PetitionApproveProps = {
  petition: SignedPetitionsShelterFormat;
  close: () => void;
};

export const PetitionApprove: FC<PetitionApproveProps> = ({
  petition,
  close,
}) => {
  const {
    loading,
    error,
    loadingMessage,
    errorMessage,
    loadPetitionAnswers,
    userAnswers,
    acceptPetition,
    pendingPetition,
    declinePetition,
  } = useShelterPetitionAnswers(petition, close);

  if (error) {
    return (
      <ErrorPage
        text={errorMessage}
        action="Please reload."
        button={<Button text="Reload" onPress={loadPetitionAnswers} />}
      />
    );
  }

  return (
    <LoadingWrapper isLoading={loading} text={loadingMessage}>
      <View style={styles.container}>
        <Typography text={`Current status: ${petition.status}`} />

        <Typography text="Answers:" />
        {userAnswers.map((userAnswer, index) => {
          return (
            <View key={`ANSWER-${index}`}>
              <Typography
                text={`${index + 1}. ${userAnswer.text}`}
                variant="body-small"
              />
              <Typography text={userAnswer.answer} />
            </View>
          );
        })}

        <View style={styles.buttons}>
          <Button text="Accept" onPress={acceptPetition} />
          <Button text="Pending" onPress={pendingPetition} />
          <Button text="Decline" onPress={declinePetition} />
          <Button text="Back" onPress={close} variant="secondary" />
        </View>
      </View>
    </LoadingWrapper>
  );
};

const styles = StyleSheet.create({
  container: { gap: theme.spacing(2) },
  buttons: { gap: theme.spacing(2) },
});
