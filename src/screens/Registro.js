import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';

import styles from '../styles/Registro';
import { API_BASE_URL } from '../services/service';

export default function Registro({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegistro = async () => {
    if (!nombre || !apellidos || !correo || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/usuarios/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre,
          apellidos: apellidos,
          correo: correo,
          password: password,
          alergias: []
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("¡Éxito!", "Usuario registrado correctamente", [
          { text: "Ir al Login", onPress: () => navigation.navigate('Login') }
        ]);
      } else {
        Alert.alert("Error", data.error || "No se pudo realizar el registro");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <Image
        source={require('../../assets/image1.png')}
        style={styles.logo}
      />

      <Text style={styles.label}>NOMBRE</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Nombre" 
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>APELLIDOS</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Apellidos" 
        value={apellidos}
        onChangeText={setApellidos}
      />

      <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
      <TextInput 
        style={styles.input} 
        placeholder="correo@gmail.com" 
        keyboardType="email-address"
        autoCapitalize="none"
        value={correo}
        onChangeText={setCorreo}
      />

      <Text style={styles.label}>CONTRASEÑA</Text>
      <TextInput 
        style={styles.input} 
        placeholder="********" 
        secureTextEntry 
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity 
        style={[styles.button, loading && { opacity: 0.8 }]} 
        onPress={handleRegistro}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.buttonText}>Registrarse</Text>
        )}
      </TouchableOpacity>

    </View>
  );
}