import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Avatar, TextInput, Button, Switch, FAB } from "react-native-paper";

import { Formik } from "formik";
import * as Yup from "yup";

import { AppColors, AppSpacing, AppSizes } from "../config";
import { AppScreen } from "../components/AppScreen";

import { AuthContext } from "../auth/AuthContext";

const validationSchema = Yup.object().shape({
  taxPoints: Yup.number().optional().label("Tax Points"),
  commissionRate: Yup.number().optional().label("Commission Rate"),
  compulsoryInsurance: Yup.number().optional().label("Compulsory Insurance"),
  collateralInsurance: Yup.number().optional().label("Collateral Insurance"),
  personalInsurance: Yup.number().optional().label("Personal Insurance"),
});

export const ProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const { displayName, email } = user;
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitExpenses, setIsSubmitExpenses] = useState(false);
  const onToggleSwitch = () => setIsSubmitExpenses(!isSubmitExpenses);
  return (
    <AppScreen style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      {/** profile */}
      <View style={styles.profileDetailsContainer}>
        <Avatar.Icon icon="account" backgroundColor={AppColors.medium} />
        <View style={styles.displayNameAndEmailWrapper}>
          <Text style={styles.displayName}>{displayName}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      {/** input container */}
      <ScrollView>
        {/** is submit expenses */}
        <View style={styles.isSubmitExpensesContainer}>
          <Text style={styles.isSubmitExpenesText}>Submit Expenses?</Text>
          <Switch
            value={isSubmitExpenses}
            onValueChange={onToggleSwitch}
            color={AppColors.primary}
          />
        </View>
        {/** tax, commission and insurances */}
        <Formik
          initialValues={{
            taxPoints: "",
            commissionRate: "",
            compulsoryInsurance: "",
            collateralInsurance: "",
            personalInsurance: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setIsLoading(true);
            // call firestore func
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
              {/** tax */}
              <TextInput
                style={styles.textInput}
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
                style={styles.textInput}
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
              <Text style={styles.insurancesTitle}>Insurances</Text>
              {/** compulsory */}
              <TextInput
                //style={styles.textInput}
                label="Compulsory Insurance"
                onChangeText={handleChange("compulsoryInsurance")}
                onBlur={() => setFieldTouched("compulsoryInsurance")}
                value={values.compulsoryInsurance}
                keyboardType="numeric"
                autoCorrect={false}
              />
              {errors["compulsoryInsurance"] &&
              touched["compulsoryInsurance"] ? (
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
              {errors["collateralInsurance"] &&
              touched["collateralInsurance"] ? (
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
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: AppSpacing.m,
  },
  text: {
    marginTop: AppSpacing.s,
    alignSelf: "center",
  },
  profileDetailsContainer: {
    marginVertical: AppSpacing.l,
    flexDirection: "row",
    backgroundColor: AppColors.white,
    padding: AppSpacing.l,
    borderRadius: AppSpacing.l,
  },
  displayNameAndEmailWrapper: {
    marginLeft: AppSpacing.m,
    justifyContent: "center",
  },
  displayName: {
    fontWeight: "bold",
    fontSize: AppSizes.l,
  },
  email: {
    marginTop: AppSpacing.s,
    color: AppColors.medium,
  },
  isSubmitExpensesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  isSubmitExpenesText: {
    marginRight: AppSpacing.m,
    fontWeight: "bold",
    fontSize: AppSizes.m,
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
    marginVertical: AppSpacing.m,
  },
  updateBtn: {
    backgroundColor: AppColors.primary,
    marginTop: AppSpacing.l,
  },
});
