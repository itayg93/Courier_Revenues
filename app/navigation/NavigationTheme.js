import { DefaultTheme } from "@react-navigation/native";
import { AppColors } from "../config";

export const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: AppColors.primary,
  },
};
