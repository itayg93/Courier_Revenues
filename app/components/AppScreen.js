import React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";

export const AppScreen = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
});
