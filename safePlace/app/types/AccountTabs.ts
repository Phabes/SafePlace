import { ViewList } from "../navigation";
import { AccountType } from "./AccountType";

export type AccountTabs = {
  [K in AccountType]: {
    initialTab: number;
    tabs: Tab[];
  };
};

export type Tab = {
  viewID: keyof ViewList;
  text: string;
};
