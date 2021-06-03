import React, { useState, useCallback, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { Divider, Button } from "react-native-paper";

import { DatePickerModal } from "react-native-paper-dates";

import { AppColors, AppSpacing, AppSizes } from "../config";
import { AppScreen } from "../components/AppScreen";

import { fetchExpenses } from "../api/AppFirebseApi";

import { AuthContext } from "../auth/AuthContext";

export const StatsScreen = () => {
  const { user } = useContext(AuthContext);
  const { uid } = user;

  // from
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
      <Button
        mode="contained"
        onPress={() => {
          // manipulate till
          till.setHours(23);
          till.setMinutes(59);
          till.setSeconds(59);
          setLoading(true);
          loadExpenses(uid, setLoading, from.getTime(), till.getTime());
        }}
        style={styles.statsBtn}
        loading={loading}
      >
        Stats
      </Button>
      {/** expenses and shifts list */}
      <View style={{ marginTop: AppSpacing.l }}>
        {expenses && (
          <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Text>{item.type}</Text>}
          />
        )}
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
  statsBtn: {
    backgroundColor: AppColors.primary,
  },
});
