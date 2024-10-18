import React, { FC } from "react";
import { Text } from "react-native";
import { ColorKeys, theme, TypographyKeys } from "../../constants/theme";

type TypographyProps = {
  text: string;
  variant?: TypographyKeys;
  color?: ColorKeys;
  selectable?: boolean;
  center?: boolean;
  numberOfLines?: number;
};

export const Typography: FC<TypographyProps> = ({
  text,
  variant = "body-medium",
  color = "text-primary",
  selectable = false,
  center = false,
  numberOfLines = undefined,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        center && { textAlign: "center" },
        { color: theme.colors[color] },
        theme.typography[variant],
      ]}
      selectable={selectable}
    >
      {text}
    </Text>
  );
};
