import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BarraBusqueda from "../components/BarraBusqueda";
import styles from "../styles/RecetaBuscada";

export default function RecetaBuscada(props) {
  const navigation = props.navigation;
  const route = props.route;

  const recetaPorDefecto = {
    title: "Receta",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=60",
    description: "Descripción no disponible.",
    ingredients: ["1 ingrediente", "2 ingrediente", "3 ingrediente"],
  };

  let receta = recetaPorDefecto;

  if (route && route.params && route.params.recipe) {
    receta = route.params.recipe;
  }

  let ingredientes = recetaPorDefecto.ingredients;

  if (receta.ingredients && Array.isArray(receta.ingredients)) {
    if (receta.ingredients.length > 0) {
      ingredientes = receta.ingredients;
    }
  }

  const [esFavorito, setEsFavorito] = useState(false);

  function volverAtras() {
    navigation.goBack();
  }

  function cambiarFavorito() {
    if (esFavorito === true) {
      setEsFavorito(false);
      navigation.navigate("ElegirLista");
    } else {
      setEsFavorito(true);
    }
  }

  let iconoFavorito = "heart-outline";
  let colorFavorito = "#666";

  if (esFavorito === true) {
    iconoFavorito = "heart";
    colorFavorito = "#FF4B4B";
  }

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
            onPress={volverAtras}
            accessibilityLabel="Volver"
          >
            <Ionicons name="arrow-back-outline" size={26} color="#333" />
          </TouchableOpacity>
        </View>

        <Text style={styles.chosenLabel}>Has elegido:</Text>

        <View style={styles.chosenBar}>
          <Text style={styles.chosenText} numberOfLines={1}>
            {receta.title}
          </Text>
          <Ionicons name="search-outline" size={20} color="#666" />
        </View>

        <Text style={styles.title}>{receta.title}</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.imageWrapper}>
            <Image source={{ uri: receta.image }} style={styles.image} />

            <TouchableOpacity
              style={styles.heartButton}
              onPress={cambiarFavorito}
              accessibilityLabel="Marcar como favorito"
            >
              <Ionicons name={iconoFavorito} size={22} color={colorFavorito} />
            </TouchableOpacity>
          </View>

          <View style={styles.ingredientsHeader}>
            <Text style={styles.ingredientsTitle}>INGREDIENTES</Text>
            <Ionicons name="restaurant-outline" size={18} color="#8C7A5A" />
          </View>

          <View style={styles.ingredientsBox}>
            {ingredientes.map((ingrediente, idx) => (
              <Text key={idx} style={styles.ingredientItem}>
                • {ingrediente}
              </Text>
            ))}
          </View>

          <View style={styles.bottomSpace} />
        </ScrollView>
      </View>

      <BarraBusqueda currentRoute="Home" />
    </SafeAreaView>
  );
}
