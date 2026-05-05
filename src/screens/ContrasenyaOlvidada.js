import React, { useState } from 'react'; // 1. Importamos useState
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { API_BASE_URL } from '../services/service';

const ContrasenyaOlvidada = (props) => {
  // 2. Definimos los estados para el correo y la carga
  const [correo, setCorreo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEnviar = async () => {
  if (!correo.trim()) {
    Alert.alert("Error", "Por favor, introduce tu correo electrónico.");
    return;
  }

  setLoading(true);
  try {
    const response = await fetch(`${API_BASE_URL}/auth/password/forgot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correo: correo.trim().toLowerCase() }), 
    });

    console.log("Código de estado:", response.status);

    if (response.ok) {
      const texto = await response.text();
      Alert.alert("Éxito", texto || "Si el correo existe, recibirás instrucciones pronto.", [
        { text: "OK", onPress: () => props.navigation.goBack() }
      ]);
    } else {
      if (response.status === 403) {
        throw new Error("Acceso denegado (403). Revisa la configuración de Spring Security en el backend.");
      }
      
      const errorBackend = await response.text();
      throw new Error(errorBackend || "Error en el servidor (" + response.status + ")");
    }
  } catch (error) {
    console.error("Error detallado:", error);
    Alert.alert("Error de Conexión", error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../assets/image1.png')}
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
          value={correo}
          onChangeText={setCorreo}
          autoCapitalize="none"
        />

        <TouchableOpacity 
          style={[styles.button, loading && { opacity: 0.7 }]} 
          onPress={handleEnviar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="black" />
          ) : (
            <Text style={styles.buttonText}>Enviar</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// ... Tus estilos se mantienen exactamente igual
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAE0',
  },
  scrollContainer: {
    flexGrow: 1,
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