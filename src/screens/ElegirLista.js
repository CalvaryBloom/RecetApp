import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  Alert,
  SafeAreaView,
  Image,
  ActivityIndicator
} from "react-native";

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
                    styles.pildoraBorde,
                    selected ? styles.pildoraBordeSeleccionada : null,
                    ]}
                >
                    <View
                    style={[
                        styles.pildoraDentro,
                        selected ? styles.pildoraDentroSeleccionada : null,
                    ]}
                    >
                    <Text
                        style={[
                        styles.textoPildora,
                        selected ? styles.textoPildoraSeleccionada : null,
                        ]}
                    >
                        {item.nombre}
                    </Text>

                    <View
                        style={[
                        styles.circuloImagen,
                        selected ? styles.circuloImagenSeleccionada : null,
                        ]}
                    >
                        {item.imagenUrl ? (
                        <Image
                            source={{ uri: item.imagenUrl }}
                            style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 999,
                            }}
                        />
                        ) : null}
                    </View>
                    </View>
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
