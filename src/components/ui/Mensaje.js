import { StyleSheet, Text, View } from 'react-native';

export default function Mensaje({ autor, texto, fecha }) {
  return (
    <View style={[styles.mensajeContainer, autor || {alignSelf: 'flex-end'}]}>
    {
        !!autor &&
        <Text style={styles.mensajeTexto}>
            {autor}:
        </Text>
    }
        <Text style={styles.mensajeTexto}>
            {texto}
        </Text>
        <Text style={styles.mensajeTexto}>
            {fecha}
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
