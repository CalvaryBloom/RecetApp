import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Registro from './src/screens/Registro';
import ContrasenyaOlvidada from './src/screens/ContrasenyaOlvidada';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        
        {/* Logo desde assets */}
        <Image
          source={require('./assets/image1.png')}
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


const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* IMPORTANTE
            PARA QUE FUNCIONE CORRECTAMENTE LA NAVEGACION TIENE  QUE ESTAR AQUI TODAS LAS PANTALLAS
          */}
          <Stack.Screen name="Inicio" component={HomeScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registro" component={Registro} />
          <Stack.Screen name="ContrasenyaOlvidada" component={ContrasenyaOlvidada} />
        </Stack.Navigator>
      </NavigationContainer>
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