import { StyleSheet, View } from "react-native";
import {
  Button,
  ErrorPage,
  ListItem,
  LoadingWrapper,
  Typography,
} from "../../../components";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserID } from "../../../redux/accountSlice";
import { useGetPetitionsData, useSelectPickUpPetition } from "./hooks";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import { theme } from "../../../constants/theme";
import { PETITION_STATUSES_USER } from "../../../constants/petitionStatuses";
import { groupPetitionsByStatus } from "../../../utils";
import { SignedPetitionsUserFormat } from "../../../types";
import { PickUpArrange } from "./views";

export const Petitions = () => {
  const userID = useAppSelector(selectUserID);
  const { loading, error, petitionData, loadPetitionsData } =
    useGetPetitionsData(userID);
  const { selectedPetition, setSelectedPetition } = useSelectPickUpPetition();

  const groupedPetitions = groupPetitionsByStatus(
    petitionData,
    PETITION_STATUSES_USER
  ) as {
    [key: string]: SignedPetitionsUserFormat[];
  };

  const closePickUpArrangeView = () => {
    loadPetitionsData();
    setSelectedPetition(undefined);
  };

  if (error) {
    return (
      <ErrorPage
        text="Unable to load user petitions."
        action="Please reload."
        button={<Button text="Reload" onPress={loadPetitionsData} />}
      />
    );
  }

  return (
    <LoadingWrapper isLoading={loading} text="Loading petitions...">
      {selectedPetition ? (
        <PickUpArrange
          petition={selectedPetition}
          close={closePickUpArrangeView}
        />
      ) : (
        <View style={styles.container}>
          {PETITION_STATUSES_USER.map((status) => {
            if (groupedPetitions[status].length == 0) {
              return null;
            }

            return (
              <View key={`PETITION-GROUP-${status}`} style={styles.fields}>
                <Typography text={`${status}:`} />
                {groupedPetitions[status].map((petition, index) => {
                  const buttons = ["Accepted", "In-Progress"].includes(
                    petition.status
                  )
                    ? [
                        {
                          onPress: () => setSelectedPetition(petition),
                          icon: faCalendarPlus,
                        },
                      ]
                    : [];

                  return (
                    <ListItem
                      key={`PETITION-${status}-${index}`}
                      text={`${petition.animalName} - ${petition.shelterName}`}
                      buttons={buttons}
                    />
                  );
                })}
              </View>
            );
          })}
        </View>
      )}
    </LoadingWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, gap: theme.spacing(3) },
  fields: { gap: theme.spacing(1) },
});
