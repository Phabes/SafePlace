import { FC } from "react";
import { DashboardTab } from "../types";
import { ListPetitions } from "../views/ListPetitions";
import { EditPetition } from "../views/EditPetition";

const ViewComponents: Record<DashboardTab, FC> = {
  List: ListPetitions,
  Edit: EditPetition,
};

export const getDashboardSubview = (subviewID: DashboardTab) => {
  return ViewComponents[subviewID];
};
