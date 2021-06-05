import React, { useState, useRef, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Portal, Button, Dialog, Provider } from "react-native-paper";

import { AppColors, AppSpacing, AppSizes } from "../config";
import { AppScreen } from "../components/AppScreen";
import { EditShiftForm } from "../components/EditShiftForm";

import { AuthContext } from "../auth/AuthContext";

export const TimerScreen = () => {
  const { user } = useContext(AuthContext);
  const { uid } = user;
  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(5555);
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const increment = useRef(null);

  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleStart = () => {
    setActive(true);
    setPaused(true);
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(increment.current);
    setPaused(false);
  };

  const handleResume = () => {
    setPaused(true);
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(increment.current);
    setActive(false);
    setPaused(false);
    setTimer(0);
  };

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  return (
    <Provider>
      <AppScreen style={styles.container}>
        {/** timer */}
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{formatTime()}</Text>
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
        <Portal>
          <Dialog
            visible={showSaveDialog}
            onDismiss={() => setShowSaveDialog(false)}
            style={{
              backgroundColor: AppColors.light,
              alignSelf: "center",
              position: "absolute",
              top: 20,
              width: "95%",
            }}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Dialog.Content>
                <EditShiftForm
                  uid={uid}
                  timer={timer}
                  loading={loading}
                  setLoading={setLoading}
                  setShowSaveDialog={setShowSaveDialog}
                />
              </Dialog.Content>
            </TouchableWithoutFeedback>
          </Dialog>
        </Portal>
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
