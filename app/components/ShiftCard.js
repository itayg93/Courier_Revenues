import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Divider } from "react-native-paper";

import { AppColors, AppSpacing, AppSizes } from "../config";
import { formatTime } from "../util";

export const ShiftCard = ({ shift }) => {
  return (
    <View style={styles.container}>
      {/** date and time */}
      <View style={styles.rowContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>Date: </Text>
          <Text style={styles.data}>
            {shift.day + "/" + shift.month + "/" + shift.year}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>Time: </Text>
          <Text style={styles.data}>{formatTime(shift.timeInSeconds)}</Text>
        </View>
      </View>
      <Divider style={{ marginVertical: 5 }} />
      {/** time and wolt */}
      <View style={styles.rowContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>Deliveries: </Text>
          <Text style={styles.data}>{shift.deliveries}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>Wolt: </Text>
          <Text style={styles.data}>{shift.wolt.toFixed(2) + " ₪"}</Text>
        </View>
      </View>
      <Divider style={{ marginVertical: 5 }} />
      {/** credit and cash */}
      <View style={styles.rowContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>Credit: </Text>
          <Text style={styles.data}>{shift.creditTips.toFixed(2) + " ₪"}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>Cash: </Text>
          <Text style={styles.data}>{shift.cashTips.toFixed(2) + " ₪"}</Text>
        </View>
      </View>
      <Divider style={{ marginVertical: 5 }} />
      {/** total and commission fee */}
      <View style={styles.rowContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>Total: </Text>
          <Text style={styles.data}>{shift.total.toFixed(2) + " ₪"}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>Company fee: </Text>
          <Text style={styles.data}>
            {(shift.woltDelta + shift.creditTipsDelta).toFixed(2) + " ₪"}
          </Text>
        </View>
      </View>
      <Divider style={{ marginVertical: 5 }} />
      {/** hourly wage */}
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={styles.title}>Hourly wage: </Text>
        <Text style={styles.data}>{shift.hourlyWage.toFixed(2) + " ₪"}</Text>
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
