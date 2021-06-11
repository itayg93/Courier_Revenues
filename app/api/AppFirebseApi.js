import firebase from "firebase";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { AppFirebaseConstants } from "./AppFirebseConstants";
import { formatTime } from "../util";

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
    .collection(AppFirebaseConstants.USERS_DATA)
    .doc(userUid)
    .collection(AppFirebaseConstants.PROFILES)
    .doc(userUid)
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
      .collection(AppFirebaseConstants.USERS_DATA)
      .doc(userUid)
      .collection(AppFirebaseConstants.PROFILES)
      .doc(userUid)
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
    .collection(AppFirebaseConstants.USERS_DATA)
    .doc(userUid)
    .collection(AppFirebaseConstants.PROFILES)
    .doc(userUid)
    .set({
      isSubmitExpenses: values.isSubmitExpenses,
      taxPoints: Number(values.taxPoints),
      commissionRate: Number(values.commissionRate),
      compulsoryInsurance: Number(values.compulsoryInsurance),
      collateralInsurance: Number(values.collateralInsurance),
      personalInsurance: Number(values.personalInsurance),
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
      dataType: "Expense",
      id: expenseId,
      timestamp: date.getTime(),
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      type: values.expenseType,
      cost: Number(values.expenseCost),
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
        dataType: currentExpense.dataType,
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

// shifts

const fetchCommissionRate = async (userUid) => {
  try {
    var querySnapshot = await firebase
      .firestore()
      .collection(AppFirebaseConstants.USERS_DATA)
      .doc(userUid)
      .collection(AppFirebaseConstants.PROFILES)
      .doc(userUid)
      .get();
    const { commissionRate } = querySnapshot.data();
    return commissionRate;
  } catch (error) {
    console.log(error);
  }
};

export const saveShift = async (
  userUid,
  timer,
  values,
  setLoading,
  setShowSaveDialog,
  resetForm
) => {
  // handle date and time
  var currentTime = new Date();
  var currentHour = currentTime.getHours();
  if (currentHour >= 0 && currentHour <= 8) {
    currentTime = new Date(currentTime.getTime() - 86400000);
    console.log(currentTime);
  }
  // company commission rate
  var commissionRate = await fetchCommissionRate(userUid);
  // wolt
  var wolt = Number(values.wolt);
  var woltAfterCommission = wolt - (wolt * commissionRate) / 100;
  var woltDelta = wolt - woltAfterCommission;
  // credit tips
  var creditTips = 0;
  if (values.creditTips) {
    creditTips = Number(values.creditTips);
  }
  var creditTipsAfterVAT = 0;
  var creditTipsAfterVatAndCommission = 0;
  var creditTipsDelta = 0;
  if (creditTips > 0) {
    creditTipsAfterVAT = creditTips - (creditTips * 17) / 100;
    creditTipsAfterVatAndCommission =
      creditTipsAfterVAT - (creditTipsAfterVAT * commissionRate) / 100;
    creditTipsDelta = creditTipsAfterVAT - creditTipsAfterVatAndCommission;
  }
  // cash tips
  var cashTips = 0;
  if (values.cashTips) {
    cashTips = Number(values.cashTips);
  }
  // total
  var total = wolt + creditTips + cashTips;
  // total after commission and vat on credit tips
  var totalAfterCommission =
    woltAfterCommission + creditTipsAfterVatAndCommission + cashTips;
  // hourly wage
  var hourlyWage = totalAfterCommission / formatTime(timer, true);
  //
  var shiftId = uuidv4().toString();
  firebase
    .firestore()
    .collection(AppFirebaseConstants.USERS_DATA)
    .doc(userUid)
    .collection(AppFirebaseConstants.SHIFTS)
    .doc(shiftId)
    .set({
      dataType: "Shift",
      id: shiftId,
      timestamp: currentTime.getTime(),
      day: currentTime.getDate(),
      month: currentTime.getMonth() + 1,
      year: currentTime.getFullYear(),
      timeInSeconds: timer,
      deliveries: Number(values.deliveries),
      commissionRate,
      wolt,
      woltAfterCommission,
      woltDelta,
      creditTips,
      creditTipsAfterVAT,
      creditTipsAfterVatAndCommission,
      creditTipsDelta,
      cashTips,
      total,
      totalAfterCommission,
      hourlyWage,
    })
    .then(() => {
      setLoading(false);
      resetForm();
      setShowSaveDialog(false);
    })
    .catch((error) => {
      setLoading(false);
      console.log(error);
    });
};

export const fetchShifts = async (
  userUid,
  setLoading,
  fromTimeInMillis,
  tillTimeInMillis
) => {
  try {
    var shiftsList = [];
    var querySnapshot = await firebase
      .firestore()
      .collection(AppFirebaseConstants.USERS_DATA)
      .doc(userUid)
      .collection(AppFirebaseConstants.SHIFTS)
      .where("timestamp", ">=", fromTimeInMillis)
      .where("timestamp", "<=", tillTimeInMillis)
      .orderBy("timestamp")
      .get();
    if (querySnapshot.empty) return shiftsList;
    querySnapshot.docs.forEach((doc) => {
      var currentShift = doc.data();
      shiftsList.push({
        dataType: currentShift.dataType,
        id: currentShift.id,
        timestamp: currentShift.timestamp,
        day: currentShift.day,
        month: currentShift.month,
        year: currentShift.year,
        timeInSeconds: currentShift.timeInSeconds,
        deliveries: currentShift.deliveries,
        commissionRate: currentShift.commissionRate,
        wolt: currentShift.wolt,
        woltAfterCommission: currentShift.woltAfterCommission,
        woltDelta: currentShift.woltDelta,
        creditTips: currentShift.creditTips,
        creditTipsAfterVAT: currentShift.creditTipsAfterVAT,
        creditTipsAfterVatAndCommission:
          currentShift.creditTipsAfterVatAndCommission,
        creditTipsDelta: currentShift.creditTipsDelta,
        cashTips: currentShift.cashTips,
        total: currentShift.total,
        totalAfterCommission: currentShift.totalAfterCommission,
        hourlyWage: currentShift.hourlyWage,
      });
    });
    return shiftsList;
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};
