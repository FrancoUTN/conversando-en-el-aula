import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../ui/Button';
import FlatButton from '../ui/FlatButton';
import Input from './Input';

function AuthForm({ onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const {
    email: emailIsInvalid,
    password: passwordIsInvalid
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      password: enteredPassword
    });
  }

  function accesoAdminHandler() {
    setEnteredEmail('admin@admin.com');
    setEnteredPassword('111111');
  }

  function accesoInvitadoHandler() {
    setEnteredEmail('invitado@invitado.com');
    setEnteredPassword('222222');
  }

  function accesoUsuarioHandler() {
    setEnteredEmail('usuario@usuario.com');
    setEnteredPassword('333333');
  }

  function accesoAnonimoHandler() {
    setEnteredEmail('anonimo@anonimo.com');
    setEnteredPassword('444444');
  }

  function accesoTesterHandler() {
    setEnteredEmail('tester@tester.com');
    setEnteredPassword('555555');
  }

  return (
    <View>
      <View style={styles.accesos}>
        <Text style={styles.texto}>
          Eres:
        </Text>
        <View>
          <View style={styles.buttons}>
            <FlatButton onPress={accesoAdminHandler}>
              Admin
            </FlatButton>
          </View>
          <View style={styles.buttons}>
            <FlatButton onPress={accesoInvitadoHandler} >
              Invitado
            </FlatButton>
          </View>
          <View style={styles.buttons}>
            <FlatButton onPress={accesoUsuarioHandler} >
              Usuario
            </FlatButton>
          </View>
          <View style={styles.buttons}>
            <FlatButton onPress={accesoAnonimoHandler} >
              Anónimo
            </FlatButton>
          </View>
          <View style={styles.buttons}>
            <FlatButton onPress={accesoTesterHandler} >
              Tester
            </FlatButton>
          </View>
        </View>
      </View>
        <Input
          label="Correo electrónico"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        <Input
          label="Contraseña"
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
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
