import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/RecetaFavorito";

export default function RecetaFavorita({ route, navigation }) {
  const recipe = route?.params?.recipe;

  const fallbackRecipe = useMemo(
    () => ({
      title: "Receta favorita",
      image:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=60",
      ingredients: ["Ingrediente 1", "Ingrediente 2", "Ingrediente 3"],
    }),
    [],
  );

  const receta = recipe || fallbackRecipe;

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

  const [isFav, setIsFav] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
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

        {/* Has elegido */}
        <Text style={styles.chosenLabel}>Has elegido:</Text>

        <View style={styles.chosenBar}>
          <Text style={styles.chosenText} numberOfLines={1}>
            {receta.title}
          </Text>
          <Ionicons name="search-outline" size={20} color="#666" />
        </View>

        {/* Título */}
        <Text style={styles.title}>{receta.title}</Text>

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
            <Ionicons
              name="restaurant-outline"
              size={18}
              color="#8C7A5A"
            />
          </View>

          <View style={styles.ingredientsBox}>
            {ingredientes.map((item, idx) => (
              <Text key={`${item}-${idx}`} style={styles.ingredientItem}>
                • {item}
              </Text>
            ))}
          </View>

          <View style={{ height: 90 }} />
          <BarraBusqueda currentRoute="Favoritos" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}