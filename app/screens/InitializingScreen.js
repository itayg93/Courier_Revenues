import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { AppColors } from "../config";

export const InitializingScreen = ({ initializing }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={initializing}
        size="large"
        color={AppColors.secondary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
