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
  const [turnNew, setTurnNew] = useState<boolean>(false);
  const [turnEdit, setTurnEdit] = useState<number>(-1);
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
  };

  const save = () => {
    if (!userID) {
      return;
    }

    savePetition(fields, userID);
  };

  return (
    <LoadingWrapper isLoading={loading} text="Loading fields...">
      {!turnNew && turnEdit === -1 && (
        <View style={{ gap: theme.spacing(3) }}>
          <View style={{ gap: theme.spacing(1) }}>
            {fields.map((field, index) => {
              return (
                <View style={styles.container} key={`VIEW-${index}`}>
                  <Typography
                    key={`TYPO-${index}`}
                    text={field.text}
                    numberOfLines={1}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      gap: theme.spacing(2),
                    }}
                  >
                    <TouchableOpacity onPress={() => handleEditDelete(index)}>
                      <FontAwesomeIcon
                        key={`ICO-${index}`}
                        icon={faPenToSquare}
                        color={theme.colors["text-success"]}
                        size={theme.spacing(8)}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleFieldDelete(index)}>
                      <FontAwesomeIcon
                        key={`DEL-${index}`}
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
          <Button text="New Field" onPress={() => setTurnNew(true)} />
          <Button text="Save Petition" onPress={save} />
        </View>
      )}
      {turnNew && (
        <FieldAdd
          close={() => setTurnNew(false)}
          addField={(field) => setFields([...fields, field])}
        />
      )}
      {turnEdit !== -1 && fields[turnEdit].type === "text" && (
        <FieldEdit
          close={() => setTurnEdit(-1)}
          editField={(field) => {
            setFields((prevFields) => {
              prevFields[turnEdit] = field;
              return prevFields;
            });
          }}
          type={fields[turnEdit].type}
          text={fields[turnEdit].text}
        />
      )}
      {turnEdit !== -1 && fields[turnEdit].type === "radio" && (
        <FieldEdit
          close={() => setTurnEdit(-1)}
          editField={(field) => {
            setFields((prevFields) => {
              prevFields[turnEdit] = field;
              return prevFields;
            });
          }}
          type={fields[turnEdit].type}
          text={fields[turnEdit].text}
          radios={fields[turnEdit].options}
        />
      )}
    </LoadingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors["background-subtle"],
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    elevation: 2,
  },
});
