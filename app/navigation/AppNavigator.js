import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AppColors, AppSpacing, AppSizes } from "../config";
import { NavigationConstants } from "./NavigationCostants";
import { ProfileScreen } from "../screens/ProfileScreen";
import { TimerScreen } from "../screens/TimerScreen";
import { RevenuesScreen } from "../screens/RevenuesScreen";

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: AppColors.primary,
        inactiveTintColor: AppColors.medium,
      }}
    >
      <Tab.Screen
        name={NavigationConstants.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={NavigationConstants.TIMER_SCREEN}
        component={TimerScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="timer" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={NavigationConstants.REVENUES_SCREEN}
        component={RevenuesScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="cash-usd" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
