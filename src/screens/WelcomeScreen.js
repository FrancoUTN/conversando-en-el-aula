import { StyleSheet, Text, View } from 'react-native';

import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../util/fire';

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
