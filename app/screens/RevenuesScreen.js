import React from "react";
import { StyleSheet, Text } from "react-native";

import { AppColors, AppSpacing, AppSizes } from "../config";
import { AppScreen } from "../components/AppScreen";

export const RevenuesScreen = () => {
  return (
    <AppScreen style={styles.container}>
      <Text style={styles.text}>Revenues Screen</Text>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: AppSpacing.m,
  },
  text: {
    marginTop: AppSpacing.s,
    alignSelf: "center",
  },
});
