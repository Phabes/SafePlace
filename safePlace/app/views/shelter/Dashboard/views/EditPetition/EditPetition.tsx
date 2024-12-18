import {
  Button,
  ErrorPage,
  ListItem,
  LoadingWrapper,
} from "../../../../../components";
import { StyleSheet, View } from "react-native";
import { theme } from "../../../../../constants/theme";
import { FieldAdd, FieldEdit } from "./subviews";
import { usePetitionFields } from "./hooks";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export const EditPetition = () => {
  const {
    loadingMessage,
    loading,
    errorMessage,
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
  } = usePetitionFields();

  if (error) {
    return (
      <ErrorPage
        text={errorMessage}
        action={"Please reload."}
        button={<Button text="Reload" onPress={loadPetitionData} />}
      />
    );
  }

  return (
    <LoadingWrapper isLoading={loading} text={loadingMessage}>
      {!turnNew && turnEdit === -1 && (
        <View style={styles.container}>
          <View style={styles.fields}>
            {fields.map((field, index) => {
              return (
                <ListItem
                  key={`FIELD-${index}`}
                  text={field.text}
                  buttons={[
                    {
                      onPress: () => handleFieldEdit(index),
                      icon: faPenToSquare,
                    },
                    {
                      onPress: () => handleFieldDelete(index),
                      icon: faTrash,
                    },
                  ]}
                />
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
  mainButtons: { gap: theme.spacing(2) },
});
