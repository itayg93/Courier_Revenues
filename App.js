import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { NavigationTheme } from "./app/navigation/NavigationTheme";
import { AuthNavigator } from "./app/navigation/AuthNavigator";

export default function App() {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <AuthNavigator />
    </NavigationContainer>
  );
}
