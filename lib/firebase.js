import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


 const firebaseConfig = {
    apiKey: "AIzaSyAXsRv0Xes__HpYtUlEVfCrBeTrHSHuDXA",
    authDomain: "barcode-product-system-73833.firebaseapp.com",
    projectId: "barcode-product-system-73833",
    storageBucket: "barcode-product-system-73833.firebasestorage.app",
    messagingSenderId: "24930413916",
    appId: "1:24930413916:web:95669fd9f3692140306599"
  };
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
