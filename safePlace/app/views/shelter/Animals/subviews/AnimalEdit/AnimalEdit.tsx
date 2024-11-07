import { FC } from "react";
import { Animal } from "../../../../../types";
import { StyleSheet, View } from "react-native";
import {
  Button,
  CheckBox,
  Input,
  Select,
  Typography,
} from "../../../../../components";
import { theme } from "../../../../../constants/theme";
import {
  getAnimalEnvironmentsToSelect,
  getAnimalTypesToSelect,
} from "../../../../../utils";
import { Controller } from "react-hook-form";
import { useAnimalData } from "../../hooks/useAnimalData";

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
  const { animalControl, handleAnimalSubmit } = useAnimalData(animal);
  const animalTypesData = getAnimalTypesToSelect();
  const animalEnvironmentsData = getAnimalEnvironmentsToSelect();

  return (
    <View style={styles.container}>
      <Typography text={`${animal.type} - ${animal.name}`} />
      <View style={styles.form}>
        <Typography text="Name" />
        <Controller
          control={animalControl}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input text={value} onChange={onChange} />
          )}
        />
        <Typography text="Type" />
        <Controller
          control={animalControl}
          name="type"
          render={({ field: { onChange, value } }) => (
            <Select
              selectData={animalTypesData}
              value={value}
              onSelect={onChange}
            />
          )}
        />
        <Typography text="Environment" />
        <Controller
          control={animalControl}
          name="environment"
          render={({ field: { onChange, value } }) => (
            <Select
              selectData={animalEnvironmentsData}
              value={value}
              onSelect={onChange}
            />
          )}
        />
        <Typography text="Friendly" />
        <Controller
          control={animalControl}
          name="friendly"
          render={({ field: { onChange, value } }) => (
            <CheckBox checked={value} onPress={() => onChange(!value)} />
          )}
        />
        <Typography text="Age" />
        <Controller
          control={animalControl}
          name="age"
          render={({ field: { onChange, value } }) => (
            <Input
              text={value.toString()}
              onChange={onChange}
              keyboardType="numeric"
            />
          )}
        />
        <Typography text="Details" />
        <Controller
          control={animalControl}
          name="details"
          render={({ field: { onChange, value } }) => (
            <Input text={value} onChange={onChange} />
          )}
        />
      </View>
      <View style={styles.buttons}>
        <Button text="Edit Animal" onPress={createAnimalObject} />
        <Button text="Cancel" onPress={close} variant="secondary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: theme.spacing(3) },
  form: {
    flex: 1,
    justifyContent: "center",
    gap: theme.spacing(1),
  },
  buttons: { gap: theme.spacing(2) },
});
