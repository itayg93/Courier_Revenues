import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { NavigationConstants } from "./NavigationCostants";
import { DashboardScreen } from "../screens/DashboardScreen";
import { EditExpenseScreen } from "../screens/EditExpenseScreen";
import { StatsScreen } from "../screens/StatsScreen";
import { TimerScreen } from "../screens/TimerScreen";

const Stack = createStackNavigator();

export const DashboardNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name={NavigationConstants.DASHBOARD_SCREEN}
      component={DashboardScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={NavigationConstants.EDIT_EXPENSE_SCREEN}
      component={EditExpenseScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={NavigationConstants.STATS_SCREEN}
      component={StatsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={NavigationConstants.TIMER_SCREEN}
      component={TimerScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
