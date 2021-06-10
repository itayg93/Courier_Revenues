import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Constants from "expo-constants";

export const AppScreen = ({ children, style }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[{ flex: 1 }, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
});
