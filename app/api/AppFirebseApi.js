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

// profile

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

// expenses

export const saveExpense = (
  userUid,
  values,
  setIsLoading,
  setExpenseType,
  resetForm
) => {
  var expenseId = uuidv4().toString();
  var date = new Date();
  firebase
    .firestore()
    .collection(AppFirebaseConstants.USERS_DATA)
    .doc(userUid)
    .collection(AppFirebaseConstants.EXPENSES)
    .doc(expenseId)
    .set({
      id: expenseId,
      timestamp: date.getTime(),
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      type: values.expenseType,
      cost: values.expenseCost,
      comment: values.expenseComment,
    })
    .then(() => {
      setIsLoading(false);
      setExpenseType("Fuel");
      resetForm();
    })
    .catch((error) => {
      setIsLoading(false);
      console.log(error);
    });
};

export const fetchExpenses = async (
  userUid,
  setLoading,
  fromTimeInMillis,
  tillTimeInMillis
) => {
  try {
    var expensesList = [];
    var querySnapshot = await firebase
      .firestore()
      .collection(AppFirebaseConstants.USERS_DATA)
      .doc(userUid)
      .collection(AppFirebaseConstants.EXPENSES)
      .where("timestamp", ">=", fromTimeInMillis)
      .where("timestamp", "<=", tillTimeInMillis)
      .orderBy("timestamp")
      .get();
    if (querySnapshot.empty) return expensesList;
    querySnapshot.docs.forEach((doc) => {
      var currentExpense = doc.data();
      expensesList.push({
        id: currentExpense.id,
        timestamp: currentExpense.timestamp,
        day: currentExpense.day,
        month: currentExpense.month,
        year: currentExpense.year,
        type: currentExpense.type,
        cost: currentExpense.cost,
        comment: currentExpense.comment,
      });
    });
    return expensesList;
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};
