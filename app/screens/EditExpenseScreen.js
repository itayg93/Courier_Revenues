import React from "react";
import { StyleSheet, Text } from "react-native";

import { AppColors, AppSpacing, AppSizes } from "../config";
import { AppScreen } from "../components/AppScreen";

export const EditExpenseScreen = () => {
  return (
    <AppScreen style={styles.container}>
      <Text style={styles.text}>Edit Expense Screen</Text>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: AppSpacing.m,
  },
  text: {
    alignSelf: "center",
    marginTop: AppSpacing.s,
  },
});
