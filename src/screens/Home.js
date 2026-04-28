import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/Home";

// Cambiar la IP
const API_URL = "http://192.168.1.140:8080/api/recetas";

export default function Home({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [availableFilters, setAvailableFilters] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos al iniciar
  useEffect(() => {
    fetchRecetas();
  }, []);

  const fetchRecetas = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/getAll`);
      const data = await response.json();

      setRecipes(data);

      const tagsUnicos = new Set();
      data.forEach((receta) => {
        if (receta.tags && Array.isArray(receta.tags)) {
          receta.tags.forEach((tag) => tagsUnicos.add(tag));
        }
      });

      setAvailableFilters(Array.from(tagsUnicos));
    } catch (error) {
      console.error("Error conectando con el backend:", error);
    } finally {
      setLoading(false);
    }
  };

  const ejecutarBusqueda = async (texto, filtros) => {
    setLoading(true);
    try {
      const tagsParam = filtros.join(",");

      const url = `${API_URL}/searchAdvanced?titulo=${texto}&tag=${tagsParam}`;
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error en búsqueda avanzada:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFilter = (filter) => {
    let nuevosFiltros;
    if (activeFilters.includes(filter)) {
      nuevosFiltros = activeFilters.filter((f) => f !== filter);
    } else {
      nuevosFiltros = [...activeFilters, filter];
    }
    setActiveFilters(nuevosFiltros);
    ejecutarBusqueda(searchText, nuevosFiltros);
  };

  const renderRecipeCard = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate("RecetaBuscada", { recipe: item })}
    >
      <View style={styles.card}>
        {/* Usamos imagenUrl que es como viene en el RecetaResponse de Java */}
        <Image source={{ uri: item.imagenUrl }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={24} color="#FF4B4B" />
            </TouchableOpacity>
          </View>
          <Text style={styles.cardDescription} numberOfLines={2}>
            {item.descripcion}
          </Text>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.timeText}>
              {/* Tiempo total = prep + coccion */}
              {(item.tiempoPreparacionMin || 0) +
                (item.tiempoCoccionMin || 0)}{" "}
              min
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/image1.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={() => navigation.replace("Inicio")}>
            <Ionicons name="log-out-outline" size={28} color="#333" />
          </TouchableOpacity>
        </View>

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
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                ejecutarBusqueda(text, activeFilters);
              }}
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

        {showFilters && (
          <View style={styles.filtersWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersScroll}
            >
              {availableFilters.map((filter) => (
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

        <Text style={styles.sectionTitle}>Recetas Disponibles</Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#CCD5AE"
            style={{ marginTop: 20 }}
          />
        ) : (
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderRecipeCard}
            contentContainerStyle={[
              styles.listContainer,
              { paddingBottom: 110 },
            ]}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                No se encontraron recetas reales.
              </Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}
