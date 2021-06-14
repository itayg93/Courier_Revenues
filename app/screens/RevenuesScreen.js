import React, { useState, useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { AppSpacing } from "../config";
import { AppScreen } from "../components/AppScreen";
import { AuthContext } from "../auth/AuthContext";
import { MonthPicker } from "../components/MonthPicker";
import { calculateRevenuesData } from "../database/AppRevenuesApi";
import { RevenuesReportSheet } from "../components/RevenuesReportSheet";

export const RevenuesScreen = () => {
  const { user } = useContext(AuthContext);
  const { uid } = user;

  const [loading, setLoading] = useState(false);
  const [revenuesData, setRevenuesData] = useState();

  const [selectedMonthIndex, setSelectedMonthIndex] = useState();

  const loadRevenuesData = async () => {
    var fetchedRevenuesData = await calculateRevenuesData(
      uid,
      selectedMonthIndex + 1,
      setLoading
    );
    setRevenuesData(fetchedRevenuesData);
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
        {revenuesData && <RevenuesReportSheet data={revenuesData} />}
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: AppSpacing.m,
  },
});
