import React, { useState } from "react";
import { StyleSheet, Text, Keyboard, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";

import { Formik } from "formik";
import * as Yup from "yup";

import { AppColors, AppSpacing, AppSizes } from "../config";
import { AppScreen } from "../components/AppScreen";

import { login } from "../database/AppFirebseApi";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <AppScreen style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
                secureTextEntry={hidePassword}
                autoCapitalize="none"
                autoCorrect={false}
                right={
                  <TextInput.Icon
                    name="eye"
                    color={AppColors.medium}
                    onPress={() => setHidePassword(!hidePassword)}
                  />
                }
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
      </ScrollView>
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
