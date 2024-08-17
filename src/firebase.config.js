import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBlwqx7B6JSlqPscefkfWJJnY-8BjiUavg",
  authDomain: "reastaurantapp-c6694.firebaseapp.com",
  databaseURL: "https://reastaurantapp-c6694-default-rtdb.firebaseio.com",
  projectId: "reastaurantapp-c6694",
  storageBucket: "reastaurantapp-c6694.appspot.com",
  messagingSenderId: "253096656289",
  appId: "1:253096656289:web:cfe966b156461f26d49fe0",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const fireStore = getFirestore(app);
const storage = getStorage(app);

export { app, fireStore, storage };
