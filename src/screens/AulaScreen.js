import { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text } from 'react-native';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { Colors } from '../constants/styles';
import IconButton from '../components/ui/IconButton';

import referencia from '../util/firestore';
import moment from 'moment';
import Mensaje from '../components/ui/Mensaje';
import LoadingOverlay from '../components/ui/LoadingOverlay';

export default function AulaScreen({navigation, route}) {
  const auth = getAuth();
  const email = auth.currentUser.email;
  const division = route.params.division;
  const color = division === 'PPS-4A' ? Colors.pps4a : Colors.pps4b;

  const [textoMensaje, setTextoMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  
  useEffect(
    () => navigation.setOptions({ title: division }), []
  );

  function onChangeTextHandler(texto) {
    setTextoMensaje(texto);
  }

  async function onSendHandler() {
    if (textoMensaje.length > 21) {
      error || setError(true);
    }
    else if (textoMensaje != '') {
      setTextoMensaje('');
      error && setError(false);

      const mensaje = {
        division: division,
        texto: textoMensaje,
        autor: email,
        fecha: new Date()
      }

      await addDoc(referencia, mensaje);
    }
  }

  useEffect(() => {
    const q = query(referencia, orderBy("fecha"));

    const unsubscribe = onSnapshot(q, qs => {
      setMensajes(
        qs.docs.reduce(
          (result, doc) => {
            const docDivision = doc.data().division;
            if (docDivision === division) {
              result.push(
                {
                  id: doc.id,
                  division: docDivision,
                  texto: doc.data().texto,
                  autor: doc.data().autor,
                  fecha: doc.data().fecha
                }
              )
            }
            return result;
          }, []
        )
      );

      setCargando(false);
    });
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
    }

    return (
      <Mensaje
        autor={item.autor}
        texto={item.texto}
        fecha={formatDate(item.fecha)}
      />
    );
  }

  if (cargando) {
    return <LoadingOverlay message={'Cargando los mensajes...'} />
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
      <View style={styles.errorContainer}>
      {
        error &&
        <Text style={styles.error}>
          Error: 21 caracteres como máximo.
        </Text>
      }
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
          size={30}
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
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
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
  errorContainer: {
    // minHeight: 15,
  },
  error: {
    color: Colors.secondary,
    marginBottom: 4,
    fontFamily: 'Montserrat_400Regular',
    textAlign: 'center'
  }
});
