import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-paper";

import { AppColors, AppSpacing, AppSizes } from "../config";

export const ProfileCard = ({ displayName, email }) => {
  return (
    <View style={styles.profileDetailsContainer}>
      <Avatar.Icon icon="account" backgroundColor={AppColors.medium} />
      <View style={styles.displayNameAndEmailWrapper}>
        <Text style={styles.displayName}>{displayName}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
