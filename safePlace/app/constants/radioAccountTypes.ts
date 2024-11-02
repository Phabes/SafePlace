export const RADIO_ACCOUNT_TYPES: RadioAccountType[] = [
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

export type RadioAccountType = {
  id: string;
  label: string;
  value: string;
};

export type PhotoRes = {
  hasPhoto: boolean;
  photo: any;
};
