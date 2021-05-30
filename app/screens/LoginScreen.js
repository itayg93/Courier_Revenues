import React, { useState } from "react";
import { StyleSheet, Text, Keyboard } from "react-native";
import { TextInput, Button } from "react-native-paper";

import { Formik } from "formik";
import * as Yup from "yup";

import { AppColors, AppSpacing, AppSizes } from "../config";
import { AppScreen } from "../components/AppScreen";

import { login } from "../api/AppFirebseApi";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <AppScreen style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          Keyboard.dismiss();
          setIsLoading(true);
          login(values, setIsLoading);
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
            <TextInput
              style={styles.textInput}
              label="Email"
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors["email"] && touched["email"] ? (
              <Text style={styles.errorMessage}>{errors["email"]}</Text>
            ) : null}
            <TextInput
              style={styles.textInput}
              label="Password"
              onChangeText={handleChange("password")}
              onBlur={() => setFieldTouched("password")}
              value={values.password}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors["password"] && touched["password"] ? (
              <Text style={styles.errorMessage}>{errors["password"]}</Text>
            ) : null}
            <Button
              style={styles.loginBtn}
              mode="contained"
              onPress={handleSubmit}
              loading={isLoading}
            >
              Login
            </Button>
          </>
        )}
      </Formik>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: AppSpacing.m,
  },
  textInput: {
    marginTop: AppSpacing.m,
  },
  errorMessage: {
    marginTop: AppSpacing.s,
    marginLeft: AppSpacing.m,
    color: AppColors.danger,
  },
  loginBtn: {
    marginTop: AppSpacing.xl,
    backgroundColor: AppColors.primary,
  },
});
