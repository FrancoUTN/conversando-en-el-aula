import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';

import Button from '../ui/Button';
import Input from './Input';

function AuthForm({ onSubmit, credentialsInvalid }) {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [valorSeleccionado, setValorSeleccionado] = useState('Hola');

  const {
    email: emailIsInvalid,
    password: passwordIsInvalid
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setCorreo(enteredValue);
        break;
      case 'password':
        setClave(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: correo,
      password: clave
    });
  }

  function onPressItemHandler(name) {
    setValorSeleccionado(name);
    switch (name) {
      case 'admin':
        setCorreo('admin@admin.com');
        setClave('111111');
        break;
      case 'invitado':
        setCorreo('invitado@invitado.com');
        setClave('222222');
        break;
      case 'usuario':
        setCorreo('usuario@usuario.com');
        setClave('333333');
        break;
      case 'anonimo':
        setCorreo('anonimo@anonimo.com');
        setClave('444444');
        break;
      case 'tester':
        setCorreo('tester@tester.com');
        setClave('555555');
        break;
    }
  }

  return (
    <View>
      <Input
        label="Correo"
        onUpdateValue={updateInputValueHandler.bind(this, 'email')}
        value={correo}
        keyboardType="email-address"
        isInvalid={emailIsInvalid}
      />
      <Input
        label="Clave"
        onUpdateValue={updateInputValueHandler.bind(this, 'password')}
        secure
        value={clave}
        isInvalid={passwordIsInvalid}
      />
      <Picker
        selectedValue={valorSeleccionado}
        onValueChange={
          (itemValue) => onPressItemHandler(itemValue)
        }
        style={{color: 'white'}}
        // mode={'dropdown'}
      >
        <Picker.Item label="Administrador" value="admin" />
        <Picker.Item label="Invitado" value="invitado" />
        <Picker.Item label="Usuario" value="usuario" />
        <Picker.Item label="Anónimo" value="anonimo" />
        <Picker.Item label="Tester" value="tester" />
      </Picker>
      <View style={styles.buttons}>
        <Button onPress={submitHandler}>
          Ingresar
        </Button>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
  texto: {
    fontFamily: 'Montserrat_500Medium',
    color: 'white',
    textAlign: 'center',
    fontSize: 26
  },
  accesos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30
  }
});
