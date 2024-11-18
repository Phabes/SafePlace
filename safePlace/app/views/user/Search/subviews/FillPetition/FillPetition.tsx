import { FC } from "react";
import { View } from "react-native";
import { Button, Typography } from "../../../../../components";

type FillPetitionProps = {
  animalID: string;
  shelterID: string;
  userID: string;
  onClose: () => void;
};

export const FillPetition: FC<FillPetitionProps> = ({
  animalID,
  shelterID,
  userID,
  onClose,
}) => {
  return (
    <View>
      <Typography text="Fill petition:" />
      <Typography text={animalID} />
      <Typography text={shelterID} />
      <Typography text={userID} />
      <Button text="Cancel" onPress={onClose} />
    </View>
  );
};
