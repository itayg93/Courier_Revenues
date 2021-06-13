import React, { useState, useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, ToggleButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

import { AppColors, AppSpacing } from "../config";
import { AppScreen } from "../components/AppScreen";
import { AuthContext } from "../auth/AuthContext";
import { fetchRevenuesData } from "../api/AppFirebseApi";

export const RevenuesScreen = () => {
  const { user } = useContext(AuthContext);
  const { uid } = user;

  const [loading, setLoading] = useState(false);

  const [showMonthPicker, setShowMonthPicker] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedMonthIndex, setSelectedMonthIndex] = useState();

  const [status, setStatus] = useState("checked");
  const onMonthButtonToggle = () => {
    setStatus(status === "checked" ? "unchecked" : "checked");
    setShowMonthPicker(!showMonthPicker);
  };

  const loadRevenuesData = async () => {
    var data = await fetchRevenuesData(uid, selectedMonthIndex + 1, setLoading);
    const { userProfile, expenses, shifts } = data;
    setLoading(false);
  };

  return (
    <AppScreen style={styles.container}>
      <ScrollView>
        <View
          style={{
            backgroundColor: AppColors.white,
            padding: AppSpacing.l,
            borderRadius: AppSpacing.l,
            marginBottom: AppSpacing.m,
          }}
        >
          <ToggleButton
            style={{ alignSelf: "center" }}
            icon="calendar-month"
            status={status}
            onPress={onMonthButtonToggle}
          />
          {showMonthPicker && (
            <Picker
              selectedValue={selectedMonth}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedMonth(itemValue);
                setSelectedMonthIndex(itemIndex);
              }}
            >
              <Picker.Item label="January" value="january" />
              <Picker.Item label="February" value="february" />
              <Picker.Item label="March" value="march" />
              <Picker.Item label="April" value="april" />
              <Picker.Item label="May" value="may" />
              <Picker.Item label="June" value="june" />
              <Picker.Item label="July" value="july" />
              <Picker.Item label="August" value="august" />
              <Picker.Item label="September" value="september" />
              <Picker.Item label="October" value="october" />
              <Picker.Item label="November" value="november" />
              <Picker.Item label="December" value="december" />
            </Picker>
          )}
        </View>
        <Button
          style={{
            backgroundColor: AppColors.primary,
          }}
          mode="contained"
          onPress={() => {
            setLoading(true);
            onMonthButtonToggle();
            setShowMonthPicker(false);
            loadRevenuesData();
          }}
          loading={loading}
          disabled={!showMonthPicker}
        >
          Calculate
        </Button>
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: AppSpacing.m,
  },
});
