import { FC } from "react";
import { ColorKeys, theme } from "../../constants/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export type LoadingProps = {
  icon: IconDefinition;
  color?: ColorKeys;
  size?: "small" | "large";
};

export const Icon: FC<LoadingProps> = ({
  icon,
  color = "text-success",
  size = "small",
}) => {
  const iconSize = size === "small" ? 7 : 8;

  return (
    <FontAwesomeIcon
      icon={icon}
      color={theme.colors[color]}
      size={theme.spacing(iconSize)}
    />
  );
};
