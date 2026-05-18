import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BarraBusqueda from "../components/BarraBusqueda";
import styles from "../styles/PerfilUsuario";
import { API_BASE_URL } from "../services/service";

const API_URL_ME = `${API_BASE_URL}/usuarios/me`;
const API_URL_ALERGIAS = `${API_BASE_URL}/usuarios/me/alergias`;

export default function EditarUsuario({
  navigation,
  route,
  setUser,
  token: tokenProp,
}) {
  const token = tokenProp || route.params?.token;
  const { user } = route.params || {};

  const [nombre, setNombre] = useState(user?.nombre || "");
  const [apellidos, setApellidos] = useState(user?.apellidos || "");
  const [correo, setCorreo] = useState(user?.correo || "");
  const [password, setPassword] = useState("");
  const [alergias, setAlergias] = useState(
    Array.isArray(user?.alergias)
      ? user.alergias.join(", ")
      : user?.alergias || "",
  );
  const [loading, setLoading] = useState(false);

  const actualizar = async () => {
    if (!token) {
      console.error("DEBUG: Token no encontrado en props ni en params");
      Alert.alert(
        "Error de Sesión",
        "No se detectó una sesión activa. Por favor, cierra sesión y vuelve a entrar.",
      );
      return;
    }

    setLoading(true);
    try {
      const resMe = await fetch(API_URL_ME, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, apellidos, correo }),
      });

      if (resMe.status === 401) {
        throw new Error("Sesión caducada o token inválido.");
      }

      if (!resMe.ok) {
        const errorMsg = await resMe.text();
        throw new Error(errorMsg || "Error al actualizar datos básicos.");
      }

      const usuarioActualizado = await resMe.json();


      const listaAlergias =
        alergias && alergias.trim().length > 0
          ? alergias
              .split(",")
              .map((item) => item.trim())
              .filter((i) => i !== "")
          : [];

      if (listaAlergias.length > 0) {

        const resAlergias = await fetch(API_URL_ALERGIAS, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ alergias: listaAlergias }),
        });

        if (!resAlergias.ok) {
          throw new Error("El servidor rechazó la lista de alergias.");
        }
      } else {

        const alergiasAnteriores = user?.alergias || [];
        for (const alergia of alergiasAnteriores) {
          const resDelete = await fetch(`${API_URL_ALERGIAS}/${alergia}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          });
          if (!resDelete.ok) {
            console.error(`No se pudo eliminar la alergia: ${alergia}`);
          }
        }
      }

      usuarioActualizado.alergias = listaAlergias;
      if (setUser) setUser(usuarioActualizado);

      Alert.alert("¡Hecho!", "Tu perfil ha sido actualizado.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error("ERROR ACTUALIZAR:", error.message);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5EEDC" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/image1.png")}
            style={styles.image}
          />
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Editar Usuario</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-outline"
              size={28}
              color="#8A6F4D"
            />
          </TouchableOpacity>
        </View>

      <View style={styles.field}>
        <Text style={styles.label}>NOMBRE</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>APELLIDOS</Text>
        <TextInput
          style={styles.input}
          value={apellidos}
          onChangeText={setApellidos}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
        <TextInput
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>ALERGIAS</Text>
        <TextInput
          style={styles.input}
          value={alergias}
          onChangeText={setAlergias}
          placeholder="Ej: Lactosa, Gluten (opcional)"
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={actualizar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.buttonText}>Actualizar</Text>
        )}
      </TouchableOpacity>

      </ScrollView>

      <BarraBusqueda currentRoute="PerfilUsuario" token={token} />
    </View>
  );
}
