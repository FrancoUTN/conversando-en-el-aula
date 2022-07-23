import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import aplicacion from './fire';
import { signInWithEmailAndPassword } from 'firebase/auth';


const auth = initializeAuth(aplicacion, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export default auth;

export async function login(email, password) {
  const uc = await signInWithEmailAndPassword(auth, email, password);

  return uc;
}
