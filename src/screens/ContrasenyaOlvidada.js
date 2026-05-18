import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { API_BASE_URL } from '../services/service';

const ContrasenyaOlvidada = (props) => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF9E0',
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
    color: '#5C4A33',
    marginBottom: 30,
    paddingHorizontal: 10,
    lineHeight: 22,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D2A478',
    marginBottom: 5,
    marginTop: 10,
    paddingHorizontal: 4,
  },
  input: {
    backgroundColor: '#FBE6CA',
    padding: 14,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#D2A478',
    color: '#5C4A33',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#C8D6B9',
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5C4A33',
  },
});

export default ContrasenyaOlvidada;