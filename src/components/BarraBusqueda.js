// src/components/BarraBusqueda.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function BarraBusqueda({ currentRoute }) {
  const navigation = useNavigation();
  const colorActivo = '#D4A373';
  const colorInactivo = '#F0F2E7';

  const obtenerColor = (ruta) =>
    currentRoute === ruta ? colorActivo : colorInactivo;

  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={() => navigation.navigate('PerfilUsuario')}
        accessibilityLabel="Ir a Perfil"
      >
        <MaterialIcons
          name="person"
          size={28}
          color={obtenerColor('PerfilUsuario')}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        accessibilityLabel="Ir a Home"
      >
        <MaterialIcons name="home" size={28} color={obtenerColor('Home')} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Favoritos')}
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