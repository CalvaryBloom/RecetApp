import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/Inicio';

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

export default Inicio;