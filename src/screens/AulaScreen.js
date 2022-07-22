import { StyleSheet, View, TextInput } from 'react-native';
import { addDoc, collection, getDocs, setDoc } from 'firebase/firestore';

import { database } from '../util/fire';
import GiantButton from '../components/ui/GiantButton';
import { Colors } from '../constants/styles';
import Input from '../components/Auth/Input';
import { useState } from 'react';
import IconButton from '../components/ui/IconButton';


export default function AulaScreen({route}) {
  const color = route.params?.division === 'PPS-4A' ? Colors.pps4a : Colors.pps4b;
  const [textoMensaje, setTextoMensaje] = useState('');

  function onChangeTextHandler(texto) {
    setTextoMensaje(texto);
  }

  async function firebaseTestHandler() {
    const referencia = collection(database, 'mensajes');

    const mensaje = {
      texto: textoMensaje
    }

    const respuesta = await addDoc(referencia, mensaje);
    console.log(respuesta);
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
          onPress={firebaseTestHandler}
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
