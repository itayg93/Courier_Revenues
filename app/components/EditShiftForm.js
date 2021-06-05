import React from "react";
import { StyleSheet, Text, Keyboard, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import { AppColors, AppSpacing } from "../config";
import { saveShift } from "../api/AppFirebseApi";

const validationSchema = Yup.object().shape({
  deliveries: Yup.number().required().label("Deliveries"),
  wolt: Yup.number().required().label("Wolt"),
  creditTips: Yup.number().optional().label("Credit Tips"),
  cashTips: Yup.number().optional().label("Cash Tips"),
});

export const EditShiftForm = ({
  uid,
  timer,
  loading,
  setLoading,
  setShowSaveDialog,
}) => {
  return (
    <Formik
      initialValues={{
        deliveries: "",
        wolt: "",
        creditTips: "",
        cashTips: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        setLoading(true);
        Keyboard.dismiss();
        saveShift(uid, timer, values, setLoading, setShowSaveDialog, resetForm);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        values,
        setFieldTouched,
        touched,
        errors,
      }) => (
        <View style={styles.editShiftFormContainer}>
          {/** deliveries */}
          <TextInput
            style={styles.textInput}
            label="Deliveries"
            onChangeText={handleChange("deliveries")}
            onBlur={() => setFieldTouched("deliveries")}
            value={values.deliveries}
            keyboardType="numeric"
            autoCorrect={false}
          />
          {errors["deliveries"] && touched["deliveries"] ? (
            <Text style={styles.errorMessage}>{errors["deliveries"]}</Text>
          ) : null}
          {/** wolt */}
          <TextInput
            style={styles.textInput}
            label="Wolt"
            onChangeText={handleChange("wolt")}
            onBlur={() => setFieldTouched("wolt")}
            value={values.wolt}
            keyboardType="numeric"
            autoCorrect={false}
            right={<TextInput.Affix text="₪" />}
          />
          {errors["wolt"] && touched["wolt"] ? (
            <Text style={styles.errorMessage}>{errors["wolt"]}</Text>
          ) : null}
          <View style={{ flexDirection: "row" }}>
            {/** credit */}
            <TextInput
              style={[styles.textInput, { flex: 1, marginRight: AppSpacing.s }]}
              label="Credit Tips"
              onChangeText={handleChange("creditTips")}
              onBlur={() => setFieldTouched("creditTips")}
              value={values.creditTips}
              keyboardType="numeric"
              autoCorrect={false}
              right={<TextInput.Affix text="₪" />}
            />
            {errors["creditTips"] && touched["creditTips"] ? (
              <Text style={styles.errorMessage}>{errors["creditTips"]}</Text>
            ) : null}
            {/** cash */}
            <TextInput
              style={[styles.textInput, { flex: 1, marginLeft: AppSpacing.s }]}
              label="Cash Tips"
              onChangeText={handleChange("cashTips")}
              onBlur={() => setFieldTouched("cashTips")}
              value={values.cashTips}
              keyboardType="numeric"
              autoCorrect={false}
              right={<TextInput.Affix text="₪" />}
            />
            {errors["cashTips"] && touched["cashTips"] ? (
              <Text style={styles.errorMessage}>{errors["cashTips"]}</Text>
            ) : null}
          </View>
          {/** save btn */}
          <Button
            style={styles.saveBtn}
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
          >
            Save
          </Button>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  editShiftFormContainer: {
    marginTop: AppSpacing.m,
  },
  textInput: {
    marginTop: AppSpacing.m,
  },
  errorMessage: {
    marginTop: AppSpacing.s,
    marginLeft: AppSpacing.m,
    color: AppColors.danger,
  },
  saveBtn: {
    backgroundColor: AppColors.primary,
    marginTop: AppSpacing.l,
  },
});
