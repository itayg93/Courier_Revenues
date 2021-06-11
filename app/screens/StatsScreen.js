import React, { useState, useContext } from "react";
import { StyleSheet, View, SectionList, Text } from "react-native";

import { AppColors, AppSpacing, AppSizes } from "../config";
import { AppScreen } from "../components/AppScreen";
import { DatesSelection } from "../components/DatesSelection";
import { ExpenseCard } from "../components/ExpenseCard";
import { ShiftCard } from "../components/ShiftCard";

import { fetchExpenses, fetchShifts } from "../api/AppFirebseApi";

import { AuthContext } from "../auth/AuthContext";

export const StatsScreen = () => {
  const { user } = useContext(AuthContext);
  const { uid } = user;

  const [loading, setLoading] = useState(false);
  const [sectionListData, setSectionListData] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [shifts, setShifts] = useState([]);

  const loadExpenses = async (fromTimeInMillis, tillTimeInMillis) => {
    var newExpenses = await fetchExpenses(
      uid,
      setLoading,
      fromTimeInMillis,
      tillTimeInMillis
    );
    setExpenses(newExpenses);
  };

  const loadShifts = async (fromTimeInMillis, tillTimeInMillis) => {
    var newShifts = await fetchShifts(
      uid,
      setLoading,
      fromTimeInMillis,
      tillTimeInMillis
    );
    setShifts(newShifts);
  };

  const loadData = async (from, till) => {
    await loadExpenses(from, till);
    await loadShifts(from, till);
    setSectionListData([
      {
        title: "Expenses",
        data: expenses,
      },
      {
        title: "Shifts",
        data: shifts,
      },
    ]);
    setLoading(false);
  };

  return (
    <AppScreen style={styles.container}>
      <DatesSelection
        loading={loading}
        setLoading={setLoading}
        onPress={loadData}
      />
      {/** expenses and shifts list */}
      <View style={styles.expensesAndShiftsContainer}>
        <SectionList
          sections={sectionListData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            item.dataType === "Expense" ? (
              <ExpenseCard expense={item} />
            ) : (
              <ShiftCard shift={item} />
            )
          }
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
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
    marginTop: AppSpacing.m,
    backgroundColor: AppColors.white,
    padding: AppSpacing.m,
    borderRadius: AppSpacing.l,
  },
  header: {
    fontSize: AppSizes.m,
    fontWeight: "bold",
    color: AppColors.medium,
    marginBottom: AppSpacing.s,
  },
});
