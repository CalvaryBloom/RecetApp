import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator
} from "react-native";
import { API_BASE_URL } from "../services/service";

export default function RecetaLista({ route, navigation, token }) {
  const { listaId, listaNombre } = route.params || {};
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (listaId) {
      fetchRecetas();
    }
  }, [listaId, token]);

  const fetchRecetas = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/listas/${listaId}/recetas`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setRecetas(data);
      } else {
        console.error("Error fetching recetas", response.status);
      }
    } catch (error) {
      console.error("Error de red", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Image
            source={require('../../assets/image1.png')}
            style={styles.logo}
        />
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </Pressable>
      </View>

      {/* Title */}
      <Text style={styles.categoryTitle}>{listaNombre || "LISTA"}</Text>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scroll}>
        {loading ? (
            <ActivityIndicator size="large" color="#D18B47" style={{marginTop: 50}} />
        ) : recetas.length === 0 ? (
            <Text style={{textAlign: "center", marginTop: 20}}>No hay recetas en esta lista.</Text>
        ) : (
            recetas.map((item, index) => (
            <View key={String(item.recetaId || index)} style={styles.card}>
                <Text style={styles.mealTitle}>{item.titulo}</Text>
                {item.imagenUrl ? (
                    <Image source={{ uri: item.imagenUrl }} style={styles.image} />
                ) : (
                    <View style={[styles.image, { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }]}>
                        <Text>Sin imagen</Text>
                    </View>
                )}
            </View>
            ))
        )}
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9DFC7"
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10
  },

  logo: {
    width: 150,
    height: 60,
    resizeMode: 'contain'
  },

  back: {
    fontSize: 25,
    color: "#8A6F4D",
    paddingHorizontal: 10
  },

  categoryTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#8A6F4D",
    marginBottom: 15,
    fontSize: 18,
    textTransform: 'uppercase'
  },

  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 80
  },

  card: {
    marginBottom: 25
  },

  mealTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#B79B6C",
    marginBottom: 10,
    textTransform: 'uppercase'
  },

  image: {
    width: 300,
    height: 180,
    alignSelf: "center",
    borderRadius: 8
  }
});
