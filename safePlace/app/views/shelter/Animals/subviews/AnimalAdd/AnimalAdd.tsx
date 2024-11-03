import { FC } from "react";
import { Animal } from "../../../../../types";
import { StyleSheet, View } from "react-native";
import { Button } from "../../../../../components";
import { theme } from "../../../../../constants/theme";

type AnimalAddProps = {
  close: () => void;
  addAnimal: (animal: Animal) => void;
};

export const AnimalAdd: FC<AnimalAddProps> = ({ close, addAnimal }) => {
  const createAnimalObject = () => {
    // addAnimal(...)

    close();
  };

  return (
    <View style={styles.buttons}>
      <Button text="Add Animal" onPress={createAnimalObject} />
      <Button text="Cancel" onPress={close} variant="secondary" />
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: { gap: theme.spacing(2) },
});
