import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Controller } from "react-hook-form";
import { Animal } from "../../../../../types";
import {
  Button,
  CheckBox,
  FormLabel,
  Input,
  Select,
} from "../../../../../components";
import { theme } from "../../../../../constants/theme";
import { useAnimalData } from "../../hooks";
import {
  capitalizeFirstLetter,
  getAnimalEnvironmentsToSelect,
  getAnimalTypesToSelect,
} from "../../../../../utils";

type AnimalAddProps = {
  close: () => void;
  addAnimal: (animal: Animal) => void;
};

export const AnimalAdd: FC<AnimalAddProps> = ({ close, addAnimal }) => {
  const { animalControl, handleAnimalSubmit, animalErrors } = useAnimalData();
  const animalTypesData = getAnimalTypesToSelect();
  const animalEnvironmentsData = getAnimalEnvironmentsToSelect();

  const createAnimalObject = () => {
    const createdAnimal = animalControl._formValues as Animal;
    addAnimal(createdAnimal);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <FormLabel text={"Name"} errors={animalErrors.name} />
        <Controller
          control={animalControl}
          name="name"
          render={({ field: { onChange, value, name } }) => (
            <Input
              text={value}
              onChange={onChange}
              placeholder={capitalizeFirstLetter(name)}
            />
          )}
        />
        <FormLabel text={"Type"} errors={animalErrors.type} />
        <Controller
          control={animalControl}
          name="type"
          render={({ field: { onChange, value, name } }) => (
            <Select
              selectData={animalTypesData}
              value={value}
              onSelect={onChange}
              placeholder={name}
            />
          )}
        />
        <FormLabel text={"Environment"} errors={animalErrors.environment} />
        <Controller
          control={animalControl}
          name="environment"
          render={({ field: { onChange, value, name } }) => (
            <Select
              selectData={animalEnvironmentsData}
              value={value}
              onSelect={onChange}
              placeholder={name}
            />
          )}
        />
        <FormLabel text={"Friendly"} errors={animalErrors.friendly} />
        <Controller
          control={animalControl}
          name="friendly"
          render={({ field: { onChange, value } }) => (
            <CheckBox checked={value} onPress={() => onChange(!value)} />
          )}
        />
        <FormLabel text={"Age"} errors={animalErrors.age} />
        <Controller
          control={animalControl}
          name="age"
          render={({ field: { onChange, value, name } }) => (
            <Input
              text={value !== undefined ? value.toString() : ""}
              onChange={(age) => onChange(parseInt(age !== "" ? age : "0", 10))}
              keyboardType="numeric"
              placeholder={capitalizeFirstLetter(name)}
            />
          )}
        />
        <FormLabel text={"Details (optional)"} errors={animalErrors.details} />
        <Controller
          control={animalControl}
          name="details"
          render={({ field: { onChange, value, name } }) => (
            <Input
              text={value}
              onChange={onChange}
              placeholder={capitalizeFirstLetter(name)}
            />
          )}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          text="Add Animal"
          onPress={handleAnimalSubmit(createAnimalObject)}
        />
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
