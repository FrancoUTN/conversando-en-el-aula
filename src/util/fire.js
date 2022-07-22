import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAe_uNqlwLgWeOYoqWjc0k26qCoPSBMXbw",
  authDomain: "react-native-79690.firebaseapp.com",
  projectId: "react-native-79690",
  storageBucket: "react-native-79690.appspot.com",
  messagingSenderId: "509196424145",
  appId: "1:509196424145:web:02fff0fcf2f6c444ab06f0"
};

initializeApp(firebaseConfig);

export const database = getFirestore();
