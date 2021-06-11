import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Divider } from "react-native-paper";

import { AppColors, AppSpacing, AppSizes } from "../config";

export const ExpenseCard = ({ expense }) => {
  return (
    <View style={styles.container}>
      {/** date */}
      <View style={styles.rowContainer}>
        <Text style={styles.title}>Date: </Text>
        <Text style={styles.data}>
          {expense.day + "/" + expense.month + "/" + expense.year}
        </Text>
      </View>
      <Divider style={{ marginVertical: 5 }} />
      {/** type */}
      <View style={styles.rowContainer}>
        <Text style={styles.title}>Type: </Text>
        <Text style={styles.data}>{expense.type}</Text>
      </View>
      <Divider style={{ marginVertical: 5 }} />
      {/** cost */}
      <View style={styles.rowContainer}>
        <Text style={styles.title}>Cost: </Text>
        <Text style={styles.data}>{expense.cost.toFixed(2) + " ₪"}</Text>
      </View>
      {expense.comment ? <Divider style={{ marginVertical: 5 }} /> : null}
      {/** comment */}
      <View style={styles.rowContainer}>
        {expense.comment ? (
          <>
            <Text style={styles.title}>Comment: </Text>
            <Text style={styles.data}>{expense.comment}</Text>
          </>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.light,
    padding: AppSpacing.l,
    borderRadius: AppSpacing.l,
    marginBottom: AppSpacing.s,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: AppSizes.m,
    fontWeight: "bold",
  },
  data: {
    fontSize: AppSizes.m,
  },
});
