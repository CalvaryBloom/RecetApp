import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
} from "react-native";

import styles from "../styles/Favoritos";
import API_URL from "../api/api";

export default function FavoritosScreen({ navigation }) {
  const [listas, setListas] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      cargarListas();
    });

    return unsubscribe;
  }, [navigation]);

  const cargarListas = async () => {
    try {
      const response = await fetch(`${API_URL}/listas/mine`);
      const data = await response.json();
      setListas(data);
    } catch (error) {
      console.log("Error cargando favoritos:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/image1.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>LISTA FAVORITOS</Text>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {listas.map((lista) => (
          <Pressable
            key={lista.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("RecetaLista", { listaId: lista.id })
            }
          >
            <Text style={styles.cardText}>{lista.nombre}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}