import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BarraBusqueda from "../components/BarraBusqueda";
import styles from "../styles/RecetaBuscada";
import { API_BASE_URL } from "../services/service";

export default function RecetaBuscada(props) {
  const navigation = props.navigation;
  const route = props.route;
  const token = props.token || route.params?.token || null;

  const recetaParam = route.params?.recipe;
  const recetaId =
    route.params?.recipeId ??
    recetaParam?.id ??
    recetaParam?.recetaId ??
    recetaParam?.idReceta ??
    null;

  const [receta, setReceta] = useState(recetaParam || null);
  const [loadingReceta, setLoadingReceta] = useState(!recetaParam && !!recetaId);

  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    if (recetaId) {
      fetchRecetaCompleta();
    }
  }, [recetaId, token]);

  useEffect(() => {
    if (recetaId && token) {
      checkFavorito();
    }
  }, [recetaId, token]);

  const fetchRecetaCompleta = async () => {
    if (!recetaId) return;

    try {
      setLoadingReceta(true);
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetch(`${API_BASE_URL}/recetas/${recetaId}`, {
        headers,
      });

      if (response.ok) {
        const data = await response.json();
        setReceta(data);
      } else if (response.status === 403) {
        // Fallback: algunos usuarios no tienen permiso en /recetas/:id,
        // pero sí pueden ver la receta dentro del listado general.
        await fetchRecetaDesdeListado();
      } else {
        console.error("Error cargando receta completa:", response.status);
      }
    } catch (error) {
      console.error("Error de red cargando receta:", error);
    } finally {
      setLoadingReceta(false);
    }
  };

  const fetchRecetaDesdeListado = async () => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetch(`${API_BASE_URL}/recetas/getAll`, { headers });

      if (!response.ok) {
        console.error("Error cargando listado para fallback:", response.status);
        return;
      }

      const data = await response.json();
      const recetaEncontrada = Array.isArray(data)
        ? data.find((item) => String(item.id) === String(recetaId))
        : null;

      if (recetaEncontrada) {
        setReceta(recetaEncontrada);
      } else {
        console.error("No se encontró la receta en fallback getAll");
      }
    } catch (error) {
      console.error("Error en fallback de receta:", error);
    }
  };

  const checkFavorito = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/favoritos/isFavorite/${recetaId}`, {
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
    if (!recetaId || !token) return;

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
          ? recetasLista.some((item) => String(obtenerIdRecetaEnItem(item)) === String(recetaId))
          : false;

        if (!existe) continue;

        await fetch(`${API_BASE_URL}/listas/${lista.id}/recetas/${recetaId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error("Error quitando receta de listas:", error);
    }
  };

  function volverAtras() {
    navigation.goBack();
  }

  async function cambiarFavorito() {
    if (!recetaId || !token) {
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
      const res = await fetch(`${API_BASE_URL}/favoritos/toggle/${recetaId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        if (nuevoEstado) {
          navigation.navigate("ElegirLista", { receta });
        } else {
          await quitarRecetaDeTodasLasListas();
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

  if (loadingReceta) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
          <ActivityIndicator size="large" color="#D18B47" />
        </View>
      </SafeAreaView>
    );
  }

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
