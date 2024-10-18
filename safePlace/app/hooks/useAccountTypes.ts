import { useMemo } from "react";
import { ACCOUNT_TYPES } from "../constants/accountTypes";

export const useAccountTypes = () => {
  const accountTypes = useMemo(() => ACCOUNT_TYPES, []);

  return accountTypes;
};
