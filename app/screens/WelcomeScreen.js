import React from "react";
import { StyleSheet, Text } from "react-native";

import { Button } from "react-native-paper";

import { AppColors, AppSpacing, AppSizes } from "../config";
import { AppScreen } from "../components/AppScreen";
import { NavigationConstants } from "../navigation/NavigationCostants";

export const WelcomeScreen = ({ navigation }) => {
  return (
    <AppScreen style={styles.container}>
      <Text style={styles.text}>Welcome Screen</Text>
      <Button
        style={styles.loginBtn}
        mode="contained"
        onPress={() => navigation.navigate(NavigationConstants.LOGIN_SCREEN)}
      >
        Login
      </Button>
      <Button
        style={styles.registerBtn}
        mode="contained"
        onPress={() => navigation.navigate(NavigationConstants.REGISTER_SCREEN)}
      >
        Register
      </Button>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: AppSpacing.m,
    justifyContent: "flex-end",
  },
  text: {
    top: AppSpacing.xl,
    position: "absolute",
    alignSelf: "center",
  },
  loginBtn: {
    backgroundColor: AppColors.primary,
    marginBottom: AppSpacing.m,
  },
  registerBtn: {
    backgroundColor: AppColors.secondary,
  },
});
