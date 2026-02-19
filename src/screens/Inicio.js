

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

class Inicio extends Component {
  render() {
    return (
      <View style={styles.container}>
        
        {/* Logo desde assets */}
        <Image
          source={require('../../assets/image1.png')}
          style={styles.logo}
        />

        <Text style={styles.description}>
          Descubre nuevas recetas, guarda tus favoritas y encuentra inspiración
          para cada comida, de forma rápida y sencilla.
        </Text>

        {/* Botón Iniciar Sesión */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        {/* Botón Registrarse */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Registro')}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAE0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },

  logo: {
    width: 320,
    height: 120,
    marginBottom: 20,
  },

  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
    marginBottom: 40,
  },

  button: {
    backgroundColor: '#CCD5AE',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 15,
    width: '70%',
  },

  buttonText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default Inicio;