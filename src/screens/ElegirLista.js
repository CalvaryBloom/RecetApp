import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  Alert,
  SafeAreaView,
  Image,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "../styles/RecetaLista";
import BarraBusqueda from "../components/BarraBusqueda";
import ModalCrearLista from "../components/ModalCrearLista";
import { API_BASE_URL } from "../services/service";

const defaultImages = [
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
];

export default function ElegirLista({ route, navigation, token }) {
  const { receta } = route.params;

  const [listas, setListas] = useState([]);
  const [listaSeleccionadaId, setListaSeleccionadaId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchListas();
  }, []);

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

  const pulsarCrearLista = () => setModalVisible(true);

  const onSaveNewList = async ({ nombre, imagen }) => {
    const name = (nombre || "").trim().toUpperCase();
    if (!name) return;

    if (listas.some((l) => l.nombre.toUpperCase() === name)) {
      Alert.alert("Esa lista ya existe");
      return;
    }

    const imagenFinal = imagen || defaultImages[Math.floor(Math.random() * defaultImages.length)];

    try {
      const response = await fetch(`${API_BASE_URL}/listas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: name,
          imagenUrl: imagenFinal
        })
      });

      if (response.ok) {
        const nueva = await response.json();
        setListas((prev) => [...prev, nueva]);
        setListaSeleccionadaId(nueva.id);
      } else {
        const text = await response.text();
        Alert.alert("Error al crear", text);
      }
    } catch (error) {
      Alert.alert("Error de conexión", error.message);
    }
  };

  const pulsarGuardar = async () => {
    if (!listaSeleccionadaId) {
      Alert.alert("Selecciona una lista");
      return;
    }

    if (!receta || !receta.id) {
      Alert.alert("Error", "No llegó el ID de la receta");
      return;
    }

    try {
      setSaving(true);
      const response = await fetch(`${API_BASE_URL}/listas/${listaSeleccionadaId}/recetas/${receta.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        Alert.alert("¡Éxito!", "Receta guardada en la lista", [
            { text: "Ver mis listas", onPress: () => navigation.navigate("Favoritos") }
        ]);
      } else {
        const text = await response.text();
        Alert.alert("Error al guardar", text);
      }
    } catch (error) {
      Alert.alert("Error de conexión", error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.fondo}>
      <View style={styles.contenedor}>
        <View style={styles.header}>
          <Text style={styles.marca}>RecetApp</Text>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.botonVolver}
          >
            <Text style={styles.flecha}>←</Text>
          </Pressable>
        </View>

        <Text style={styles.titulo}>Elegir lista para guardar</Text>
        <Text style={styles.subtitulo}>
          Elige la lista donde quieres guardar la receta:
        </Text>

        {loading ? (
            <ActivityIndicator size="large" color="#D18B47" style={{marginTop: 50}} />
        ) : (
            <FlatList
            data={listas}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.lista}
            ListEmptyComponent={<Text style={{textAlign: "center", marginTop: 20}}>No tienes listas creadas.</Text>}
            renderItem={({ item }) => {
                const selected = item.id === listaSeleccionadaId;

                return (
                <Pressable
                    onPress={() => setListaSeleccionadaId(item.id)}
                    style={[
                      localStyles.card,
                      selected && localStyles.cardSelected,
                    ]}
                >
                    <View style={localStyles.cardContent}>
                        {item.imagenUrl ? (
                            <Image
                                source={{ uri: item.imagenUrl }}
                                style={localStyles.cardImage}
                            />
                        ) : (
                            <View style={[localStyles.cardImage, { backgroundColor: '#D18B47', justifyContent: 'center', alignItems: 'center' }]}>
                                <Ionicons name="list" size={28} color="#FEFAE0" />
                            </View>
                        )}
                        <Text
                            style={[
                                localStyles.cardText,
                                selected && localStyles.cardTextSelected,
                            ]}
                            numberOfLines={2}
                        >
                            {item.nombre}
                        </Text>
                    </View>
                    {selected && (
                        <Ionicons name="checkmark-circle" size={24} color="#8A6F4D" style={{ marginLeft: 10 }} />
                    )}
                </Pressable>
                );
            }}
            />
        )}

        <View style={styles.zonaBotones}>
          <Pressable onPress={pulsarGuardar} style={styles.botonInferior} disabled={saving || loading}>
            <Text style={styles.textoBotonInferior}>{saving ? "Guardando..." : "Guardar"}</Text>
          </Pressable>

          <Pressable onPress={pulsarCrearLista} style={styles.botonInferior}>
            <Text style={styles.textoBotonInferior}>Crear lista</Text>
          </Pressable>
        </View>
      </View>

      <ModalCrearLista
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={onSaveNewList}
      />

      <BarraBusqueda currentRoute="Favoritos" token={token} />
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  card: {
    backgroundColor: "#D7D4B5",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: "#8A6F4D",
    backgroundColor: "#E4E1C1",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  cardText: {
    fontWeight: "bold",
    color: "#8A6F4D",
    fontSize: 16,
    flex: 1,
  },
  cardTextSelected: {
    color: "#5C4A33",
  },
});
