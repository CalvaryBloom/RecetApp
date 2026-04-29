import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator
} from "react-native";
import { API_BASE_URL } from "../services/service";
import BarraBusqueda from "../components/BarraBusqueda";

export default function FavoritosScreen({ navigation, token }) {
  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchListas();
    });
    fetchListas();
    return unsubscribe;
  }, [navigation, token]);

  const fetchListas = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/listas/mine`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setListas(data);
      } else {
        console.error("Error fetching listas", response.status);
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

        <Text style={styles.title}>MIS LISTAS</Text>

        <Pressable style={styles.selectButton}>
          <Text style={styles.selectText}>SELECCIONAR</Text>
        </Pressable>

      </View>

      {/* Lista */}
      <ScrollView contentContainerStyle={styles.list}>
        {loading ? (
           <ActivityIndicator size="large" color="#D18B47" style={{marginTop: 50}} />
        ) : listas.length === 0 ? (
           <Text style={{textAlign: 'center', marginTop: 30}}>No tienes listas creadas.</Text>
        ) : (
           listas.map((item, index) => (
             <CategoryItem 
                key={String(item.id)} 
                title={item.nombre} 
                image={item.imagenUrl} 
                onPress={() => navigation.navigate("RecetaLista", { listaId: item.id, listaNombre: item.nombre })}
             />
           ))
        )}
      </ScrollView>

      <BarraBusqueda currentRoute="Favoritos" token={token} />
    </SafeAreaView>
  );
}

/* Componente reutilizable */
function CategoryItem({ title, image, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.cardText}>{title}</Text>
      {image ? (
        <Image source={{ uri: image }} style={styles.cardImage} />
      ) : (
        <View style={styles.cardImage} /> 
      )}
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
