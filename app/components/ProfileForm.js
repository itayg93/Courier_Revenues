import React from "react";
import { StyleSheet, View, Text, Keyboard } from "react-native";
import { TextInput, Button } from "react-native-paper";

import { Formik } from "formik";
import * as Yup from "yup";

import { AppColors, AppSpacing, AppSizes } from "../config";

const validationSchema = Yup.object().shape({
  taxPoints: Yup.number().optional().label("Tax Points"),
  commissionRate: Yup.number().optional().label("Commission Rate"),
  compulsoryInsurance: Yup.number().optional().label("Compulsory Insurance"),
  collateralInsurance: Yup.number().optional().label("Collateral Insurance"),
  personalInsurance: Yup.number().optional().label("Personal Insurance"),
});

export const ProfileForm = ({
  userProfile,
  isSubmitExpenses,
  uid,
  isLoading,
  setIsLoading,
  updateUserProfile,
}) => {
  return (
    <Formik
      initialValues={{
        taxPoints: userProfile.taxPoints.toString(),
        commissionRate: userProfile.commissionRate.toString(),
        compulsoryInsurance: userProfile.compulsoryInsurance.toString(),
        collateralInsurance: userProfile.collateralInsurance.toString(),
        personalInsurance: userProfile.personalInsurance.toString(),
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setIsLoading(true);
        Keyboard.dismiss();
        updateUserProfile(uid, { isSubmitExpenses, ...values }, setIsLoading);
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
        <>
          {/** tax points and commission rate */}
          <View style={styles.taxPointsAndCommissionRateContainer}>
            {/** tax */}
            <TextInput
              style={styles.taxPointsInput}
              label="Tax Points"
              onChangeText={handleChange("taxPoints")}
              onBlur={() => setFieldTouched("taxPoints")}
              value={values.taxPoints}
              keyboardType="numeric"
              autoCorrect={false}
            />
            {errors["taxPoints"] && touched["taxPoints"] ? (
              <Text style={styles.errorMessage}>{errors["taxPoints"]}</Text>
            ) : null}
            {/** commission */}
            <TextInput
              style={styles.commissionRateInput}
              label="Commission Rate"
              onChangeText={handleChange("commissionRate")}
              onBlur={() => setFieldTouched("commissionRate")}
              value={values.commissionRate}
              keyboardType="numeric"
              autoCorrect={false}
            />
            {errors["commissionRate"] && touched["commissionRate"] ? (
              <Text style={styles.errorMessage}>
                {errors["commissionRate"]}
              </Text>
            ) : null}
          </View>
          {/** insurances */}
          <Text style={styles.insurancesTitle}>Insurances</Text>
          {/** compulsory */}
          <TextInput
            label="Compulsory Insurance"
            onChangeText={handleChange("compulsoryInsurance")}
            onBlur={() => setFieldTouched("compulsoryInsurance")}
            value={values.compulsoryInsurance}
            keyboardType="numeric"
            autoCorrect={false}
          />
          {errors["compulsoryInsurance"] && touched["compulsoryInsurance"] ? (
            <Text style={styles.errorMessage}>
              {errors["compulsoryInsurance"]}
            </Text>
          ) : null}
          {/** collateral */}
          <TextInput
            style={styles.textInput}
            label="Collateral Insurance"
            onChangeText={handleChange("collateralInsurance")}
            onBlur={() => setFieldTouched("collateralInsurance")}
            value={values.collateralInsurance}
            keyboardType="numeric"
            autoCorrect={false}
          />
          {errors["collateralInsurance"] && touched["collateralInsurance"] ? (
            <Text style={styles.errorMessage}>
              {errors["collateralInsurance"]}
            </Text>
          ) : null}
          {/** personal */}
          <TextInput
            style={styles.textInput}
            label="Personal Insurance"
            onChangeText={handleChange("personalInsurance")}
            onBlur={() => setFieldTouched("personalInsurance")}
            value={values.personalInsurance}
            keyboardType="numeric"
            autoCorrect={false}
          />
          {errors["personalInsurance"] && touched["personalInsurance"] ? (
            <Text style={styles.errorMessage}>
              {errors["personalInsurance"]}
            </Text>
          ) : null}
          {/** update btn */}
          <Button
            style={styles.updateBtn}
            mode="contained"
            onPress={handleSubmit}
            loading={isLoading}
          >
            Update
          </Button>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  taxPointsAndCommissionRateContainer: {
    flexDirection: "row",
    marginTop: AppSpacing.m,
  },
  taxPointsInput: {
    flex: 1,
    marginRight: AppSpacing.s,
  },
  commissionRateInput: {
    flex: 1,
    marginLeft: AppSpacing.s,
  },
  textInput: {
    marginTop: AppSpacing.m,
  },
  errorMessage: {
    marginTop: AppSpacing.s,
    marginLeft: AppSpacing.m,
    color: AppColors.danger,
  },
  insurancesTitle: {
    fontWeight: "bold",
    fontSize: AppSizes.xl,
    marginVertical: AppSpacing.l,
  },
  updateBtn: {
    backgroundColor: AppColors.primary,
    marginTop: AppSpacing.l,
  },
});
