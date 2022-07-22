import { StyleSheet, View } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';

import { database } from '../util/fire';
import GiantButton from '../components/ui/GiantButton';
import { Colors } from '../constants/styles';


function WelcomeScreen() {
  async function firebaseTestHandler() {
    const querySnapshot = await getDocs(collection(database, "usuarios"));

    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().correo}: ${doc.data().perfil}`);
    });
  }

  return (
    <View style={styles.rootContainer}>
      <GiantButton color={{'backgroundColor': Colors.pps4a}}>
        PPS-4A
      </GiantButton>
      <GiantButton color={{'backgroundColor': Colors.pps4b}}>
        PPS-4B
      </GiantButton>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  botonGigante: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  }
});
