import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, FAB } from "react-native-paper";
import LottieView from "lottie-react-native";

import { AppColors, AppSpacing } from "../config";
import { AppScreen } from "../components/AppScreen";
import { NavigationConstants } from "../navigation/NavigationCostants";

import { logout } from "../api/AppFirebseApi";

export const DashboardScreen = ({ navigation }) => {
  return (
    <AppScreen style={styles.container}>
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
            logout();
          }}
        >
          Logout
        </Button>
      </View>
      <View style={styles.animationContainer}>
        <LottieView
          style={{
            width: 300,
            height: 300,
          }}
          source={require("../assets/deliveryLottie.json")}
        />
      </View>
      <FAB
        style={styles.shiftFab}
        icon="timer"
        label="New Shift"
        color={AppColors.white}
        onPress={() => navigation.navigate(NavigationConstants.TIMER_SCREEN)}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  buttonsContainer: {
    position: "absolute",
    margin: AppSpacing.m,
    left: 0,
    top: 0,
    width: "40%",
  },
  btn: {
    marginVertical: AppSpacing.s,
    backgroundColor: AppColors.medium,
  },
  animationContainer: {
    alignSelf: "center",
  },
  shiftFab: {
    position: "absolute",
    margin: AppSpacing.m,
    backgroundColor: AppColors.primary,
    right: 0,
    bottom: 0,
  },
});
