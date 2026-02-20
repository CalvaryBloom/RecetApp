import React, { useMemo, useState } from "react";
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

export default function RecetaBuscada({ route, navigation }) {
  // Receta que llega desde Home
  const recipe = route?.params?.recipe;

  // Si no llega nada, ponemos un fallback para que no crashee
  const fallbackRecipe = useMemo(
    () => ({
      title: "Receta",
      image:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=60",
      description: "Descripción no disponible.",
      ingredients: ["1 ingrediente", "2 ingrediente", "3 ingrediente"],
    }),
    [],
  );

  const receta = recipe || fallbackRecipe;

  // Ingredientes: si no vienen, intentamos generarlos desde description o dejamos fallback
  const ingredientes = useMemo(() => {
    if (
      receta.ingredients &&
      Array.isArray(receta.ingredients) &&
      receta.ingredients.length > 0
    ) {
      return receta.ingredients;
    }
    return fallbackRecipe.ingredients;
  }, [receta, fallbackRecipe.ingredients]);

  const [isFav, setIsFav] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header: logo + flecha atrás */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/image1.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.goBack()}
              accessibilityLabel="Volver"
            >
              <Ionicons name="arrow-back-outline" size={26} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* “Has elegido” + barra tipo búsqueda */}
        <Text style={styles.chosenLabel}>Has elegido:</Text>

        <View style={styles.chosenBar}>
          <Text style={styles.chosenText} numberOfLines={1}>
            {receta.title}
          </Text>

          <Ionicons name="search-outline" size={20} color="#666" />
        </View>

        {/* Título */}
        <Text style={styles.title}>{receta.title}</Text>

        {/* Contenido scroll */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Imagen */}
          <View style={styles.imageWrapper}>
            <Image source={{ uri: receta.image }} style={styles.image} />

            <TouchableOpacity
              style={styles.heartButton}
              onPress={() => setIsFav(!isFav)}
              accessibilityLabel="Marcar como favorito"
            >
              <Ionicons
                name={isFav ? "heart" : "heart-outline"}
                size={22}
                color={isFav ? "#FF4B4B" : "#666"}
              />
            </TouchableOpacity>
          </View>

          {/* Ingredientes */}
          <View style={styles.ingredientsHeader}>
            <Text style={styles.ingredientsTitle}>INGREDIENTES</Text>
            <Ionicons name="restaurant-outline" size={18} color="#8C7A5A" />
          </View>

          <View style={styles.ingredientsBox}>
            {ingredientes.map((item, idx) => (
              <Text key={`${item}-${idx}`} style={styles.ingredientItem}>
                • {item}
              </Text>
            ))}
          </View>

          {/* Un poco de espacio para que no lo tape la barra inferior */}
          <View style={{ height: 90 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FEFAE0",
  },
  container: {
    flex: 1,
    backgroundColor: "#FEFAE0",
    paddingHorizontal: 16,
    paddingTop: 6,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  logo: {
    width: 110,
    height: 45,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },

  chosenLabel: {
    textAlign: "center",
    color: "#8C7A5A",
    marginTop: 8,
    marginBottom: 8,
    fontSize: 13,
  },

  chosenBar: {
    backgroundColor: "#CCD5AE",
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chosenText: {
    color: "#333",
    fontSize: 14,
    maxWidth: "88%",
  },

  title: {
    marginTop: 14,
    marginBottom: 12,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#8C7A5A",
  },

  scrollContent: {
    paddingBottom: 10,
  },

  imageWrapper: {
    position: "relative",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 18,
  },
  image: {
    width: "100%",
    height: 210,
  },
  heartButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 18,
    padding: 8,
  },

  ingredientsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  ingredientsTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#8C7A5A",
    letterSpacing: 0.5,
  },

  ingredientsBox: {
    borderWidth: 1,
    borderColor: "#CCD5AE",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#FEFAE0",
  },
  ingredientItem: {
    color: "#6C757D",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
});
