import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
} from "react-native";


export default function RecetaLista({ route, navigation }) {
  const categoria = route?.params?.categoria;

  const meals = {
    DESAYUNO: [
      {
        title: "TOSTADAS CON TOMATE Y JAMÓN",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc4XY7qI2l_ohuHrK7HTc8DQTJ5eLYyAeb1w&s",
        description:
          "Tostadas crujientes con tomate natural y jamón serrano.",
        ingredients: [
          "Pan",
          "Tomate",
          "Jamón serrano",
          "Aceite de oliva",
          "Sal"
        ]
      },
      {
        title: "TOSTADAS DE AGUACATE",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5AcZXS09njuYqfHRcQqRTytiCH5e1Xm09lA&s",
        description:
          "Tostadas saludables con aguacate cremoso.",
        ingredients: [
          "Pan",
          "Aguacate",
          "Limón",
          "Aceite de oliva",
          "Sal",
          "Pimienta"
        ]
      }
    ],

    CENA: [
      {
        title: "ENSALADA LIGERA",
        image:
          "https://www.novachef.es/media/images/ensalada-atun-lechuga.png",
        description: "Ensalada fresca perfecta para la noche.",
        ingredients: ["Lechuga", "Tomate", "Atún", "Aceite"]
      }
    ]
  };

  const recetas = meals[categoria] || [];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/image1.png")}
          style={styles.logo}
        />
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </Pressable>
      </View>
      <View>
        <Text style={styles.title}>{categoria}</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scroll}>
        {recetas.length === 0 ? (
          <Text style={styles.noRecipes}>
            No hay recetas para esta categoría
          </Text>
        ) : (
          recetas.map((recipe, index) => (
            <View key={index} style={styles.card}>

              <Text style={styles.title}>{recipe.title}</Text>

              <Image source={{ uri: recipe.image }} style={styles.image} />

              <Text style={styles.description}>
                {recipe.description}
              </Text>

              <Text style={styles.ingredientsTitle}>Ingredientes:</Text>

              {recipe.ingredients.map((ingredient, i) => (
                <Text key={i} style={styles.ingredientItem}>
                  • {ingredient}
                </Text>
              ))}

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

  back: {
    padding: 8,
    borderRadius: 20,
  },

  noRecipes: {
    textAlign: "center",
    marginTop: 40,
    color: "#8A6F4D"
  },

  card: {
    marginBottom: 30,
    backgroundColor: "#D7D4B5",
    padding: 15,
    borderRadius: 15
  },

  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#8A6F4D",
    marginBottom: 10
  },

  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10
  },

  description: {
    marginBottom: 10,
    color: "#6B5E4A"
  },

  ingredientsTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#8A6F4D"
  },

  ingredientItem: {
    color: "#6B5E4A"
  }
});
