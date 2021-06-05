import React from "react";
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Portal, Dialog } from "react-native-paper";

import { AppColors, AppSpacing } from "../config";
import { EditShiftForm } from "../components/EditShiftForm";

export const SaveShiftDialog = ({
  uid,
  timer,
  loading,
  setLoading,
  showSaveDialog,
  setShowSaveDialog,
}) => {
  return (
    <Portal>
      <Dialog
        visible={showSaveDialog}
        onDismiss={() => setShowSaveDialog(false)}
        style={styles.saveDialog}
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
  );
};

const styles = StyleSheet.create({
  saveDialog: {
    backgroundColor: AppColors.light,
    alignSelf: "center",
    position: "absolute",
    top: AppSpacing.xl,
    width: "95%",
  },
});
