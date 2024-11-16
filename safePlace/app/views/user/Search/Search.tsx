import { StyleSheet, View } from "react-native";
import {
  Button,
  ErrorPage,
  ListItem,
  LoadingWrapper,
  Typography,
} from "../../../components";
import { useSearchAnimals } from "./hooks";
import { theme } from "../../../constants/theme";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserID } from "../../../redux/accountSlice";
import { getSortedAnimals } from "./utils";

export const Search = () => {
  const userID = useAppSelector(selectUserID);
  const {
    loading,
    error,
    animals,
    favourite,
    loadAvailableAnimals,
    addFavourite,
    deleteFavourite,
  } = useSearchAnimals(userID);
  const favouriteIDs = favourite.map((a) => a.id);
  const sortedAnimals = getSortedAnimals(animals, favouriteIDs);

  if (error) {
    return (
      <ErrorPage
        text="Unable to load animals data."
        action="Please reload."
        button={<Button text="Reload" onPress={loadAvailableAnimals} />}
      />
    );
  }

  return (
    <LoadingWrapper isLoading={loading} text="Loading animals...">
      <View style={styles.container}>
        <View style={styles.fields}>
          <Typography text="Available animals:" />
          {sortedAnimals.map((animal, index) => {
            const isAnimalInFavourite = favouriteIDs.includes(animal.id);

            return (
              <ListItem
                key={`ANIMAL-${animal.id}`}
                text={`${animal.type} - ${animal.name}`}
                buttons={[
                  { onPress: () => {}, icon: faPen },
                  {
                    onPress: () => {
                      isAnimalInFavourite
                        ? deleteFavourite(animal.id)
                        : addFavourite(animal.id);
                    },
                    icon: isAnimalInFavourite ? faHeartSolid : faHeartRegular,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    </LoadingWrapper>
  );
};

const styles = StyleSheet.create({
  container: { gap: theme.spacing(3) },
  fields: { gap: theme.spacing(1) },
});
