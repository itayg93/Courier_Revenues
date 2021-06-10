import React, { useContext, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";

import { AppSpacing } from "../config";
import { AppScreen } from "../components/AppScreen";

import { EditExpenseForm } from "../components/EditExpenseForm";

import { AuthContext } from "../auth/AuthContext";

export const EditExpenseScreen = () => {
  const { user } = useContext(AuthContext);
  const { uid } = user;
  const [isLoading, setIsLoading] = useState(false);
  return (
    <AppScreen style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <EditExpenseForm
          uid={uid}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: AppSpacing.m,
  },
});
