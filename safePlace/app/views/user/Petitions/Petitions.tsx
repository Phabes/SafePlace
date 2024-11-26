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
import { getPetitionsData } from "./hooks";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import { theme } from "../../../constants/theme";
import { groupPetitionsByStatus, sortPetitionByStatus } from "./utils";
import { PETITION_STATUSES } from "../../../constants/petitionStatuses";

export const Petitions = () => {
  const userID = useAppSelector(selectUserID);
  const { loading, error, petitionData, loadPetitionsData } =
    getPetitionsData(userID);
  // const sortedPetitions = sortPetitionByStatus(petitionData);
  const groupedPetitions = groupPetitionsByStatus(petitionData);

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
        {/* <View style={styles.fields}>
          <Typography text="Available animals:" />
          {sortedPetitions.map((petition, index) => {
            const buttons =
              petition.status === "Accepted"
                ? [{ onPress: () => {}, icon: faCalendarPlus }]
                : [];

            return (
              <ListItem
                key={`PETITION-${index}`}
                text={`${petition.animalsName} - ${petition.status}`}
                buttons={buttons}
              />
            );
          })}
        </View> */}
        {PETITION_STATUSES.map((status) => {
          if (groupedPetitions[status].length == 0) {
            return null;
          }

          return (
            <View key={`PETITION-GROUP-${status}`} style={styles.fields}>
              <Typography text={`${status}:`} />
              {groupedPetitions[status].map((petition, index) => {
                const buttons =
                  petition.status === "Accepted"
                    ? [{ onPress: () => {}, icon: faCalendarPlus }]
                    : [];

                return (
                  <ListItem
                    key={`PETITION-${status}-${index}`}
                    text={`${petition.animalsName} - ${petition.status}`}
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
