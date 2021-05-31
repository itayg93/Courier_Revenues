import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";

import { AppSpacing } from "../config";
import { AppScreen } from "../components/AppScreen";

import { EditExpenseForm } from "../components/EditExpenseForm";

import { AuthContext } from "../auth/AuthContext";

export const EditExpenseScreen = () => {
  const { user } = useContext(AuthContext);
  const { uid } = user;
  const [isLoading, setIsLoading] = useState(false);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <AppScreen style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Text style={styles.text}>Edit Expense Screen</Text>
            <EditExpenseForm
              uid={uid}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            {/** place holder to push the screen to the top because of the flex-end for the keyboard avoiding view */}
            <View style={{ flex: 1 }} />
          </View>
        </TouchableWithoutFeedback>
      </AppScreen>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: AppSpacing.m,
  },
  text: {
    alignSelf: "center",
    marginTop: AppSpacing.s,
  },
});
