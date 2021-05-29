import firebase from "firebase";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

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
    .then(() => {
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
