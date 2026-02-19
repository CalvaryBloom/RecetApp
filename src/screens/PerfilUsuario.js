import React from "react";
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
          <Ionicons name="exit-outline" size={28} color="black" />
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
        onPress={() => navigation.navigate("EditarUsuario")}
      >
        <Text style={styles.buttonText}>Editar usuario</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5EEDC",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 50,
    borderRadius: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  field: {
    marginBottom: 15,
  },
  label: {
    fontSize: 13,
    color: "#555",
  },
  value: {
    fontSize: 16,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: "#CCD5AE",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 17,
    fontWeight: "bold",
  },
});