import { ViewList } from "../navigation";
import { AccountTypes } from "./AccountTypes";

export type AccountTabs = {
  [K in AccountTypes]: {
    initialTab: number;
    tabs: Tab[];
  };
};

export type Tab = {
  viewID: keyof ViewList;
  text: string;
};
