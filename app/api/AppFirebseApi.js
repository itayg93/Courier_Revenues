import firebase from "firebase";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { AppFirebaseConstants } from "./AppFirebseConstants";

// auth

export const login = (values, setIsLoading) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(values.email, values.password)
    .then(() => {})
    .catch((error) => {
      setIsLoading(false);
      console.log(error);
    });
};

export const logout = () => {
  firebase.auth().signOut().then();
};

export const register = (values, setIsLoading) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then((userCredential) => {
      // create default user profile to the new user
      var userUid = userCredential.user.uid;
      createInitialUserProfile(userUid);
      // update display name
      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: values.name,
        })
        .then(() => {})
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    })
    .catch((error) => {
      setIsLoading(false);
      console.log(error);
    });
};

// firestore

export const createInitialUserProfile = (userUid) => {
  firebase
    .firestore()
    .collection(AppFirebaseConstants.USERS_DATA)
    .doc(userUid)
    .collection(AppFirebaseConstants.PROFILE)
    .add({
      isSubmitExpenses: false,
      taxPoints: 2.25,
      commissionRate: 5,
      compulsoryInsurance: 0,
      collateralInsurance: 0,
      personalInsurance: 0,
    })
    .then()
    .catch((error) => {
      console.log(error);
    });
};

export const fetchUserProfile = async (userUid) => {
  try {
    const userProfile = [];
    var querySnapshot = await firebase
      .firestore()
      .collection(AppFirebaseConstants.USERS_DATA)
      .doc(userUid)
      .collection(AppFirebaseConstants.PROFILE)
      .get();
    querySnapshot.forEach((doc) => {
      const {
        isSubmitExpenses,
        taxPoints,
        commissionRate,
        compulsoryInsurance,
        collateralInsurance,
        personalInsurance,
      } = doc.data();
      userProfile.push({
        isSubmitExpenses,
        taxPoints: taxPoints.toString(),
        commissionRate: commissionRate.toString(),
        compulsoryInsurance: compulsoryInsurance.toString(),
        collateralInsurance: collateralInsurance.toString(),
        personalInsurance: personalInsurance.toString(),
      });
    });
    return userProfile[0];
  } catch (error) {
    console.log(error);
  }
};
