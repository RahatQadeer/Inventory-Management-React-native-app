// firebaseConfig.js
import { initializeApp } from '@firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAktu08t0bLiCjwymRCy8G8rqYZF4GbUbU",
  authDomain: "se-5-project.firebaseapp.com",
  projectId: "se-5-project",
  storageBucket: "se-5-project.firebasestorage.app",
  messagingSenderId: "402826773495",
  appId: "1:402826773495:web:50853298842b20599a24f2"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// export default app;
export { app, auth };
