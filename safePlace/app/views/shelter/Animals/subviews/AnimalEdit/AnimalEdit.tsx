import { FC } from "react";
import { Animal } from "../../../../../types";
import { StyleSheet, View } from "react-native";
import { Button, Select, Typography } from "../../../../../components";
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
  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  return (
    <View style={styles.buttons}>
      <Typography text={`${animal.type} - ${animal.name}`} />
      <Select
        selectData={data}
        value="3"
        onSelect={(value) => {
          console.log(value);
        }}
      />
      <Button text="Edit Animal" onPress={createAnimalObject} />
      <Button text="Cancel" onPress={close} variant="secondary" />
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: { gap: theme.spacing(2) },
});
