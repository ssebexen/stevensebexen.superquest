import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "./firebaseConfig";
import { getAuth } from "firebase/auth";

const firebase = initializeApp(firebaseConfig);
export default firebase;