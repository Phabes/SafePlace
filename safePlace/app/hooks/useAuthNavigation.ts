import { useNavigation } from "@react-navigation/native";
import { AuthNavigationProps } from "../navigation";

export const useAuthNavigation = () => useNavigation<AuthNavigationProps>();
