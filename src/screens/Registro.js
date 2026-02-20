import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

import styles from '../styles/Registro';

export default function Registro({ navigation }) {
  return (
    <View style={styles.container}>

      <Image
        source={require('../../assets/image1.png')}
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

