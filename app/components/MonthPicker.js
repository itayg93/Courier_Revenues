import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, ToggleButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

import { AppColors, AppSpacing } from "../config";

export const MonthPicker = ({
  setSelectedMonthIndex,
  loading,
  setLoading,
  onPress,
}) => {
  const [showMonthPicker, setShowMonthPicker] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState();

  const [status, setStatus] = useState("checked");
  const onMonthButtonToggle = () => {
    setStatus(status === "checked" ? "unchecked" : "checked");
    setShowMonthPicker(!showMonthPicker);
  };
  return (
    <>
      <View style={styles.container}>
        <ToggleButton
          style={styles.toggleBtn}
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
        style={styles.calculateBtn}
        mode="contained"
        onPress={() => {
          setLoading(true);
          onMonthButtonToggle();
          setShowMonthPicker(false);
          onPress();
        }}
        loading={loading}
        disabled={!showMonthPicker}
      >
        Calculate
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    padding: AppSpacing.l,
    borderRadius: AppSpacing.l,
    marginBottom: AppSpacing.m,
  },
  toggleBtn: {
    alignSelf: "center",
  },
  calculateBtn: {
    backgroundColor: AppColors.primary,
  },
});
