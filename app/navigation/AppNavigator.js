import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AppColors } from "../config";
import { NavigationConstants } from "./NavigationCostants";
import { ProfileScreen } from "../screens/ProfileScreen";
import { DashboardNavigator } from "./DashboardNavigator";
import { RevenuesScreen } from "../screens/RevenuesScreen";

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={NavigationConstants.DASHBOARD_SCREEN}
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
        name={NavigationConstants.DASHBOARD_SCREEN}
        component={DashboardNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={size}
              color={color}
            />
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
