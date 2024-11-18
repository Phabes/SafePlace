import { StyleSheet, View } from "react-native";
import {
  Button,
  DialogPopUp,
  ErrorPage,
  ListItem,
  LoadingWrapper,
  Typography,
} from "../../../components";
import { useAnimals } from "./hooks";
import { AnimalAdd, AnimalEdit } from "./subviews";
import { theme } from "../../../constants/theme";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export const Animals = () => {
  const {
    loading,
    error,
    loadAnimalsData,
    animals,
    creating,
    editing,
    deleting,
    handleAnimalAdd,
    handleAnimalEdit,
    handleAnimalDelete,
    addAnimal,
    editAnimal,
    deleteAnimal,
  } = useAnimals();

  if (error) {
    return (
      <ErrorPage
        text="Unable to load animals data."
        action="Please reload."
        button={<Button text="Reload" onPress={loadAnimalsData} />}
      />
    );
  }

  return (
    <LoadingWrapper isLoading={loading} text="Loading animals...">
      {deleting !== -1 && (
        <DialogPopUp
          header="Do you want to delete animal?"
          content={`${animals[deleting].type} - ${animals[deleting].name}`}
          handleAccept={deleteAnimal}
          handleCancel={() => {
            handleAnimalDelete(-1);
          }}
        />
      )}
      {!creating && editing === -1 && (
        <View style={styles.container}>
          <View style={styles.fields}>
            <Typography text="Animals in shelter:" />
            {animals.map((animal, index) => {
              return (
                <ListItem
                  key={`ANIMAL-${animal.id}`}
                  text={`${animal.type} - ${animal.name}`}
                  buttons={[
                    {
                      onPress: () => handleAnimalEdit(index),
                      icon: faPenToSquare,
                    },
                    {
                      onPress: () => handleAnimalDelete(index),
                      icon: faTrash,
                    },
                  ]}
                />
              );
            })}
          </View>
          <View style={styles.buttons}>
            <Button text="New Animal" onPress={() => handleAnimalAdd(true)} />
          </View>
        </View>
      )}
      {creating && (
        <AnimalAdd close={() => handleAnimalAdd(false)} addAnimal={addAnimal} />
      )}
      {editing !== -1 && (
        <AnimalEdit
          close={() => handleAnimalEdit(-1)}
          editAnimal={editAnimal}
          animal={animals[editing]}
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
