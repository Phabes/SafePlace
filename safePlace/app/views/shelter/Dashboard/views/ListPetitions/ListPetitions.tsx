import { StyleSheet, View } from "react-native";
import {
  Button,
  ErrorPage,
  ListItem,
  LoadingWrapper,
  Typography,
} from "../../../../../components";
import { theme } from "../../../../../constants/theme";
import { useAppSelector } from "../../../../../redux/hooks";
import { selectUserID } from "../../../../../redux/accountSlice";
import { useSelectPetition, useShelterPetitionsData } from "./hooks";
import { PETITION_STATUSES_SHELTER } from "../../../../../constants/petitionStatuses";
import { groupPetitionsByStatus } from "../../../../../utils";
import { SignedPetitionsShelterFormat } from "../../../../../types";
import { PetitionApprove } from "./subviews";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const ListPetitions = () => {
  const userID = useAppSelector(selectUserID);
  const { loading, error, petitionData, loadPetitionsData } =
    useShelterPetitionsData(userID);
  const { selectedPetition, setSelectedPetition } = useSelectPetition();

  const groupedPetitions = groupPetitionsByStatus(
    petitionData,
    PETITION_STATUSES_SHELTER
  ) as {
    [key: string]: SignedPetitionsShelterFormat[];
  };

  const closeApproveView = () => {
    loadPetitionsData();
    setSelectedPetition(undefined);
  };

  const changeSelectedPetition = (petition: SignedPetitionsShelterFormat) => {
    setSelectedPetition(petition);
  };

  if (error) {
    return (
      <ErrorPage
        text="Unable to load signed petitions."
        action="Please reload."
        button={<Button text="Reload" onPress={loadPetitionsData} />}
      />
    );
  }

  return (
    <LoadingWrapper isLoading={loading} text="Loading animals...">
      <View style={styles.container}>
        {selectedPetition ? (
          <PetitionApprove
            petition={selectedPetition}
            close={closeApproveView}
          />
        ) : (
          PETITION_STATUSES_SHELTER.map((status) => {
            if (groupedPetitions[status].length == 0) {
              return null;
            }

            return (
              <View key={`PETITION-GROUP-${status}`} style={styles.fields}>
                <Typography text={`${status}:`} />
                {groupedPetitions[status].map((petition, index) => {
                  const buttons =
                    petition.status !== "Done"
                      ? [
                          {
                            onPress: () => changeSelectedPetition(petition),
                            icon: faMagnifyingGlass,
                          },
                        ]
                      : [];

                  return (
                    <ListItem
                      key={`PETITION-${status}-${index}`}
                      text={`${petition.animalName} - ${petition.userName}`}
                      buttons={buttons}
                    />
                  );
                })}
              </View>
            );
          })
        )}
      </View>
    </LoadingWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, gap: theme.spacing(3) },
  fields: { gap: theme.spacing(1) },
});
