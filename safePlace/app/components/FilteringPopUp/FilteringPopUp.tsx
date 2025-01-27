import { FC, useState } from "react";
import { View , StyleSheet, Dimensions} from "react-native";
import { string } from "yup";
import Modal from "react-native-modal";
import { ModalProps } from "../../types";
import { theme } from "../../constants/theme";
import { FormLabel } from "../FormLabel";
import { Controller } from "react-hook-form";
import { Select } from "../Select";
import { CheckBox } from "../CheckBox";
import { Input } from "../Input";
import { capitalizeFirstLetter, getAnimalEnvironmentsToSelect, getAnimalTypesToSelect } from "../../utils";
import { Filter } from "../../constants/filterType";
import { Button } from "../Button";
import { useFilteringData } from "./hooks";
import { Typography } from "../Typography";


export interface FilteringPopUpProps extends ModalProps {
  UserID: string;
}
export const FilteringPopUp: FC<FilteringPopUpProps> = ({ UserID, onPressFunction, isVisible, setVisible }) =>{
  const {height, width} = Dimensions.get('window')
  const [winHeight, setWinHeight] = useState(height)
  const { filterControl, handleFilterSubmit, filterErrors } = useFilteringData();
    const animalTypesData = getAnimalTypesToSelect();
    const animalEnvironmentsData = getAnimalEnvironmentsToSelect();


    const createFiltersObject = () => {
      const createdFilter = filterControl._formValues as Filter;
      console.log(createdFilter)
    };

  const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    verticalContainer: { flex: 1, flexDirection: "column", direction: "ltr", width: "90%", minHeight: winHeight * 0.6, maxHeight: winHeight * 0.6, backgroundColor: theme.colors["background-primary"], borderRadius: "2%", padding: "2%", gap: theme.spacing(1), },

    buttonsContainer: { marginTop:30,width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around" }
  });


  
  return(
     <Modal
          isVisible={isVisible}
          onBackdropPress={() => setVisible(false)}
        >
          <View style={styles.container}>
            <View style={styles.verticalContainer}>
              <Typography text="Set filters:" />
              <FormLabel text={"Base on User Profile"} errors={filterErrors.useUserDetails} />
              <Controller
                control={filterControl}
                name="useUserDetails"
                render={({ field: { onChange, value } }) => (
                  <CheckBox checked={value} onPress={() => onChange(!value)} />
                )}
              />
              <FormLabel text={"Type"} errors={filterErrors.type} />
              <Controller
                control={filterControl}
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
              <FormLabel text={"Environment"} errors={filterErrors.environment} />
              <Controller
                control={filterControl}
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
              <FormLabel text={"Friendly"} errors={filterErrors.friendly} />
              <Controller
                control={filterControl}
                name="friendly"
                defaultValue={true}
                render={({ field: { onChange, value } }) => (
                  <CheckBox checked={value} onPress={() => onChange(!value)} />
                )}
              />
              <FormLabel text={"Age"} errors={filterErrors.age} />
              <Controller
                control={filterControl}
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
          <View style={styles.buttonsContainer}>
                <Button
                  text="Cancel"
                  variant="secondary"
                  onPress={() => { setVisible(false); }}
                />
                <Button
                  text="Filter"
                  onPress={() => { createFiltersObject(); }}
                />

              </View>
            </View>
          </View>
        </Modal>
  )
}

