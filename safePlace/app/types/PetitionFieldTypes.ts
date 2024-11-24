export type PetitionFieldType = "text" | "radio";

export interface BasePetitionField {
  type: PetitionFieldType;
  text: string;
}

export interface TextPetitionField extends BasePetitionField {
  type: "text";
}

export type PetitionRadioOption = {
  text: string;
  conforming: boolean;
};

export interface RadioPetitionField extends BasePetitionField {
  type: "radio";
  options: Array<PetitionRadioOption>;
}

export type PetitionField = TextPetitionField | RadioPetitionField;

export type RadioFieldType<T extends PetitionFieldType = PetitionFieldType> = {
  id: T;
  label: string;
  value: T;
};

export type PetitionAnswer = {
  text: string;
  answer: string;
};
