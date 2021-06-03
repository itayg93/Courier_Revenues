import React, { useState } from "react";
import { StyleSheet, View, Text, Keyboard } from "react-native";
import { TextInput, Button, RadioButton, Divider } from "react-native-paper";

import { Formik } from "formik";
import * as Yup from "yup";

import { AppColors, AppSpacing } from "../config";

import { saveExpense } from "../api/AppFirebseApi";

const validationSchema = Yup.object().shape({
  expenseCost: Yup.number().required().label("Cost"),
  expenseComment: Yup.string().optional().label("Comment"),
});

export const EditExpenseForm = ({ uid, isLoading, setIsLoading }) => {
  const [expenseType, setExpenseType] = useState("Fuel");
  return (
    <Formik
      initialValues={{
        expenseCost: "",
        expenseComment: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        setIsLoading(true);
        Keyboard.dismiss();
        saveExpense(
          uid,
          { expenseType, ...values },
          setIsLoading,
          setExpenseType,
          resetForm
        );
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
          {/** type */}
          <View style={styles.readioButtonsContainer}>
            <RadioButton.Group
              onValueChange={(value) => setExpenseType(value)}
              value={expenseType}
            >
              <RadioButton.Item
                color={AppColors.primary}
                label="Fuel"
                value="Fuel"
              />
              <Divider />
              <RadioButton.Item
                color={AppColors.primary}
                label="Maintenance"
                value="Maintenance"
              />
              <Divider />
              <RadioButton.Item
                color={AppColors.primary}
                label="Equipment"
                value="Equipment"
              />
              <Divider />
              <RadioButton.Item
                color={AppColors.primary}
                label="Other"
                value="Other"
              />
            </RadioButton.Group>
          </View>
          {/** cost */}
          <TextInput
            style={styles.textInput}
            label="Cost"
            onChangeText={handleChange("expenseCost")}
            onBlur={() => setFieldTouched("expenseCost")}
            value={values.expenseCost}
            keyboardType="numeric"
            autoCorrect={false}
          />
          {errors["expenseCost"] && touched["expenseCost"] ? (
            <Text style={styles.errorMessage}>{errors["expenseCost"]}</Text>
          ) : null}
          {/** comment */}
          <TextInput
            style={styles.textInput}
            label="Comment"
            onChangeText={handleChange("expenseComment")}
            onBlur={() => setFieldTouched("expenseComment")}
            value={values.expenseComment}
            autoCorrect={false}
            multiline
            maxLength={255}
            numberOfLines={3}
            right={<TextInput.Affix text="/255" />}
          />
          {errors["expenseComment"] && touched["expenseComment"] ? (
            <Text style={styles.errorMessage}>{errors["expenseComment"]}</Text>
          ) : null}
          {/** save btn */}
          <Button
            style={styles.saveBtn}
            mode="contained"
            onPress={handleSubmit}
            loading={isLoading}
          >
            Save
          </Button>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  readioButtonsContainer: {
    backgroundColor: AppColors.white,
    marginTop: AppSpacing.xl,
    marginBottom: AppSpacing.s,
    padding: AppSpacing.m,
    borderRadius: AppSpacing.l,
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
