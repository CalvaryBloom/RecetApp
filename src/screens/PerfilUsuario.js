import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BarraBusqueda from "../components/BarraBusqueda";
import styles from "../styles/PerfilUsuario";
import { API_BASE_URL } from "../services/service";

const API_URL = `${API_BASE_URL}/usuarios/me`;

// Recibimos props y route
export default function PerfilUsuario({ navigation, route, ...props }) {
  
  // LOGICA DE SEGURIDAD PARA EL TOKEN:
  // Lo buscamos en route.params (BarraBusqueda) o en props (App.js)
  const token = route.params?.token || props.token;
  const userFromParams = route.params?.user || props.user;

  const [userData, setUserData] = useState(userFromParams || null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    // Si no hay token, lo logueamos para debug
    if (!token) {
      console.log("DEBUG: Sigo sin recibir token. Props:", props.token, "Params:", route.params?.token);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (error) {
      console.error("Error de red en Perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Cargamos datos al entrar
    fetchUserData();

    // Cargamos datos cada vez que la pantalla vuelva a estar en primer plano
    const unsubscribe = navigation.addListener("focus", () => {
      fetchUserData();
    });
    return unsubscribe;
  }, [navigation, token]);

  // Si está cargando y no tenemos datos previos, mostramos spinner
  if (loading && !userData) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#CCD5AE" />
        <Text style={{ marginTop: 10 }}>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5EEDC" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}>
        <View style={styles.imageContainer}>
          <Image source={require("../../assets/image1.png")} style={styles.image} />
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Perfil Usuario</Text>
          <TouchableOpacity onPress={() => navigation.replace("Inicio")}>
              <Ionicons name="log-out-outline" size={28} color="#8A6F4D" />
            </TouchableOpacity>
        </View>

      <View style={styles.field}>
        <Text style={styles.label}>NOMBRE</Text>
        <Text style={styles.value}>{userData?.nombre || "No definido"}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>APELLIDOS</Text>
        <Text style={styles.value}>{userData?.apellidos || "No definido"}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
        <Text style={styles.value}>{userData?.correo || "No definido"}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>CONTRASEÑA</Text>
        <Text style={styles.value}>************</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>ALERGIAS O INGREDIENTES</Text>
        <Text style={styles.value}>
          {Array.isArray(userData?.alergias)
            ? userData.alergias.join(", ")
            : userData?.alergias || "Ninguna"}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EditarUsuario", { user: userData, token: token })}
      >
        <Text style={styles.buttonText}>Editar usuario</Text>
      </TouchableOpacity>
      </ScrollView>

      <BarraBusqueda currentRoute="PerfilUsuario" token={token} user={userData} />
    </View>
  );
}