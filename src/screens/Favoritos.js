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

export default function FavoritosScreen() {
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
  return (
    <Pressable style={styles.card}>
      <Text style={styles.cardText}>{title}</Text>
      <Image source={{ uri: image }} style={styles.cardImage} />
    </Pressable>
  );
}

/* Estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAE0',
    padding: 30,
    justifyContent: 'center',
  },

  header: {
    padding: 20,
    alignItems: "center"
  },

  logo: {
    width: 320,
    height: 120,
    marginBottom: 30,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#8A6F4D"
  },

  selectButton: {
    borderWidth: 1.5,
    borderColor: "#D18B47",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5
  },

  selectText: {
    color: "#D18B47",
    fontSize: 12,
    fontWeight: "bold"
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 80
  },

  card: {
    backgroundColor: "#D7D4B5",
    borderWidth: 2,
    borderColor: "#D18B47",
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  cardText: {
    fontWeight: "bold",
    color: "#8A6F4D"
  },

  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  }
});
