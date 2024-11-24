import { useEffect, useState } from "react";
import { PetitionField } from "../../../../../../types";
import { getPetition, savePetition } from "../../../../../../services";
import { useAppSelector } from "../../../../../../redux/hooks";
import { selectUserID } from "../../../../../../redux/accountSlice";

export const usePetitionFields = () => {
  const userID = useAppSelector(selectUserID);
  const [textLoading, setTextLoading] = useState("Loading fields...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [turnNew, setTurnNew] = useState(false);
  const [turnEdit, setTurnEdit] = useState(-1);
  const [fields, setFields] = useState<Array<PetitionField>>([]);

  useEffect(() => {
    loadPetitionData();
  }, []);

  const loadPetitionData = () => {
    setLoading(true);
    setError(false);
    (async () => {
      try {
        const dbPetitionFields = await getPetition(userID);
        setFields(dbPetitionFields);
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
    setTextLoading("Saving...");
    setLoading(true);
    await savePetition(fields, userID);
    setDisabled(true);
    setLoading(false);
  };

  const editField = (field: PetitionField) => {
    setFields((prevFields) => {
      prevFields[turnEdit] = field;
      return prevFields;
    });
    setDisabled(false);
  };

  const addField = (field: PetitionField) => {
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
