// src/components/BarraBusqueda.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

// Recibimos token y user como props desde App.js
export default function BarraBusqueda({ currentRoute, token, user }) {
  const navigation = useNavigation();
  const colorActivo = '#D4A373';
  const colorInactivo = '#F0F2E7';

  const obtenerColor = (ruta) =>
    currentRoute === ruta ? colorActivo : colorInactivo;

  return (
    <View style={styles.container}>

      {/* BOTÓN PERFIL: Ahora envía el token y user global */}
      <TouchableOpacity
        onPress={() => navigation.navigate('PerfilUsuario', { token: token, user: user })}
        accessibilityLabel="Ir a Perfil"
      >
        <MaterialIcons
          name="person"
          size={28}
          color={obtenerColor('PerfilUsuario')}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Home', { token: token, user: user })}
        accessibilityLabel="Ir a Home"
      >
        <MaterialIcons name="home" size={28} color={obtenerColor('Home')} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Favoritos', { token: token })}
        accessibilityLabel="Ir a Favoritos"
      >
        <MaterialIcons
          name="favorite"
          size={28}
          color={obtenerColor('Favoritos')}
        />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#CCD5AE',
    justifyContent: 'space-around',
    paddingVertical: 42,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
});