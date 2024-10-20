import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../navigation";

export const useAppNavigation = () => useNavigation<NavigationProps>();
