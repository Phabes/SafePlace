import { useEffect, useState } from "react";
import { PetitionField } from "../../../../../../types";
import { getPetition } from "../../../../../../services";

export const usePetitionFields = (userID: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fields, setFields] = useState<Array<PetitionField>>([]);

  useEffect(() => {
    loadPetitionFields();
  }, []);

  const loadPetitionFields = () => {
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

  return {
    loading,
    error,
    fields,
  };
};
