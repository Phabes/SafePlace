import { useNavigation } from "@react-navigation/native";
import { AppNavigationProps } from "../navigation";

export const useAppNavigation = () => useNavigation<AppNavigationProps>();
