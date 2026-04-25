import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
} from "react-native";

import BarraBusqueda from "../components/BarraBusqueda";
import API_URL from "../api/api";

export default function RecetaLista({ route, navigation }) {
  const { listaId } = route.params;
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    cargarRecetas();
  }, []);

  const cargarRecetas = async () => {
    try {
      const response = await fetch(`${API_URL}/listas/${listaId}/recetas`);
      const data = await response.json();

      const recetasFormateadas = data.map((item) => item.receta || item);

      setRecetas(recetasFormateadas);
    } catch (error) {
      console.log("Error cargando recetas de la lista:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/image1.png")}
          style={styles.logo}
        />

        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {recetas.length === 0 ? (
          <Text style={styles.noRecipes}>
            No hay recetas en esta lista
          </Text>
        ) : (
          recetas.map((recipe) => (
            <View key={recipe.id} style={styles.card}>
              <Text style={styles.title}>{recipe.title || recipe.nombre}</Text>

              <Image
                source={{ uri: recipe.image || recipe.imagen }}
                style={styles.image}
              />

              <Text style={styles.description}>
                {recipe.description || recipe.descripcion}
              </Text>
            </View>
          ))
        )}
      </ScrollView>

      <BarraBusqueda currentRoute="Favoritos" />
    </SafeAreaView>
  );
}