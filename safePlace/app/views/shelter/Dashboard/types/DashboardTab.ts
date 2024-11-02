export type DashboardTab = "List" | "Edit";

export type DashboardTabs<T extends DashboardTab = DashboardTab> = {
  id: T;
  label: string;
};
