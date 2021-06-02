import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { Divider } from "react-native-paper";

import { DatePickerModal } from "react-native-paper-dates";

import { AppColors, AppSpacing, AppSizes } from "../config";
import { AppScreen } from "../components/AppScreen";

export const StatsScreen = () => {
  // from
  const [from, setFrom] = useState(new Date());
  const [showFrom, setShowFrom] = useState(false);

  const onDismissFrom = useCallback(() => {
    setShowFrom(false);
  }, [showFrom]);

  const onConfirmFrom = useCallback(
    (params) => {
      setShowFrom(false);
      setFrom(params.date);
    },
    [setShowFrom, setFrom]
  );

  // till
  const [till, setTill] = useState(new Date());
  const [showTill, setShowTill] = useState(false);

  const onDismissTill = useCallback(() => {
    setShowTill(false);
  }, [showTill]);

  const onConfirmTill = useCallback(
    (params) => {
      setShowTill(false);
      setTill(params.date);
    },
    [setShowTill, setTill]
  );

  return (
    <AppScreen style={styles.container}>
      <Text style={styles.text}>Stats Screen</Text>
      <View style={styles.datesSelectionContainer}>
        {/** from */}
        <TouchableWithoutFeedback onPress={() => setShowFrom(true)}>
          <View style={styles.fromContainer}>
            <Text style={styles.fromText}>From</Text>
            <Text style={styles.fromDate}>
              {from.getDate() +
                "/" +
                (from.getMonth() + 1) +
                "/" +
                from.getFullYear()}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        {/** */}
        <Divider />
        {/** */}
        {/** till */}
        <TouchableWithoutFeedback onPress={() => setShowTill(true)}>
          <View style={styles.tillContainer}>
            <Text style={styles.tillText}>Till</Text>
            <Text style={styles.tillDate}>
              {till.getDate() +
                "/" +
                (till.getMonth() + 1) +
                "/" +
                till.getFullYear()}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/** from selection */}
      <DatePickerModal
        mode="single"
        visible={showFrom}
        onDismiss={onDismissFrom}
        date={from}
        onConfirm={onConfirmFrom}
        // validRange={{
        //   startDate: new Date(2021, 1, 2),  // optional
        //   endDate: new Date(), // optional
        // }}
      />
      {/** till selection */}
      <DatePickerModal
        mode="single"
        visible={showTill}
        onDismiss={onDismissTill}
        date={till}
        onConfirm={onConfirmTill}
        // validRange={{
        //   startDate: new Date(2021, 1, 2),  // optional
        //   endDate: new Date(), // optional
        // }}
      />
    </AppScreen>
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
  datesSelectionContainer: {
    marginVertical: AppSpacing.l,
    backgroundColor: AppColors.white,
    padding: AppSpacing.l,
    borderRadius: AppSpacing.l,
  },
  fromContainer: {
    marginVertical: AppSpacing.xl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fromText: {
    fontSize: AppSizes.m,
  },
  fromDate: {
    fontSize: AppSizes.m,
  },
  tillContainer: {
    marginVertical: AppSpacing.xl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tillText: {
    fontSize: AppSizes.m,
  },
  tillDate: {
    fontSize: AppSizes.m,
  },
});
