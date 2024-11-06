import { FC, useState } from "react";
import { Animal } from "../../../../../types";
import { StyleSheet, View } from "react-native";
import { Button, Input, Select, Typography } from "../../../../../components";
import { theme } from "../../../../../constants/theme";
import { getAnimalsTypesToSelect } from "../../../../../utils";

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
  const [currentName, setCurrentName] = useState(animal.name);
  const [currentType, setCurrentType] = useState<string>(animal.type);
  const selectAnimalsData = getAnimalsTypesToSelect();

  return (
    <View style={styles.buttons}>
      <Typography text={`${animal.type} - ${animal.name}`} />
      <Input text={currentName} onChange={setCurrentName} />
      <Select
        selectData={selectAnimalsData}
        value={currentType}
        onSelect={(value) => {
          setCurrentType(value);
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
