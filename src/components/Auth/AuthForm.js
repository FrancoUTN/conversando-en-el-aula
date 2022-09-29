import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';

import Button from '../ui/Button';
import Input from './Input';
import { Colors } from '../../constants/styles';

function AuthForm({ onSubmit, credentialsInvalid }) {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [valorSeleccionado, setValorSeleccionado] = useState();

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
      case 'manual':
        setCorreo('');
        setClave('');
        break;
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
        style={styles.picker}
        dropdownIconColor={Colors.secondary}
        prompt={'Usuarios:'}
        // mode={'dropdown'}
      >
        <Picker.Item
          label="Manual"
          value="manual"
          color={Colors.primary800}
          fontFamily={'Montserrat_400Regular'}
          style={styles.pickerItem}
        />
        <Picker.Item
          label="Administrador"
          value="admin"
          color={Colors.primary800}
          fontFamily={'Montserrat_400Regular'}
          style={styles.pickerItem}
        />
        <Picker.Item
          label="Invitado"
          value="invitado"
          color={Colors.primary800}
          fontFamily={'Montserrat_400Regular'}
          style={styles.pickerItem}
        />
        <Picker.Item
          label="Usuario"
          value="usuario"
          color={Colors.primary800}
          fontFamily={'Montserrat_400Regular'}
          style={styles.pickerItem}
        />
        <Picker.Item
          label="Anónimo"
          value="anonimo"
          color={Colors.primary800}
          fontFamily={'Montserrat_400Regular'}
          style={styles.pickerItem}
        />
        <Picker.Item
          label="Tester"
          value="tester"
          color={Colors.primary800}
          fontFamily={'Montserrat_400Regular'}
          style={styles.pickerItem}
        />
      </Picker>
      <View style={styles.buttons}>
        <Button onPress={submitHandler}>
          Entrar
        </Button>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
    alignSelf: 'center'
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
  },
  picker: {
    color: Colors.secondary,
    width: 235,
    alignSelf: 'center',
    backgroundColor: Colors.primary500,
    borderRadius: 20,
    marginVertical: 36
  },
  pickerItem: {
    fontSize: 20,
  }
});
