import { AccountTypes } from "./AccountTypes";

export type AccountTabs = {
  [K in AccountTypes]: Tab[];
};

export type Tab = {
  text: string;
};
