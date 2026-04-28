import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

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

      const response = await fetch('http://192.168.1.140:8080/api/usuarios/login', {
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