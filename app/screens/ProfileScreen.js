import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Switch } from "react-native-paper";

import { AppColors, AppSpacing, AppSizes } from "../config";
import { AppScreen } from "../components/AppScreen";
import { InitializingScreen } from "../screens/InitializingScreen";

import { ProfileCard } from "../components/ProfileCard";
import { ProfileForm } from "../components/ProfileForm";

import { fetchUserProfile, updateUserProfile } from "../api/AppFirebseApi";

import { AuthContext } from "../auth/AuthContext";

export const ProfileScreen = () => {
  const [initializing, setInitializing] = useState(true);
  //
  const { user } = useContext(AuthContext);
  const { displayName, email, uid } = user;
  //
  const [userProfile, setUserProfile] = useState({});
  //
  const [isLoading, setIsLoading] = useState(false);
  //
  const [isSubmitExpenses, setIsSubmitExpenses] = useState(false);
  const onToggleSwitch = () => setIsSubmitExpenses(!isSubmitExpenses);
  //
  const loadUserProfile = async () => {
    const newUserProfile = await fetchUserProfile(uid);
    setIsSubmitExpenses(newUserProfile.isSubmitExpenses);
    setUserProfile(newUserProfile);
    if (initializing) setInitializing(false);
  };
  useEffect(() => {
    loadUserProfile();
  }, []);

  if (initializing) return <InitializingScreen initializing={initializing} />;

  return (
    <AppScreen style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/** profile card */}
        <ProfileCard displayName={displayName} email={email} />
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
        <ProfileForm
          userProfile={userProfile}
          isSubmitExpenses={isSubmitExpenses}
          uid={uid}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          updateUserProfile={updateUserProfile}
        />
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: AppSpacing.m,
  },
  isSubmitExpensesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  isSubmitExpenesText: {
    flex: 1,
    fontWeight: "bold",
    fontSize: AppSizes.m,
  },
});
