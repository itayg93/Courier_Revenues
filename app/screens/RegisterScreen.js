import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";

import { Formik } from "formik";
import * as Yup from "yup";

import { AppColors, AppSpacing, AppSizes } from "../config";
import { AppScreen } from "../components/AppScreen";

import { register } from "../api/AppFirebseApi";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export const RegisterScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  // snackbar
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);
  return (
    <AppScreen style={styles.container}>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setIsLoading(true);
          register(values, setIsLoading, setError, setVisible);
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
              label="Name"
              onChangeText={handleChange("name")}
              onBlur={() => setFieldTouched("name")}
              value={values.name}
              autoCorrect={false}
            />
            {errors["name"] && touched["name"] ? (
              <Text style={styles.errorMessage}>{errors["name"]}</Text>
            ) : null}
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
              style={styles.registerBtn}
              mode="contained"
              onPress={handleSubmit}
              loading={isLoading}
            >
              Register
            </Button>
          </>
        )}
      </Formik>
      {/** snackbar */}
      <View style={{ flex: 1 }}>
        <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
          {error}
        </Snackbar>
      </View>
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
  registerBtn: {
    marginTop: AppSpacing.xl,
    backgroundColor: AppColors.secondary,
  },
});
