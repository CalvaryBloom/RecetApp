import React, { useState } from 'react'; // 1. Importamos useState
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { API_BASE_URL } from '../services/service';

const ContrasenyaOlvidada = (props) => {
  // 2. Estados para correo, usuario y la nueva contraseña
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEnviar = async () => {
    // Validaciones de campos vacíos
    if (!correo.trim() || !usuario.trim() || !nuevaPassword.trim()) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      // Endpoint para resetear contraseña validando identidad
      const response = await fetch(`${API_BASE_URL}/auth/password/reset-identity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          correo: correo.trim().toLowerCase(),
          usuario: usuario.trim(),
          nuevaPassword: nuevaPassword
        }), 
      });

      console.log("Código de estado:", response.status);

      if (response.ok) {
        const texto = await response.text();
        Alert.alert("Éxito", texto || "La contraseña ha sido actualizada correctamente.", [
          { text: "OK", onPress: () => props.navigation.goBack() }
        ]);
      } else {
        if (response.status === 403) {
          throw new Error("Acceso denegado (403). Revisa la configuración de Spring Security.");
        }
        
        // Aquí el backend debería devolver error si el usuario/correo no coinciden
        const errorBackend = await response.text();
        throw new Error(errorBackend || "Los datos no coinciden con nuestros registros.");
      }
    } catch (error) {
      console.error("Error detallado:", error);
      Alert.alert("Error de Verificación", error.message);
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
          ¡Recupera tu acceso!{"\n"}
          Ingresa tu correo y nombre de usuario. Si ambos coinciden en nuestra base de datos, actualizaremos tu contraseña.
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

        <Text style={styles.label}>NOMBRE DE USUARIO</Text>
        <TextInput
          style={styles.input}
          placeholder="Tu nombre de usuario"
          value={usuario}
          onChangeText={setUsuario}
          autoCapitalize="none"
        />

        <Text style={styles.label}>NUEVA CONTRASEÑA</Text>
        <TextInput
          style={styles.input}
          placeholder="Introduce tu nueva contraseña"
          secureTextEntry={true}
          value={nuevaPassword}
          onChangeText={setNuevaPassword}
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
            <Text style={styles.buttonText}>Actualizar Contraseña</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

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