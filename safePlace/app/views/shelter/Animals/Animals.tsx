import {
  Button,
  EditListItem,
  ErrorPage,
  LoadingWrapper,
  Typography,
} from "../../../components";
import { useAnimals } from "./hooks";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserID } from "../../../redux/accountSlice";
import { StyleSheet, View } from "react-native";
import { theme } from "../../../constants/theme";
import { AnimalAdd, AnimalEdit } from "./subviews";

export const Animals = () => {
  const userID = useAppSelector(selectUserID);
  const {
    loading,
    error,
    disabled,
    turnNew,
    turnEdit,
    animals,
    loadAnimalsData,
    saveAnimals,
    handleNewAnimal,
    handleAnimalEdit,
    editAnimal,
    addAnimal,
  } = useAnimals(userID);

  if (error) {
    return (
      <ErrorPage
        text={"Unable to load animals data."}
        action={"Please reload."}
        button={<Button text="Reload" onPress={() => loadAnimalsData()} />}
      />
    );
  }

  return (
    <LoadingWrapper isLoading={loading} text="Loading animals...">
      {!turnNew && turnEdit === -1 && (
        <View style={styles.container}>
          <View style={styles.fields}>
            <Typography text="Animals in shelter:" />
            {animals.map((animal, index) => {
              return (
                <EditListItem
                  key={`ANIMAL-${index}`}
                  text={`${animal.type} - ${animal.name}`}
                  editClick={() => handleAnimalEdit(index)}
                  deleteClick={() => {}}
                />
              );
            })}
          </View>
          <View style={styles.buttons}>
            <Button text="New Animal" onPress={() => handleNewAnimal(true)} />
            <Button
              text="Save Animals Data"
              onPress={saveAnimals}
              disabled={disabled}
            />
          </View>
        </View>
      )}
      {turnNew && (
        <AnimalAdd close={() => handleNewAnimal(false)} addAnimal={addAnimal} />
      )}
      {turnEdit !== -1 && (
        <AnimalEdit
          close={() => handleAnimalEdit(-1)}
          editAnimal={editAnimal}
          animal={animals[turnEdit]}
        />
      )}
    </LoadingWrapper>
  );
};

const styles = StyleSheet.create({
  container: { gap: theme.spacing(3) },
  fields: { gap: theme.spacing(1) },
  buttons: { gap: theme.spacing(2) },
});
