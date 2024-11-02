import { useEffect, useState } from "react";
import { Field } from "../../../../../../types";
import { getPetition, savePetition } from "../../../../../../services";

export const useFields = (userID: string | null) => {
  const [textLoading, setTextLoading] = useState("Loading fields...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [turnNew, setTurnNew] = useState(false);
  const [turnEdit, setTurnEdit] = useState(-1);
  const [fields, setFields] = useState<Array<Field>>([]);

  useEffect(() => {
    loadPetitionData();
  }, []);

  const loadPetitionData = () => {
    if (!userID) {
      return;
    }

    setLoading(true);
    setError(false);
    (async () => {
      try {
        const dbFields: Field[] = await getPetition(userID);
        setFields(dbFields);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  };

  const handleNewField = (createNew: boolean) => {
    setTurnNew(createNew);
  };

  const handleFieldEdit = (index: number) => {
    setTurnEdit(index);
  };

  const handleFieldDelete = (index: number) => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index));
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

  const editField = (field: Field) => {
    setFields((prevFields) => {
      prevFields[turnEdit] = field;
      return prevFields;
    });
    setDisabled(false);
  };

  const addField = (field: Field) => {
    setFields([...fields, field]);
    setDisabled(false);
  };

  return {
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
  };
};
