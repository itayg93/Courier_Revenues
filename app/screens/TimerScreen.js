import React, { useState, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Provider } from "react-native-paper";

import { AppColors, AppSpacing, AppSizes } from "../config";
import { AppScreen } from "../components/AppScreen";
import { SaveShiftDialog } from "../components/SaveShiftDialog";
import { formatTime } from "../util";
import { AuthContext } from "../auth/AuthContext";
import { useTimer } from "../hooks/useTimer";

export const TimerScreen = () => {
  const { user } = useContext(AuthContext);
  const { uid } = user;

  const {
    timer,
    active,
    paused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
  } = useTimer(5678);

  const [loading, setLoading] = useState(false);

  const [showSaveDialog, setShowSaveDialog] = useState(false);

  return (
    <Provider>
      <AppScreen style={styles.container}>
        {/** timer */}
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{formatTime(timer)}</Text>
        </View>
        {/** timer buttons */}
        <View style={styles.timerbuttonsContainer}>
          {!active && !paused ? (
            <Button
              style={styles.timerBtn}
              mode="contained"
              onPress={handleStart}
            >
              Start
            </Button>
          ) : paused ? (
            <Button
              style={styles.timerBtn}
              mode="contained"
              onPress={handlePause}
            >
              Pause
            </Button>
          ) : (
            <Button
              style={styles.timerBtn}
              mode="contained"
              onPress={handleResume}
            >
              Resume
            </Button>
          )}
          <Button
            style={styles.timerBtn}
            mode="contained"
            onPress={handleReset}
            disabled={!active}
          >
            Reset
          </Button>
        </View>
        {/** save shift */}
        <Button
          style={styles.saveBtn}
          mode="contained"
          onPress={() => {
            handlePause();
            setShowSaveDialog(true);
          }}
          disabled={!active}
        >
          Save
        </Button>
        <SaveShiftDialog
          uid={uid}
          timer={timer}
          loading={loading}
          setLoading={setLoading}
          showSaveDialog={showSaveDialog}
          setShowSaveDialog={setShowSaveDialog}
        />
      </AppScreen>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: AppSpacing.m,
    justifyContent: "center",
    alignItems: "center",
  },
  timerContainer: {
    marginVertical: AppSpacing.l,
    backgroundColor: AppColors.white,
    padding: AppSpacing.l,
    borderRadius: AppSpacing.l,
  },
  timer: {
    fontSize: AppSizes.xxl,
  },
  timerbuttonsContainer: {
    flexDirection: "row",
  },
  timerBtn: {
    marginHorizontal: AppSpacing.s,
  },
  saveBtn: {
    marginTop: AppSpacing.xl,
  },
});
