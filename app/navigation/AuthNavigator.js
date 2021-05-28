import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { NavigationConstants } from "./NavigationCostants";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";

const Stack = createStackNavigator();

export const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={NavigationConstants.WELCOME_SCREEN}
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={NavigationConstants.LOGIN_SCREEN}
      component={LoginScreen}
    />
    <Stack.Screen
      name={NavigationConstants.REGISTER_SCREEN}
      component={RegisterScreen}
    />
  </Stack.Navigator>
);
