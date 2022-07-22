import { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text } from 'react-native';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';

import { database } from '../util/fire';
import { Colors } from '../constants/styles';
import IconButton from '../components/ui/IconButton';


export default function AulaScreen({route}) {
  const color = route.params?.division === 'PPS-4A' ? Colors.pps4a : Colors.pps4b;
  const referencia = collection(database, 'mensajes');
  const [textoMensaje, setTextoMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);

  function onChangeTextHandler(texto) {
    setTextoMensaje(texto);
  }

  async function firebaseTestHandler() {
    setTextoMensaje('');

    const mensaje = {
      texto: textoMensaje
    }

    await addDoc(referencia, mensaje);
  }

  useEffect(() => {
    const q = query(referencia);

    const unsubscribe = onSnapshot(q, qs => {
      setMensajes(
        qs.docs.map(doc => (
          {
            id: doc.id,
            texto: doc.data().texto
          }
        ))
      )
    })

    return unsubscribe;
  }, [])

  function renderizarItem({item}) {
    return (
      <View style={styles.mensajeContainer}>
        <Text style={styles.mensajeTexto}>
          {item.texto}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.rootContainer, {backgroundColor: color}]}>
      <View style={styles.listaContainer}>
        <FlatList
          data={mensajes}
          renderItem={renderizarItem}
          keyExtractor={item => item.id}
        >

        </FlatList>
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
    flex: 7,
    padding: 5
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'gray',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    // paddingBottom: 20
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
  mensajeContainer: {    
    backgroundColor: 'white',
    borderRadius: 4,
    margin: 5,
    padding: 3,
    width: '60%'
  },
  mensajeTexto: {
    color: '#111111'
  }
});
