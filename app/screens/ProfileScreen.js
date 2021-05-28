import React from "react";
import { StyleSheet, Text } from "react-native";

import { AppColors, AppSpacing, AppSizes } from "../config";
import { AppScreen } from "../components/AppScreen";

export const ProfileScreen = () => {
  return (
    <AppScreen style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: AppSpacing.m,
  },
  text: {
    marginTop: AppSpacing.xl,
    position: "absolute",
    alignSelf: "center",
  },
});
