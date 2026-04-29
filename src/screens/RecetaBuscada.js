import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BarraBusqueda from "../components/BarraBusqueda";
import styles from "../styles/RecetaBuscada";
import { API_BASE_URL } from "../services/service";

export default function RecetaBuscada(props) {
  const navigation = props.navigation;
  const route = props.route;
  const token = props.token;

  const receta = route.params?.recipe;

  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    if (receta?.id && token) {
      checkFavorito();
    }
  }, [receta?.id, token]);

  const checkFavorito = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/favoritos/isFavorite/${receta.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const isFav = await res.json();
        setEsFavorito(isFav);
      }
    } catch (e) {
      console.error(e);
    }
  };

  function volverAtras() {
    navigation.goBack();
  }

  async function cambiarFavorito() {
    if (!receta?.id || !token) {
        // Fallback for testing without token
        const nuevoEstado = !esFavorito;
        setEsFavorito(nuevoEstado);
        if (nuevoEstado) {
          navigation.navigate("ElegirLista", { receta });
        }
        return;
    }

    const nuevoEstado = !esFavorito;
    setEsFavorito(nuevoEstado); // Optimistic UI

    try {
      const res = await fetch(`${API_BASE_URL}/favoritos/toggle/${receta.id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        if (nuevoEstado) {
          navigation.navigate("ElegirLista", { receta });
        }
      } else {
        // Revert on failure
        setEsFavorito(!nuevoEstado);
      }
    } catch (error) {
      console.error("Error toggling favorite", error);
      setEsFavorito(!nuevoEstado);
    }
  }

  // 🔴 Adaptamos nombres del backend
  const titulo = receta?.titulo || "Sin título";
  const imagen = receta?.imagenUrl;
  const descripcion = receta?.descripcion;

  // 🔥 IMPORTANTE: ingredientes vienen como objetos
  const ingredientes = receta?.ingredientes || [];

  let iconoFavorito = esFavorito ? "heart" : "heart-outline";
  let colorFavorito = esFavorito ? "#FF4B4B" : "#666";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/image1.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <TouchableOpacity style={styles.iconButton} onPress={volverAtras}>
            <Ionicons name="arrow-back-outline" size={26} color="#333" />
          </TouchableOpacity>
        </View>

        <Text style={styles.chosenLabel}>Has elegido:</Text>

        <View style={styles.chosenBar}>
          <Text style={styles.chosenText} numberOfLines={1}>
            {titulo}
          </Text>
          <Ionicons name="search-outline" size={20} color="#666" />
        </View>

        <Text style={styles.title}>{titulo}</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* IMAGEN */}
          <View style={styles.imageWrapper}>
            <Image source={{ uri: imagen }} style={styles.image} />

            <TouchableOpacity
              style={styles.heartButton}
              onPress={cambiarFavorito}
            >
              <Ionicons name={iconoFavorito} size={22} color={colorFavorito} />
            </TouchableOpacity>
          </View>

          {/* DESCRIPCIÓN */}
          <Text style={{ margin: 10 }}>{descripcion}</Text>

          {/* INGREDIENTES */}
          <View style={styles.ingredientsHeader}>
            <Text style={styles.ingredientsTitle}>INGREDIENTES</Text>
            <Ionicons name="restaurant-outline" size={18} color="#8C7A5A" />
          </View>

          <View style={styles.ingredientsBox}>
            {ingredientes.length > 0 ? (
              ingredientes.map((ing, idx) => (
                <Text key={idx} style={styles.ingredientItem}>
                  • {ing.nombre} {ing.cantidad} {ing.unidad}
                </Text>
              ))
            ) : (
              <Text>No hay ingredientes</Text>
            )}
          </View>

          <View style={styles.bottomSpace} />
        </ScrollView>
      </View>

      <BarraBusqueda currentRoute="Home" token={token} />
    </SafeAreaView>
  );
}
