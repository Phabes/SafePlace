import { ACCOUNT_TYPES } from "@/app/constants/accountTypes";
import { useMemo } from "react";

export const useAccountTypes = () => {
  const accountTypes = useMemo(() => ACCOUNT_TYPES, []);

  return accountTypes;
};
