import { StyleProp, TextStyle } from "react-native/types";

export const theme: Theme = {
  spacing: (num) => num * 4,
  colors: {
    "text-primary": "#212121",
    "text-secondary": "#5f6678",
    "text-disabled": "#848a99",
    "text-error": "#c92c2c",
    "text-success": "#67eb6f",
    "background-primary": "#fafafa",
    "background-subtle": "#dee3e7",
    "action-selected": "#66c732",
  },
  typography: {
    "header-large": {
      fontSize: 24,
      fontWeight: "700",
    },
    "header-medium": {
      fontSize: 22,
      fontWeight: "700",
    },
    "header-small": {
      fontSize: 20,
      fontWeight: "700",
    },
    "body-large": {
      fontSize: 20,
      fontWeight: "400",
    },
    "body-medium": {
      fontSize: 18,
      fontWeight: "400",
    },
    "body-small": {
      fontSize: 16,
      fontWeight: "400",
    },
  },
};

export type TypographyKeys =
  | "header-large"
  | "header-medium"
  | "header-small"
  | "body-large"
  | "body-medium"
  | "body-small";

export type ColorKeys =
  | "text-primary"
  | "text-secondary"
  | "text-disabled"
  | "text-error"
  | "text-success"
  | "background-primary"
  | "background-subtle"
  | "action-selected";

export type Theme = {
  spacing: (num: number) => number;
  colors: Record<ColorKeys, string>;
  typography: Record<TypographyKeys, StyleProp<TextStyle>>;
};
