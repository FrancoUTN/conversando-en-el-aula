import { StyleSheet, View } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';

import { database } from '../util/fire';
import GiantButton from '../components/ui/GiantButton';
import { Colors } from '../constants/styles';
import { TextInput } from 'react-native-web';
import Input from '../components/Auth/Input';


export default function AulaScreen({route}) {
  async function firebaseTestHandler() {
    const querySnapshot = await getDocs(collection(database, "usuarios"));

    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().correo}: ${doc.data().perfil}`);
    });
  }

  const color = route.params?.division === 'PPS-4A' ? Colors.pps4a : Colors.pps4b;

  return (
    <View style={[styles.rootContainer, {backgroundColor: color}]}>
      <View>

      </View>
      {/* <TextInput
        style={styles.input}
        // keyboardType={keyboardType}
        // secureTextEntry={secure}
        // onChangeText={onUpdateValue}
        // value={value}
      /> */}
    </View>
  );
}

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
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    // backgroundColor: ,
    borderRadius: 4,
    fontSize: 16,
  },
});
