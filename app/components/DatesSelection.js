import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { Button } from "react-native-paper";

import { DatePickerModal } from "react-native-paper-dates";

import { AppColors, AppSpacing, AppSizes } from "../config";

export const DatesSelection = ({ loading, setLoading, onPress }) => {
  // from
  // manipulate from to start of the day
  var x = new Date();
  x.setHours(0);
  x.setMinutes(0);
  x.setSeconds(0);
  const [from, setFrom] = useState(x);
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
  // manipulate till to the end of the day
  var y = new Date();
  y.setHours(23);
  y.setMinutes(59);
  y.setSeconds(59);
  const [till, setTill] = useState(y);
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
    <>
      <View style={styles.datesSelectionContainer}>
        {/** from */}
        <TouchableHighlight
          underlayColor={AppColors.light}
          onPress={() => setShowFrom(true)}
        >
          <View style={styles.fromContainer}>
            <Text style={styles.fromText}>From:</Text>
            <Text style={styles.fromDate}>
              {from.getDate() +
                "/" +
                (from.getMonth() + 1) +
                "/" +
                from.getFullYear()}
            </Text>
          </View>
        </TouchableHighlight>
        {/** till */}
        <TouchableHighlight
          underlayColor={AppColors.light}
          onPress={() => setShowTill(true)}
        >
          <View style={styles.tillContainer}>
            <Text style={styles.tillText}>Till:</Text>
            <Text style={styles.tillDate}>
              {till.getDate() +
                "/" +
                (till.getMonth() + 1) +
                "/" +
                till.getFullYear()}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
      <Button
        mode="contained"
        onPress={() => {
          // manipulate till
          till.setHours(23);
          till.setMinutes(59);
          till.setSeconds(59);
          setLoading(true);
          onPress(from.getTime(), till.getTime());
        }}
        style={styles.statsBtn}
        loading={loading}
      >
        Stats
      </Button>
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
    </>
  );
};

const styles = StyleSheet.create({
  datesSelectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: AppSpacing.m,
    backgroundColor: AppColors.white,
    padding: AppSpacing.s,
    borderRadius: AppSpacing.l,
  },
  fromContainer: {
    padding: AppSpacing.s,
    marginVertical: AppSpacing.m,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fromText: {
    fontSize: AppSizes.m,
    fontWeight: "bold",
    marginRight: 5,
  },
  fromDate: {
    fontSize: AppSizes.m,
  },
  tillContainer: {
    padding: AppSpacing.s,
    marginVertical: AppSpacing.m,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tillText: {
    fontSize: AppSizes.m,
    fontWeight: "bold",
    marginRight: 5,
  },
  tillDate: {
    fontSize: AppSizes.m,
  },
  statsBtn: {
    backgroundColor: AppColors.primary,
  },
});
