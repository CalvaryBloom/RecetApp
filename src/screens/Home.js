import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/Home";

// Datos de prueba (mock) ampliados con categorías para los filtros
const RECIPES = [
  {
    id: "1",
    title: "Hamburguesa",
    description:
      "Deliciosa hamburguesa casera con carne, queso, lechuga y tomate.",
    time: "30 min",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60",
    categories: ["Comidas", "Cenas"],
  },
  {
    id: "2",
    title: "Pasta",
    description: "Pasta clásica con salsa de tomate casera y albahaca fresca.",
    time: "45 min",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=500&q=60",
    categories: ["Comidas", "Vegetariano"],
  },
  {
    id: "3",
    title: "Pizza Margarita",
    description: "Pizza tradicional con mozzarella fundida y salsa de tomate.",
    time: "60 min",
    image:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=500&q=60",
    categories: ["Cenas", "Vegetariano"],
  },
  {
    id: "4",
    title: "Ensalada Fresca",
    description: "Ensalada saludable con aguacate, tomate, pepino y vinagreta.",
    time: "15 min",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60",
    categories: ["Comidas", "Vegetariano", "Vegano"],
  },
  {
    id: "5",
    title: "Tacos al Pastor",
    description: "Auténticos tacos mexicanos con carne adobada y piña.",
    time: "40 min",
    image:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=500&q=60",
    categories: ["Comidas", "Cenas"],
  },
];

const AVAILABLE_FILTERS = [
  "Vegetariano",
  "Vegano",
  "Desayunos",
  "Comidas",
  "Cenas",
  "Postres",
];

export default function Home({ navigation }) {
  // Estados para la búsqueda y filtros
  const [searchText, setSearchText] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  // Lógica para aplicar los filtros seleccionados
  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  // Filtrado cruzado: Búsqueda de texto + Filtros activos
  const filteredRecipes = RECIPES.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesFilters =
      activeFilters.length === 0 ||
      activeFilters.some((filter) => recipe.categories.includes(filter));
    return matchesSearch && matchesFilters;
  });

  // Función que renderiza cada tarjeta de receta
  const renderRecipeCard = ({ item }) => (
    //TouchableOpacity neus, para que al seleccionar salga de descrp de la receta
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate("RecetaBuscada", { recipe: item })}
    >
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={24} color="#FF4B4B" />
            </TouchableOpacity>
          </View>
          <Text style={styles.cardDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Cabecera personalizada con el logo */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/image1.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.replace("Inicio")}
            >
              <Ionicons name="log-out-outline" size={28} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Barra de Búsqueda y Botón de Filtro*/}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={20}
              color="#888"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="¿Qué te apetece comer hoy?"
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.filterButton,
              showFilters && styles.filterButtonActive,
            ]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons
              name="options-outline"
              size={24}
              color={showFilters ? "#FFF" : "#333"}
            />
          </TouchableOpacity>
        </View>

        {/* Sección de Filtros Desplegable */}
        {showFilters && (
          <View style={styles.filtersWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersScroll}
            >
              {AVAILABLE_FILTERS.map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterChip,
                    activeFilters.includes(filter) && styles.filterChipActive,
                  ]}
                  onPress={() => toggleFilter(filter)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      activeFilters.includes(filter) &&
                        styles.filterChipTextActive,
                    ]}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Título de la sección */}
        <Text style={styles.sectionTitle}>Recetas Principales</Text>

        {/* Lista de Platos (Scrollable) */}
        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.id}
          renderItem={renderRecipeCard}
          contentContainerStyle={[styles.listContainer, { paddingBottom: 110 }]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No se encontraron recetas con esos filtros.
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}
