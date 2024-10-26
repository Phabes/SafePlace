import { ViewList } from "../navigation";
import { ViewComponents } from "../navigation/navigationProps";

export const getCurrentView = (viewID: keyof ViewList) => {
  return ViewComponents[viewID];
};
