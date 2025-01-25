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
import { useState } from "react";
import { FillPetition } from "./views/FillPetition";
import { signPetition } from "../../../services";
import { PetitionAnswer } from "../../../types";
import { FilteringPopUp } from "../../../components/FilteringPopUp";

export const Search = () => {
  const userID = useAppSelector(selectUserID);
  const {
    loading,
    error,
    animals,
    filled,
    favourite,
    loadAvailableAnimals,
    addToFilled,
    addFavourite,
    deleteFavourite,
  } = useSearchAnimals(userID);
  const favouriteIDs = favourite.map((a) => a.id);
  const filteredAnimals = animals.filter(
    (animal) => !filled.includes(animal.id)
  );
  const sortedAnimals = getSortedAnimals(filteredAnimals, favouriteIDs);
  const [petitionAnimalIndex, setPetitionAnimalIndex] = useState<number>(-1);
  const [filteringModalVisible, setFilteringModalVisible] = useState(false);

  const handleFillPetitionClick = (index: number) => {
    setPetitionAnimalIndex(index);
  };

  const cancelFillPetition = async (answers?: Array<PetitionAnswer>) => {
    if (answers) {
      const signedAnimal = sortedAnimals[petitionAnimalIndex].id;
      const notInFavourite = !favouriteIDs.includes(signedAnimal);
      await signPetition(
        signedAnimal,
        animals[petitionAnimalIndex].shelterID,
        userID,
        answers
      );
      await addToFilled(signedAnimal, notInFavourite);
    }
    setPetitionAnimalIndex(-1);
  };

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
       <FilteringPopUp 
          onPressFunction={() => {}} 
          isVisible={filteringModalVisible} 
          setVisible={setFilteringModalVisible} 
          UserID={userID} />
      <View style={styles.container}>
        {petitionAnimalIndex !== -1 ? (
          <FillPetition
            animalName={animals[petitionAnimalIndex].name}
            shelterID={animals[petitionAnimalIndex].shelterID}
            onClose={cancelFillPetition}
          />
        ) : (
          <View style={styles.fields}>
              <View style={styles.header}>
                <Typography text="Available animals:" />
                <View>
                  <Button
                    text="Filter"
                    onPress={() => { setFilteringModalVisible(true) }}
                  />
                </View>
              </View>
            {sortedAnimals.map((animal, index) => {
              const isAnimalInFavourite = favouriteIDs.includes(animal.id);

              return (
                <ListItem
                  key={`ANIMAL-${animal.id}`}
                  text={`${animal.type} - ${animal.name}`}
                  image={animal.photo}
                  buttons={[
                    {
                      onPress: () => handleFillPetitionClick(index),
                      icon: faPen,
                    },
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
        )}
      </View>
    </LoadingWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, gap: theme.spacing(3) },
  fields: { gap: theme.spacing(1) },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
