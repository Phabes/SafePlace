import { useNavigation } from "@react-navigation/native";
import { RootNavigationProps } from "../navigation";

export const useAppNavigation = () => useNavigation<RootNavigationProps>();
