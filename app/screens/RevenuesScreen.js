import React, { useState, useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { AppSpacing } from "../config";
import { AppScreen } from "../components/AppScreen";
import { AuthContext } from "../auth/AuthContext";
import { MonthPicker } from "../components/MonthPicker";
import { xyz } from "../api/AppRevenuesApi";
import { RevenuesReportSheet } from "../components/RevenuesReportSheet";

export const RevenuesScreen = () => {
  const { user } = useContext(AuthContext);
  const { uid } = user;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const [selectedMonthIndex, setSelectedMonthIndex] = useState();

  const loadRevenuesData = async () => {
    var fData = await xyz(uid, selectedMonthIndex + 1, setLoading);
    setData(fData);
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
        {data && <RevenuesReportSheet data={data} />}
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: AppSpacing.m,
  },
});
