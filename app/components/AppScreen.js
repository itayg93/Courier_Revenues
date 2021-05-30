import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Constants from "expo-constants";

export const AppScreen = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <SafeAreaView style={[{ flex: 1 }, style]}>{children}</SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
});
