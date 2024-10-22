import { useMemo } from "react";
import { RADIO_ACCOUNT_TYPES } from "../constants/radioAccountTypes";

export const useAccountTypes = () => {
  const accountTypes = useMemo(() => RADIO_ACCOUNT_TYPES, []);

  return accountTypes;
};
