import React, { useState, useContext } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";

import { AppSpacing } from "../config";
import { AppScreen } from "../components/AppScreen";
import { AuthContext } from "../auth/AuthContext";
import { MonthPicker } from "../components/MonthPicker";
import { fetchRevenuesData } from "../api/AppFirebseApi";

export const RevenuesScreen = () => {
  const { user } = useContext(AuthContext);
  const { uid } = user;

  const [loading, setLoading] = useState(false);

  const [selectedMonthIndex, setSelectedMonthIndex] = useState();

  const [data, setData] = useState(0);

  const loadRevenuesData = async () => {
    var fetchedData = await fetchRevenuesData(
      uid,
      selectedMonthIndex + 1,
      setLoading
    );
    setData(fetchedData);
    setLoading(false);
  };

  return (
    <AppScreen style={styles.container}>
      <ScrollView>
        <MonthPicker
          setSelectedMonthIndex={setSelectedMonthIndex}
          loading={loading}
          setLoading={setLoading}
          onPress={loadRevenuesData}
        />
        <Text>{data}</Text>
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: AppSpacing.m,
  },
});
