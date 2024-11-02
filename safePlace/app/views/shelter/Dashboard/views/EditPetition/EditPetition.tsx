import {
  Button,
  ErrorPage,
  Icon,
  LoadingWrapper,
  Typography,
} from "../../../../../components";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { theme } from "../../../../../constants/theme";
import { useAppSelector } from "../../../../../redux/hooks";
import { selectUserID } from "../../../../../redux/accountSlice";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FieldAdd, FieldEdit } from "./subviews";
import { usePetitionFields } from "./hooks";

export const EditPetition = () => {
  const userID = useAppSelector(selectUserID);
  const {
    textLoading,
    loading,
    error,
    disabled,
    turnNew,
    turnEdit,
    fields,
    loadPetitionData,
    editField,
    addField,
    save,
    handleNewField,
    handleFieldEdit,
    handleFieldDelete,
  } = usePetitionFields(userID);

  if (error) {
    return (
      <ErrorPage
        text={"Unable to load petition data."}
        action={"Please reload."}
        button={<Button text="Reload" onPress={() => loadPetitionData()} />}
      />
    );
  }

  return (
    <LoadingWrapper isLoading={loading} text={textLoading}>
      {!turnNew && turnEdit === -1 && (
        <View style={styles.container}>
          <View style={styles.fields}>
            {fields.map((field, index) => {
              return (
                <View style={styles.field} key={`FIELD-${index}`}>
                  <View style={styles.fieldText}>
                    <Typography text={field.text} />
                  </View>
                  <View style={styles.fieldButtons}>
                    <TouchableOpacity onPress={() => handleFieldEdit(index)}>
                      <Icon icon={faPenToSquare} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleFieldDelete(index)}>
                      <Icon icon={faTrash} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.mainButtons}>
            <Button text="New Field" onPress={() => handleNewField(true)} />
            <Button text="Save Petition" onPress={save} disabled={disabled} />
          </View>
        </View>
      )}
      {turnNew && (
        <FieldAdd close={() => handleNewField(false)} addField={addField} />
      )}
      {turnEdit !== -1 && (
        <FieldEdit
          close={() => handleFieldEdit(-1)}
          editField={editField}
          field={fields[turnEdit]}
        />
      )}
    </LoadingWrapper>
  );
};

const styles = StyleSheet.create({
  container: { gap: theme.spacing(3) },
  fields: { gap: theme.spacing(1) },
  field: {
    backgroundColor: theme.colors["background-subtle"],
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    gap: theme.spacing(1),
    elevation: 2,
  },
  fieldText: { flex: 1 },
  fieldButtons: {
    flexDirection: "row",
    gap: theme.spacing(2),
  },
  mainButtons: { gap: theme.spacing(2) },
});
