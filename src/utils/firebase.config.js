import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'react-firebase-cd726.firebaseapp.com',
  projectId: 'react-firebase-cd726',
  storageBucket: 'react-firebase-cd726.appspot.com',
  messagingSenderId: '1043866738512',
  appId: '1:1043866738512:web:9c3edb7b0d015e3ed49655',
});

export const auth = app.auth();
export const db = getFirestore();
export default app;

