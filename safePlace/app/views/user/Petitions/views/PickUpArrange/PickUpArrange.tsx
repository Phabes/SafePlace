import { FC } from "react";
import { SignedPetitionsUserFormat } from "../../../../../types";
import {
  Button,
  ErrorPage,
  LoadingWrapper,
  Typography,
} from "../../../../../components";
import { StyleSheet, View } from "react-native";
import { theme } from "../../../../../constants/theme";
import { usePickUpData } from "./hooks";

type PickUpArrangeProps = {
  petition: SignedPetitionsUserFormat;
  close: () => void;
};

export const PickUpArrange: FC<PickUpArrangeProps> = ({ petition, close }) => {
  const {
    loading,
    error,
    loadingMessage,
    errorMessage,
    petitionCoreData,
    loadPickUpData,
  } = usePickUpData(petition.filledPetitionID, close);

  if (error) {
    return (
      <ErrorPage
        text={errorMessage}
        action="Please reload."
        button={<Button text="Reload" onPress={loadPickUpData} />}
      />
    );
  }

  return (
    <LoadingWrapper isLoading={loading} text={loadingMessage}>
      <View style={styles.container}>
        <Typography text={`User: ${petitionCoreData?.userName}`} />
        <Typography text={`Shelter: ${petitionCoreData?.shelterName}`} />
        <Typography text={`Animal: ${petitionCoreData?.animalName}`} />

        <View style={styles.buttons}>
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
