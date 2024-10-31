export type FieldType = "text" | "radio";

export interface BaseField {
  type: FieldType;
  text: string;
}

export interface TextField extends BaseField {
  type: "text";
}

export interface RadioField extends BaseField {
  type: "radio";
  options: Array<{ text: string; good: boolean }>;
}

export type Field = TextField | RadioField;
