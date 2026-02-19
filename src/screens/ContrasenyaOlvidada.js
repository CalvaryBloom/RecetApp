import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ContrasenyaOlvidada = (props) => {
  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/image1.png')}
        style={styles.logo}
      />

      <Text style={styles.description}>
        ¡Nos pasa a todos!{"\n"}
        Ingresa tu correo electrónico y te ayudaremos a recuperar tu contraseña en unos segundos.
      </Text>

      <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
      <TextInput
        style={styles.input}
        placeholder="nombreapellido@gmail.com"
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>

    </View>
  );
};

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
    marginBottom: 30,
  },

  description: {
    textAlign: 'center',
    fontSize: 15,
    color: '#444',
    marginBottom: 30,
    paddingHorizontal: 10,
    lineHeight: 22,
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
});
export default ContrasenyaOlvidada;