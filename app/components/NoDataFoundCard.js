import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { AppColors, AppSpacing, AppSizes } from "../config";

export const NoDataFoundCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Data Found.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.light,
    padding: AppSpacing.l,
    borderRadius: AppSpacing.l,
    marginBottom: AppSpacing.s,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: AppSizes.m,
  },
});
