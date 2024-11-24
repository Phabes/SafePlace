import { StyleSheet } from "react-native";
import {
  Button,
  ErrorPage,
  ListItem,
  LoadingWrapper,
} from "../../../components";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserID } from "../../../redux/accountSlice";
import { getPetitionsData } from "./hooks";
import { sortPetitionByStatus } from "./utils";

export const Favourite = () => {
  const userID = useAppSelector(selectUserID);
  const { loading, error, petitionData, loadPetitionsData } =
    getPetitionsData(userID);
  const sortedPetitions = sortPetitionByStatus(petitionData);

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
      {sortedPetitions.map((petition, index) => {
        return (
          <ListItem
            key={`PETITION-${index}`}
            text={`${petition.animalsName} - ${petition.status}`}
            buttons={[]}
          />
        );
      })}
    </LoadingWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabs: {
    flexDirection: "row",
  },
});
