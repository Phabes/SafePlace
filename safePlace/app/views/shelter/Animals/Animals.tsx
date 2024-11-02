import { View } from "react-native";
import {
  Button,
  ErrorPage,
  LoadingWrapper,
  Typography,
} from "../../../components";
import { useAnimals } from "./hooks";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserID } from "../../../redux/accountSlice";

export const Animals = () => {
  const userID = useAppSelector(selectUserID);
  const { loading, error, animals, loadAnimalsData } = useAnimals(userID);

  if (error) {
    return (
      <ErrorPage
        text={"Unable to load animals data."}
        action={"Please reload."}
        button={<Button text="Reload" onPress={() => loadAnimalsData()} />}
      />
    );
  }

  return (
    <LoadingWrapper isLoading={loading} text="Loading animals...">
      <Typography text="Animals" />
      {animals.map((animal, index) => {
        return <Typography key={`ANIMAL-${index}`} text={animal.type} />;
      })}
    </LoadingWrapper>
  );
};
