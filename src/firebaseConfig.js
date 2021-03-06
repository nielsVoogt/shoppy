import "firebase/firestore";

import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_FIREBASE_APPID,
  measurementId: process.env.VUE_APP_MEASUREMENTID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase utils
const fb = firebase;
const db = firebase.firestore();
const auth = firebase.auth();

// // firebase collections
const shopsCollection = db.collection("shops");
const shopsSlugCollection = db.collection("slugs");

export { shopsSlugCollection, shopsCollection, auth, fb, db };
