import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar, IconButton } from "react-native-paper";

import { AppColors, AppSpacing, AppSizes } from "../config";

import { logout } from "../api/AppFirebseApi";

export const ProfileCard = ({ displayName, email }) => {
  return (
    <View style={styles.profileDetailsContainer}>
      <Avatar.Icon icon="account" backgroundColor={AppColors.medium} />
      <View style={styles.displayNameAndEmailWrapper}>
        <Text style={styles.displayName}>{displayName}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <View style={styles.logoutIconBtnContainer}>
        <IconButton
          icon="logout"
          color={AppColors.medium}
          size={25}
          onPress={() => {
            logout();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileDetailsContainer: {
    marginBottom: AppSpacing.l,
    flexDirection: "row",
    backgroundColor: AppColors.white,
    padding: AppSpacing.l,
    borderRadius: AppSpacing.l,
  },
  displayNameAndEmailWrapper: {
    marginLeft: AppSpacing.m,
    justifyContent: "center",
    flex: 1,
  },
  displayName: {
    fontWeight: "bold",
    fontSize: AppSizes.l,
  },
  email: {
    marginTop: AppSpacing.s,
    color: AppColors.medium,
  },
  logoutIconBtnContainer: {
    justifyContent: "center",
  },
});
