import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import ContrasenyaOlvidada from './ContrasenyaOlvidada';
export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>

        {/* Logo */}
        <Image
          source={require('../assets/image1.png')}
          style={styles.logo}
        />

        {/* Campo correo */}
        <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
        <TextInput
          style={styles.input}
          placeholder="nombreapellidos@gmail.com"
          keyboardType="email-address"
        />

        {/* Campo contraseña */}
        <Text style={styles.label}>CONTRASEÑA</Text>
        <TextInput
          style={styles.input}
          placeholder="************"
          secureTextEntry={true}
        />

        {/* Botón olvidar contraseña */}
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ContrasenyaOlvidada')}
        >
          <Text style={styles.forgotPassword}>¿Has olvidado la contraseña?</Text>
        </TouchableOpacity>

        {/* Botón iniciar sesión */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Buscador')}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

      </View>
    );
  }
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
});