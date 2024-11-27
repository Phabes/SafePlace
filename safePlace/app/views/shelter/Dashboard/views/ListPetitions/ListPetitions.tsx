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
import { getShelterPetitionsData } from "./hooks";
import { PETITION_STATUSES_SHELTER } from "../../../../../constants/petitionStatuses";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { groupShelterPetitionsByStatus } from "./utils";

export const ListPetitions = () => {
  const userID = useAppSelector(selectUserID);
  const { loading, error, petitionData, loadPetitionsData } =
    getShelterPetitionsData(userID);
  const groupedPetitions = groupShelterPetitionsByStatus(petitionData);

  if (error) {
    return (
      <ErrorPage
        text="Unable to signed animals data."
        action="Please reload."
        button={<Button text="Reload" onPress={loadPetitionsData} />}
      />
    );
  }

  return (
    <LoadingWrapper isLoading={loading} text="Loading animals...">
      <View style={styles.container}>
        {PETITION_STATUSES_SHELTER.map((status) => {
          if (groupedPetitions[status].length == 0) {
            return null;
          }

          return (
            <View key={`PETITION-GROUP-${status}`} style={styles.fields}>
              <Typography text={`${status}:`} />
              {groupedPetitions[status].map((petition, index) => {
                const buttons =
                  petition.status === "Pending"
                    ? [{ onPress: () => {}, icon: faMagnifyingGlass }]
                    : [];

                return (
                  <ListItem
                    key={`PETITION-${status}-${index}`}
                    text={`${petition.animalsName} - ${petition.userName}`}
                    buttons={buttons}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    </LoadingWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, gap: theme.spacing(3) },
  fields: { gap: theme.spacing(1) },
});
