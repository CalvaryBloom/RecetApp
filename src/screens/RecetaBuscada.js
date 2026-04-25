import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import API_URL from "../api/api";

export default function RecetaBuscada({ route, navigation }) {
  const { recipe } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkFavorite();
  }, []);

  const checkFavorite = async () => {
    try {
      const response = await fetch(
        `${API_URL}/favoritos/isFavorite/${recipe.id}`
      );
      const data = await response.json();
      setIsFavorite(data);
    } catch (error) {
      console.log("Error comprobando favorito:", error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const response = await fetch(
        `${API_URL}/favoritos/toggle/${recipe.id}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      setIsFavorite(data.favorite);

      if (data.favorite) {
        navigation.navigate("ElegirLista", { receta: recipe });
      }
    } catch (error) {
      console.log("Error cambiando favorito:", error);
    }
  };

  return (
    <View>
      <Image source={{ uri: recipe.image }} style={{ width: "100%", height: 250 }} />

      <Text>{recipe.title}</Text>
      <Text>{recipe.description}</Text>

      <TouchableOpacity onPress={toggleFavorite}>
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={32}
          color="red"
        />
      </TouchableOpacity>
    </View>
  );
}