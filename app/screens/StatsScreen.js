import React, { useState, useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { AppColors, AppSpacing } from "../config";
import { AppScreen } from "../components/AppScreen";
import { DatesSelection } from "../components/DatesSelection";
import { ExpenseCard } from "../components/ExpenseCard";

import { fetchExpenses } from "../api/AppFirebseApi";

import { AuthContext } from "../auth/AuthContext";

export const StatsScreen = () => {
  const { user } = useContext(AuthContext);
  const { uid } = user;

  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const loadExpenses = async (
    uid,
    setLoading,
    fromTimeInMillis,
    tillTimeInMillis
  ) => {
    var newExpenses = await fetchExpenses(
      uid,
      setLoading,
      fromTimeInMillis,
      tillTimeInMillis
    );
    setExpenses(newExpenses);
    setLoading(false);
  };

  return (
    <AppScreen style={styles.container}>
      <DatesSelection
        uid={uid}
        loading={loading}
        setLoading={setLoading}
        loadExpenses={loadExpenses}
      />
      {/** expenses and shifts list */}
      <View style={styles.expensesAndShiftsContainer}>
        {expenses && (
          <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ExpenseCard expense={item} />}
          />
        )}
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: AppSpacing.m,
  },
  expensesAndShiftsContainer: {
    flex: 1,
    marginTop: AppSpacing.l,
    backgroundColor: AppColors.white,
    padding: AppSpacing.m,
    borderRadius: AppSpacing.l,
  },
});
