import firebase from "firebase";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { AppFirebaseConstants } from "./AppFirebseConstants";

// auth

export const login = (values, setIsLoading, setError, setVisible) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(values.email, values.password)
    .then(() => {})
    .catch((error) => {
      setIsLoading(false);
      if (
        error.code == "auth/wrong-password" ||
        error.code == "auth/user-not-found"
      ) {
        setError("Wrong Credentials.");
      } else {
        setError(error.message);
      }
      setVisible(true);
      console.log(error);
    });
};

export const logout = () => {
  firebase.auth().signOut().then();
};

export const register = (values, setIsLoading, setError, setVisible) => {
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
          setError(error.message);
          setVisible(true);
          console.log(error);
        });
    })
    .catch((error) => {
      setIsLoading(false);
      if (error.code == "auth/email-already-in-use") {
        setError("An error occurred, please try again later.");
      } else {
        setError(error.message);
      }
      setVisible(true);
      console.log(error);
    });
};

// firestore

export const createInitialUserProfile = (userUid) => {
  firebase
    .firestore()
    .collection(userUid)
    .doc(AppFirebaseConstants.PROFILE)
    .set({
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
    var querySnapshot = await firebase
      .firestore()
      .collection(userUid)
      .doc(AppFirebaseConstants.PROFILE)
      .get();
    return ({
      isSubmitExpenses,
      taxPoints,
      commissionRate,
      compulsoryInsurance,
      collateralInsurance,
      personalInsurance,
    } = querySnapshot.data());
  } catch (error) {
    console.log(error);
  }
};

export const updateUserProfile = (userUid, values, setIsLoading) => {
  firebase
    .firestore()
    .collection(userUid)
    .doc(AppFirebaseConstants.PROFILE)
    .set({
      isSubmitExpenses: values.isSubmitExpenses,
      taxPoints: values.taxPoints,
      commissionRate: values.commissionRate,
      compulsoryInsurance: values.compulsoryInsurance,
      collateralInsurance: values.collateralInsurance,
      personalInsurance: values.personalInsurance,
    })
    .then(() => {
      setIsLoading(false);
    })
    .catch((error) => {
      setIsLoading(false);
      console.log(error);
    });
};
