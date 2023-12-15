import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPVG2V0AOfEHnedEnCFzy3z2SoYCqUpRY",
  authDomain: "blog-image-814b7.firebaseapp.com",
  projectId: "blog-image-814b7",
  storageBucket: "blog-image-814b7.appspot.com",
  messagingSenderId: "86315312497",
  appId: "1:86315312497:web:52d375dbcbe53e869902d0",
  measurementId: "G-2VDQ8D7NR2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
