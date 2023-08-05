import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD7MNHEKolicuKYabftCqhZdsVwd_VXNJ0",
    authDomain: "explorway-ff27c.firebaseapp.com",
    projectId: "explorway-ff27c",
    storageBucket: "explorway-ff27c.appspot.com",
    messagingSenderId: "358044858800",
    appId: "1:358044858800:web:b4f00b125c99e993757e75",
    measurementId: "G-WBMDV797B4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const userDataCollection= collection(db, "userData");

export {db, userDataCollection};