import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/RecetaFavorito";
import BarraBusqueda from "../components/BarraBusqueda";
import { API_BASE_URL } from "../services/service";

export default function RecetaFavorita({ route, navigation, token }) {
  const { recetaId, recipe } = route.params || {};
  const recetaIdResuelto =
    recetaId ?? recipe?.id ?? recipe?.recetaId ?? recipe?.idReceta ?? null;

  const [receta, setReceta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    if (recipe) {
      setReceta(recipe);
    }

    if (!recetaIdResuelto || !token) {
      setLoading(false);
      return;
    }

    fetchRecetaCompleta();
    checkFavorito();
  }, [recetaIdResuelto, token]);

  const fetchRecetaCompleta = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/recetas/${recetaIdResuelto}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setReceta(data);
      } else {
        console.error("Error fetching receta", response.status);
      }
    } catch (error) {
      console.error("Error de red", error);
    } finally {
      setLoading(false);
    }
  };

  const checkFavorito = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/favoritos/isFavorite/${recetaIdResuelto}`, {
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

  const obtenerIdRecetaEnItem = (item) =>
    item?.recetaId ?? item?.idReceta ?? item?.receta?.id ?? item?.id ?? null;

  const quitarRecetaDeTodasLasListas = async () => {
    if (!recetaIdResuelto || !token) return;

    try {
      const listasRes = await fetch(`${API_BASE_URL}/listas/mine`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!listasRes.ok) return;

      const listas = await listasRes.json();
      if (!Array.isArray(listas) || listas.length === 0) return;

      for (const lista of listas) {
        const recetasRes = await fetch(`${API_BASE_URL}/listas/${lista.id}/recetas`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!recetasRes.ok) continue;

        const recetasLista = await recetasRes.json();
        const existe = Array.isArray(recetasLista)
          ? recetasLista.some((item) => String(obtenerIdRecetaEnItem(item)) === String(recetaIdResuelto))
          : false;

        if (!existe) continue;

        await fetch(`${API_BASE_URL}/listas/${lista.id}/recetas/${recetaIdResuelto}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error("Error quitando receta de listas:", error);
    }
  };

  async function cambiarFavorito() {
    if (!recetaIdResuelto || !token) return;

    const nuevoEstado = !esFavorito;
    setEsFavorito(nuevoEstado); 

    try {
      const res = await fetch(`${API_BASE_URL}/favoritos/toggle/${recetaIdResuelto}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        if (nuevoEstado && receta) {
          navigation.navigate("ElegirLista", { receta });
        } else {
          await quitarRecetaDeTodasLasListas();
        }
      } else {
        setEsFavorito(!nuevoEstado);
      }
    } catch (error) {
      console.error("Error toggling favorite", error);
      setEsFavorito(!nuevoEstado);
    }
  }

  if (loading) {
      return (
          <SafeAreaView style={[styles.safeArea, {justifyContent: 'center', alignItems: 'center'}]}>
              <ActivityIndicator size="large" color="#D18B47" />
          </SafeAreaView>
      );
  }

  if (!receta) {
      return (
          <SafeAreaView style={[styles.safeArea, {justifyContent: 'center', alignItems: 'center'}]}>
              <Text>No se ha seleccionado ninguna receta.</Text>
              <TouchableOpacity onPress={() => navigation.replace("Inicio")}>
                <Text style={{ marginTop: 10, color: "#8C7A5A", fontWeight: "600" }}>
                  Volver al inicio
                </Text>
              </TouchableOpacity>
          </SafeAreaView>
      );
  }

  const titulo = receta.titulo || "Sin título";
  const imagen = receta.imagenUrl;
  const descripcion = receta.descripcion;
  const ingredientes = receta.ingredientes || [];

  let iconoFavorito = esFavorito ? "heart" : "heart-outline";
  let colorFavorito = esFavorito ? "#FF4B4B" : "#666";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/image1.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
          >
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
          <View style={styles.imageWrapper}>
            {imagen ? (
              <Image source={{ uri: imagen }} style={styles.image} />
            ) : (
              <View
                style={[
                  styles.image,
                  { alignItems: "center", justifyContent: "center", backgroundColor: "#ddd" }
                ]}
              >
                <Text>Sin imagen</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.heartButton}
              onPress={cambiarFavorito}
            >
              <Ionicons
                name={iconoFavorito}
                size={22}
                color={colorFavorito}
              />
            </TouchableOpacity>
          </View>

          <Text style={{ margin: 10 }}>{descripcion}</Text>

          <View style={styles.ingredientsHeader}>
            <Text style={styles.ingredientsTitle}>INGREDIENTES</Text>
            <Ionicons
              name="restaurant-outline"
              size={18}
              color="#8C7A5A"
            />
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

          <View style={{ height: 90 }} />
          <BarraBusqueda currentRoute="Favoritos" token={token} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}