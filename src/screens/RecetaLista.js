import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable
} from "react-native";

export default function DesayunoScreen() {

  const meals = [
    {
      title: "TOSTADAS CON TOMATE Y JAMÓN",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc4XY7qI2l_ohuHrK7HTc8DQTJ5eLYyAeb1w&s"
    },
    {
      title: "TOSTADAS AGUACATE",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5AcZXS09njuYqfHRcQqRTytiCH5e1Xm09lA&s"
    }
  ];

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Image
            source={require('../../assets/image1.png')}
            style={styles.logo}
        />
        <Pressable>
          <Text style={styles.back}>←</Text>
        </Pressable>
      </View>

      {/* Title */}
      <Text style={styles.categoryTitle}>DESAYUNO</Text>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scroll}>
        {meals.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.mealTitle}>{item.title}</Text>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        ))}
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
    color: "#D18B47",
    fontWeight: "bold"
  },

  back: {
    fontSize: 20,
    color: "#8A6F4D"
  },

  categoryTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#8A6F4D",
    marginBottom: 15
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
    marginBottom: 10
  },

  image: {
    width: 300,
    height: 180,
    alignSelf: "center",
    borderRadius: 8
  }
});
