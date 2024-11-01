import { useEffect, useState } from "react";
import { Button, LoadingWrapper, Typography } from "../../../../../components";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { theme } from "../../../../../constants/theme";
import { getPetition, savePetition } from "../../../../../services/petitions";
import { useAppSelector } from "../../../../../redux/hooks";
import { selectUserID } from "../../../../../redux/accountSlice";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { FieldAdd, FieldEdit } from "./components";
import { Field } from "../../../../../types";

export const EditPetition = () => {
  const userID = useAppSelector(selectUserID);
  const [textLoading, setTextLoading] = useState("Loading fields...");
  const [turnNew, setTurnNew] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [turnEdit, setTurnEdit] = useState(-1);
  const [fields, setFields] = useState<Array<Field>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userID) {
      return;
    }

    (async () => {
      const dbFields: Field[] = await getPetition(userID);
      setFields(dbFields);
      setLoading(false);
    })();
  }, []);

  const handleEditDelete = (index: number) => {
    setTurnEdit(index);
  };

  const handleFieldDelete = (index: number) => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index));
    setDisabled(false);
  };

  const save = async () => {
    if (!userID) {
      return;
    }

    setTextLoading("Saving...");
    setLoading(true);
    await savePetition(fields, userID);
    setDisabled(true);
    setLoading(false);
  };

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
                    <TouchableOpacity onPress={() => handleEditDelete(index)}>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        color={theme.colors["text-success"]}
                        size={theme.spacing(8)}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleFieldDelete(index)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        color={theme.colors["text-success"]}
                        size={theme.spacing(8)}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.mainButtons}>
            <Button text="New Field" onPress={() => setTurnNew(true)} />
            <Button text="Save Petition" onPress={save} disabled={disabled} />
          </View>
        </View>
      )}
      {turnNew && (
        <FieldAdd
          close={() => setTurnNew(false)}
          addField={(field) => {
            setFields([...fields, field]);
            setDisabled(false);
          }}
        />
      )}
      {turnEdit !== -1 && (
        <FieldEdit
          close={() => setTurnEdit(-1)}
          editField={(field) => {
            setFields((prevFields) => {
              prevFields[turnEdit] = field;
              return prevFields;
            });
            setDisabled(false);
          }}
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
