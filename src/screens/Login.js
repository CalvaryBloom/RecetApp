import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { API_BASE_URL } from '../services/service';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correo: '',
      password: '',
      loading: false
    };
  }

  handleLogin = async () => {
    const { correo, password } = this.state;

    if (!correo || !password) {
      Alert.alert("Error", "Por favor, introduce tu correo y contraseña");
      return;
    }

    try {
      this.setState({ loading: true });

      const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: correo,
          password: password,
        }),
      });

      const responseText = await response.text();
      
      if (!response.ok) {
        try {
          const errorData = JSON.parse(responseText);
          throw new Error(errorData.error || "Credenciales incorrectas");
        } catch (e) {
          throw new Error("Error del servidor: " + response.status);
        }
      }

      const data = JSON.parse(responseText);

      if (data.token) {
        console.log("Login exitoso, token obtenido:", data.token);

        // --- CAMBIOS PARA ESTADO GLOBAL ---
        // Accedemos a las funciones pasadas por App.js
        const { setToken, setUser } = this.props;

        if (setToken && setUser) {
          setToken(data.token);
          setUser(data.usuario);
          console.log("Datos enviados al estado global de App.js ✅");
        } else {
          console.warn("Advertencia: App.js no pasó las funciones setToken/setUser.");
        }
        // ----------------------------------

        this.props.navigation.navigate('Home', { 
          token: data.token, 
          user: data.usuario 
        });
      } else {
        throw new Error("No se recibió el token del servidor");
      }

    } catch (error) {
      console.error("DETALLE ERROR:", error.message);
      Alert.alert("Error de inicio de sesión", error.message);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <View style={styles.container}>

        <Image
          source={require('../../assets/image1.png')}
          style={styles.logo}
        />

        <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
        <TextInput
          style={styles.input}
          placeholder="nombreapellidos@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => this.setState({ correo: text })}
        />

        <Text style={styles.label}>CONTRASEÑA</Text>
        <TextInput
          style={styles.input}
          placeholder="************"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
        />

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ContrasenyaOlvidada')}
        >
          <Text style={styles.forgotPassword}>¿Has olvidado la contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, this.state.loading && { opacity: 0.7 }]}
          onPress={this.handleLogin}
          disabled={this.state.loading}
        >
          <Text style={styles.buttonText}>
            {this.state.loading ? "Cargando..." : "Iniciar Sesión"}
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF9E0',
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
    fontWeight: 'bold',
    color: '#D2A478',
    marginBottom: 5,
    marginTop: 15,
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
  forgotPassword: {
    color: '#D2A478',
    marginTop: 12,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '600',
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