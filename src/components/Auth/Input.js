import { View, Text, TextInput, StyleSheet } from 'react-native';

import { Colors } from '../../constants/styles';

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 16,
  },
  label: {
    color: 'white',
    marginBottom: 10,
    fontFamily: 'Montserrat_400Regular',
    textAlign: 'center',
    fontSize: 24
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: Colors.primary100,
    borderRadius: 20,
    fontSize: 22,
    fontFamily: 'Montserrat_400Regular',
    color: Colors.primary800,
    textAlign: 'center'
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
