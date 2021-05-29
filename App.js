import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { NavigationTheme } from "./app/navigation/NavigationTheme";
import { AuthNavigator } from "./app/navigation/AuthNavigator";
import { AppNavigator } from "./app/navigation/AppNavigator";

import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDzFg7-RrvM-q_ssxRo19h88lmoGzzUojU",
  authDomain: "courier-revenues-e17e5.firebaseapp.com",
  projectId: "courier-revenues-e17e5",
  storageBucket: "courier-revenues-e17e5.appspot.com",
  messagingSenderId: "484626250374",
  appId: "1:484626250374:web:f3f39424e81292794f6f07",
};

firebase.initializeApp(firebaseConfig);

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer theme={NavigationTheme}>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
