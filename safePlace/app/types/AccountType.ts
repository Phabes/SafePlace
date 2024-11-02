export type AccountType = "User" | "Shelter";

export type RadioAccountType<T extends AccountType = AccountType> = {
  id: T;
  label: T;
  value: T;
};
