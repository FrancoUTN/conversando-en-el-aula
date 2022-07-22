import { StyleSheet, Text, View } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, getDocs, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAe_uNqlwLgWeOYoqWjc0k26qCoPSBMXbw",
  authDomain: "react-native-79690.firebaseapp.com",
  projectId: "react-native-79690",
  storageBucket: "react-native-79690.appspot.com",
  messagingSenderId: "509196424145",
  appId: "1:509196424145:web:02fff0fcf2f6c444ab06f0"
};

initializeApp(firebaseConfig);

const firestore = getFirestore();


function WelcomeScreen() {
  async function firebaseTestHandler() {
    const querySnapshot = await getDocs(collection(firestore, "usuarios"));

    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().correo}: ${doc.data().perfil}`);
    });
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text onPress={firebaseTestHandler}>Firebase test</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
