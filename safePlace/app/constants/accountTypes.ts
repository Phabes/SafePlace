export const ACCOUNT_TYPES: AccountType[] = [
  {
    id: "User",
    label: "User",
    value: "User",
  },
  {
    id: "Shelter",
    label: "Shelter",
    value: "Shelter",
  },
];

export type AccountType = {
  id: string;
  label: string;
  value: string;
};
