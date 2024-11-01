export type FieldType = "text" | "radio";

export interface BaseField {
  type: FieldType;
  text: string;
}

export interface TextField extends BaseField {
  type: "text";
}

export type PetitionRadioOption = {
  text: string;
  conforming: boolean;
};

export interface RadioField extends BaseField {
  type: "radio";
  options: Array<PetitionRadioOption>;
}

export type Field = TextField | RadioField;

export type RadioFieldType<T extends FieldType = FieldType> = {
  id: T;
  label: string;
  value: T;
};
