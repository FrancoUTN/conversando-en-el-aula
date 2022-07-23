import { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text } from 'react-native';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { Colors } from '../constants/styles';
import IconButton from '../components/ui/IconButton';

import referencia from '../util/firestore';
import moment from 'moment';
import Mensaje from '../components/ui/Mensaje';

export default function AulaScreen({route}) {
  const auth = getAuth();
  const email = auth.currentUser.email;
  const division = route.params.division;
  const color = division === 'PPS-4A' ? Colors.pps4a : Colors.pps4b;

  const [textoMensaje, setTextoMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);

  function onChangeTextHandler(texto) {
    setTextoMensaje(texto);
  }

  async function onSendHandler() {
    setTextoMensaje('');

    const mensaje = {
      division: division,
      texto: textoMensaje,
      autor: email,
      fecha: new Date()
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
            division: doc.data().division,
            texto: doc.data().texto,
            autor: doc.data().autor,
            fecha: doc.data().fecha
          }
        ))
      )
    })

    return unsubscribe;
  }, [])

  function formatDate(timestamp) {
    const fecha = timestamp.toDate();

    return moment(fecha).format('D/M k:mma')
  }

  function renderizarItem({item}) {
    if (item.autor === email) {
      return (
        <Mensaje
          texto={item.texto}
          fecha={formatDate(item.fecha)}
        />
      )
      return (
        // <View style={styles.containerContainer}>
          <View style={styles.mensajeContainer}>
            <Text style={styles.mensajeTexto}>
              {item.texto}
            </Text>
            <Text style={styles.mensajeTexto}>
              {formatDate(item.fecha)}
            </Text>
          </View>
        // </View>
      );
    }

    return (
      <Mensaje
        autor={item.autor}
        texto={item.texto}
        fecha={formatDate(item.fecha)}
      />
    );

    return (
      <View style={styles.mensajeContainer}>
        <Text style={styles.mensajeTexto}>
          {item.autor}:
        </Text>
        <Text style={styles.mensajeTexto}>
          {item.texto}
        </Text>
        <Text style={styles.mensajeTexto}>
          {formatDate(item.fecha)}
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
          onPress={onSendHandler}
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
    width: '60%',
    alignSelf: 'flex-end'
  },
  mensajeTexto: {
    color: '#111111'
  }
});
