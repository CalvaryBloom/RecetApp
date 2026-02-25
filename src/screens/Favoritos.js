import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image
} from "react-native";

import styles from "../styles/Favoritos";

import { useNavigation } from "@react-navigation/native";

export default function FavoritosScreen() {

  const navigation=useNavigation();

  const categories = [
    { title: "DESAYUNO", image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png" },
    { title: "ALMUERZO", image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png" },
    { title: "COMIDA", image: "https://cdn-icons-png.flaticon.com/512/3480/3480823.png" },
    { title: "MERIENDA", image: "https://cdn-icons-png.flaticon.com/512/135/135620.png" },
    { title: "CENA", image: "https://cdn-icons-png.flaticon.com/512/2922/2922037.png" }
  ];

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Image
                source={require('../../assets/image1.png')}
                style={styles.logo}
        />

        <Text style={styles.title}>LISTA FAVORITOS</Text>

        <Pressable style={styles.selectButton}>
          <Text style={styles.selectText}>SELECCIONAR</Text>
        </Pressable>

      </View>

      {/* Lista */}
      <ScrollView contentContainerStyle={styles.list}>
        {categories.map((item, index) => (
          <CategoryItem key={index} title={item.title} image={item.image} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

/* Componente reutilizable */
function CategoryItem({ title, image }) {
  const navigation = useNavigation();

  return (
    <Pressable 
    style={styles.card}
    onPress={() =>
      navigation.navigate("RecetaLista", { categoria: title })
    }
    >
      <Text style={styles.cardText}>{title}</Text>
      <Image source={{ uri: image }} style={styles.cardImage} />
    </Pressable>
  );
}

