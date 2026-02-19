import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Registro({ navigation }) {
  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/image1.png')}
        style={styles.logo}
      />

      <Text style={styles.label}>NOMBRE</Text>
      <TextInput style={styles.input} placeholder="Nombre" />

      <Text style={styles.label}>APELLIDOS</Text>
      <TextInput style={styles.input} placeholder="Apellidos" />

      <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
      <TextInput style={styles.input} placeholder="correo@gmail.com" />

      <Text style={styles.label}>CONTRASEÑA</Text>
      <TextInput style={styles.input} placeholder="********" secureTextEntry />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAE0',
    padding: 30,
    justifyContent: 'center',
  },
  logo: {
    width: 320,
    height: 120,
    alignSelf: 'center',
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  forgotPassword: {
    color: '#6C757D',
    marginTop: 10,
    textAlign: 'right',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#CCD5AE',
    paddingVertical: 14,
    borderRadius: 20,
    marginTop: 30,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 20,
  },
  registerText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6C757D',
  },
});
