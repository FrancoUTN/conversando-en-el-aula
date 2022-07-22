import { StyleSheet, View, TextInput } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';

import { database } from '../util/fire';
import GiantButton from '../components/ui/GiantButton';
import { Colors } from '../constants/styles';
import Input from '../components/Auth/Input';
import { useState } from 'react';
import IconButton from '../components/ui/IconButton';


export default function AulaScreen({route}) {
  const [textoMensaje, setTextoMensaje] = useState('');

  async function firebaseTestHandler() {
    const querySnapshot = await getDocs(collection(database, "usuarios"));

    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().correo}: ${doc.data().perfil}`);
    });
  }

  const color = route.params?.division === 'PPS-4A' ? Colors.pps4a : Colors.pps4b;

  function onChangeTextHandler(texto) {
    setTextoMensaje(texto);
  }

  return (
    <View style={[styles.rootContainer, {backgroundColor: color}]}>
      <View style={styles.listaContainer}>

      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={textoMensaje}
          onChangeText={onChangeTextHandler}
        />
        <IconButton
          icon="send"
          color={'white'}
          size={20}
          onPress={onChangeTextHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  listaContainer: {
    flex: 7
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'gray',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 20
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: 'white',
    borderRadius: 4,
    fontSize: 16,
    height: 40,
  },
});
