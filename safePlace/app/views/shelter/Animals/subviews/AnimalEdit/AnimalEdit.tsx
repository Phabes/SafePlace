import { FC, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Controller } from "react-hook-form";
import {
  AddImageModal,
  Button,
  CheckBox,
  FormLabel,
  Input,
  Select,
  Typography,
} from "../../../../../components";
import { theme } from "../../../../../constants/theme";
import { AddImageModalRes, Animal, AnimalDB } from "../../../../../types";
import {
  capitalizeFirstLetter,
  getAnimalEnvironmentsToSelect,
  getAnimalTypesToSelect,
} from "../../../../../utils";
import { useAnimalData } from "../../hooks";
import { Image } from 'expo-image';
import { MediaImagePlus as MediaImagePlusIcon } from "iconoir-react-native";



type AnimalEditProps = {
  close: () => void;
  editAnimal: (animal: AnimalDB) => void;
  animal: AnimalDB;
};

export const AnimalEdit: FC<AnimalEditProps> = ({
  close,
  editAnimal,
  animal,
}) => {
  const { animalControl, handleAnimalSubmit, animalErrors } =
    useAnimalData(animal);
  const animalTypesData = getAnimalTypesToSelect();
  const animalEnvironmentsData = getAnimalEnvironmentsToSelect();
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  

  const createAnimalObject = () => {
    const edittedAnimal = {
      id: animal.id,
      shelterID: animal.shelterID,
      ...(animalControl._formValues as Animal),
    };
    editAnimal(edittedAnimal);
  };

  return (
    <View style={styles.container}>
      <Typography text={`${animal.type} - ${animal.name}`} />
      <View style={styles.form}>
        <Controller
          control={animalControl}
          name="photo"
          render={({ field: { onChange, value, name } }) => (
            <View>
            <AddImageModal onPressFunction={(res:AddImageModalRes)=>{
                if (res.isTaken) {
                  onChange(res.uri)
                  setPhotoModalVisible(false);
                }
            }} isVisible={photoModalVisible} setVisible={setPhotoModalVisible} />
              <TouchableOpacity style={styles.backgroundContainer}
                onPress={() => { setPhotoModalVisible(true); }}>
                {value == "" ?
                  <MediaImagePlusIcon color={styles.iconColor.color} height={36} width={36} />:
                  <Image
                    contentFit="contain"
                    style={styles.backgroundImage}
                    transition={1000}
                    source={value}
                    placeholder={"Animal Photo"}
                  />
                }
              </TouchableOpacity>
            </View>
          
          )}
          />

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
          render={({ field: { onChange, value } }) => (
            <Select
              selectData={animalTypesData}
              value={value}
              onSelect={onChange}
            />
          )}
        />
        <FormLabel text={"Environment"} errors={animalErrors.environment} />
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
          text="Edit Animal"
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
  backgroundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors["background-clickable"],
    maxHeight: 300,
    minHeight: 150,
    width: "100%"
  },
  backgroundImage: {
    maxHeight: 300,
    minHeight: 150,
    width: "100%"
  },
  iconColor: { color: theme.colors["action-selected"] },
});
