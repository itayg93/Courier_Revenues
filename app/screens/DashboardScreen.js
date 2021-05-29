import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, FAB } from "react-native-paper";

import { AppColors, AppSpacing, AppSizes } from "../config";
import { AppScreen } from "../components/AppScreen";
import { NavigationConstants } from "../navigation/NavigationCostants";

import firebase from "firebase";

export const DashboardScreen = ({ navigation }) => {
  return (
    <AppScreen style={styles.container}>
      <Text style={styles.text}>Dashboard Screen</Text>
      <View style={styles.buttonsContainer}>
        <Button
          style={styles.btn}
          icon="plus"
          mode="contained"
          onPress={() =>
            navigation.navigate(NavigationConstants.EDIT_EXPENSE_SCREEN)
          }
        >
          Expense
        </Button>
        <Button
          style={styles.btn}
          icon="view-agenda"
          mode="contained"
          onPress={() => navigation.navigate(NavigationConstants.STATS_SCREEN)}
        >
          Stats
        </Button>
        <Button
          style={styles.btn}
          icon="logout"
          mode="contained"
          onPress={() => {
            firebase.auth().signOut().then();
          }}
        >
          Logout
        </Button>
      </View>
      <FAB
        style={styles.shiftFab}
        icon="timer"
        label="New Shift"
        onPress={() => navigation.navigate(NavigationConstants.TIMER_SCREEN)}
      />
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
  buttonsContainer: {
    marginTop: AppSpacing.xl,
    width: "40%",
  },
  btn: {
    marginVertical: AppSpacing.s,
    backgroundColor: AppColors.medium,
  },
  shiftFab: {
    position: "absolute",
    margin: AppSpacing.m,
    backgroundColor: AppColors.primary,
    right: 0,
    bottom: 0,
  },
});