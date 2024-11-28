import { StyleSheet, View } from "react-native";
import { FC, useEffect, useState } from "react";
import {
  Button,
  ErrorPage,
  LoadingWrapper,
  Typography,
} from "../../../../../../../components";
import {
  getPetitionAnswers,
  setPetitionStatus,
} from "../../../../../../../services";
import {
  PetitionAnswer,
  PetitionStatus,
  SignedPetitionsShelterFormat,
} from "../../../../../../../types";
import { theme } from "../../../../../../../constants/theme";

type PetitionApproveProps = {
  petition: SignedPetitionsShelterFormat;
  close: () => void;
};

export const PetitionApprove: FC<PetitionApproveProps> = ({
  petition,
  close,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading answers...");
  const [errorMessage, setErrorMessage] = useState(
    "Unable to load petition answers."
  );
  const [userAnswers, setUserAnswers] = useState<Array<PetitionAnswer>>([]);

  useEffect(() => {
    loadPetitionAnswers();
  }, []);

  const loadPetitionAnswers = async () => {
    setLoading(true);
    setError(false);
    try {
      const petitionAnswers = await getPetitionAnswers(
        petition.filledPetitionID
      );
      setUserAnswers(petitionAnswers);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const acceptPetition = () => {
    setLoadingMessage("Accepting...");
    changePetitionStatus("Accepted");
  };

  const pendingPetition = async () => {
    setLoadingMessage("Pending...");
    changePetitionStatus("Pending");
  };

  const declinePetition = async () => {
    setLoadingMessage("Declining...");
    changePetitionStatus("Declined");
  };

  const changePetitionStatus = async (status: PetitionStatus) => {
    setLoading(true);
    setError(false);
    try {
      await setPetitionStatus(petition.filledPetitionID, status);
      close();
    } catch (error) {
      setErrorMessage("Unable to change status");
      setError(true);
      setLoadingMessage("Loading answers...");
    } finally {
      setLoading(false);
    }
  };

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
