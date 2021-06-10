import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
      {/** type */}
      <View style={styles.rowContainer}>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={AppColors.medium}
        />
        <Text style={styles.title}>Type: </Text>
        <Text style={styles.data}>{expense.type}</Text>
      </View>
      {/** cost */}
      <View style={styles.rowContainer}>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={AppColors.medium}
        />
        <Text style={styles.title}>Cost: </Text>
        <Text style={styles.data}>{expense.cost + " ₪"}</Text>
      </View>
      {/** comment */}
      <View style={styles.rowContainer}>
        {expense.comment ? (
          <>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={AppColors.medium}
            />
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
    marginBottom: AppSpacing.m,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: AppSizes.m,
    fontWeight: "bold",
  },
  data: {
    fontSize: AppSizes.m,
  },
});
