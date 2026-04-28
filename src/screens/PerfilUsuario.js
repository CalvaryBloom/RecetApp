import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BarraBusqueda from '../components/BarraBusqueda';
import styles from '../styles/PerfilUsuario';

export default function PerfilUsuario({ navigation, user }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5EEDC" />

      {/* Imagen superior */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/image1.png")}
          style={styles.image}
        />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Perfil Usuario</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="exit-outline" size={28} marginLeft={155}color="black" />
        </TouchableOpacity>
      </View>

      {/* Campos */}
      <View style={styles.field}>
        <Text style={styles.label}>NOMBRE</Text>
        <Text style={styles.value}>{user.nombre}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>APELLIDOS</Text>
        <Text style={styles.value}>{user.apellidos}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
        <Text style={styles.value}>{user.correo}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>CONTRASEÑA</Text>
        <Text style={styles.value}>************</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>ALERGIAS O INGREDIENTES</Text>
        <Text style={styles.value}>{user.alergias}</Text>
      </View>

      {/* Botón editar */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EditarUsuario" )}
      >
        <Text style={styles.buttonText}>Editar usuario</Text>
      </TouchableOpacity>
      <BarraBusqueda currentRoute="PerfilUsuario" />
    </View>
  );
}
