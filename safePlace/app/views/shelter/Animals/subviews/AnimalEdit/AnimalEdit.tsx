import { FC } from "react";
import { Animal } from "../../../../../types";
import { StyleSheet, View } from "react-native";
import { Button, Typography } from "../../../../../components";
import { theme } from "../../../../../constants/theme";

type AnimalEditProps = {
  close: () => void;
  editAnimal: (animal: Animal) => void;
  animal: Animal;
};

export const AnimalEdit: FC<AnimalEditProps> = ({
  close,
  editAnimal,
  animal,
}) => {
  const createAnimalObject = () => {
    // editAnimal(...)

    close();
  };

  return (
    <View style={styles.buttons}>
      <Typography text={`${animal.type} - ${animal.name}`} />
      <Button text="Edit Animal" onPress={createAnimalObject} />
      <Button text="Cancel" onPress={close} variant="secondary" />
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: { gap: theme.spacing(2) },
});
