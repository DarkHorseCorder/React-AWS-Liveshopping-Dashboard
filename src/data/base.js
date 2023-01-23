import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "Your Firebase API",
  authDomain:"Your Firebase AuthDomain",
  databaseURL: "Your Firebase Database URL",
  projectId: "Your Firebase ProjectID",
  storageBucket: "Your Firebase StorageBucket Id",
  messagingSenderId: "Your Firebase SenderId",
  appId:"Your Firebase APP Id"
});

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const db = firebase.firestore();

export default app;
