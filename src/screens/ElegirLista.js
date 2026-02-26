import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  Alert,
  SafeAreaView,
  Image,
} from "react-native";

import styles from "../styles/RecetaLista";
import BarraBusqueda from "../components/BarraBusqueda";
import ModalCrearLista from "../components/ModalCrearLista";

export default function ElegirLista({ route, navigation }) {
  const receta = route?.params?.receta;

  const listasIniciales = useMemo(
    () => [
      { id: "1", nombre: "DESAYUNO", imagen: null },
      { id: "2", nombre: "ALMUERZO", imagen: null },
      { id: "3", nombre: "COMIDA", imagen: null },
      { id: "4", nombre: "MERIENDA", imagen: null },
      { id: "5", nombre: "CENA", imagen: null },
    ],
    [],
  );

  const [listas, setListas] = useState(listasIniciales);
  const [listaSeleccionadaId, setListaSeleccionadaId] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const pulsarCrearLista = () => setModalVisible(true);

  const onSaveNewList = ({ nombre, imagen }) => {
    const name = (nombre || "").trim().toUpperCase();
    if (!name) return;

    if (listas.some((l) => l.nombre === name)) {
      Alert.alert("Esa lista ya existe");
      return;
    }

    const nueva = {
      id: String(Date.now()),
      nombre: name,
      imagen: imagen || null,
    };
    setListas((prev) => [...prev, nueva]);
    setListaSeleccionadaId(nueva.id);
  };

  const pulsarGuardar = () => {
    if (!listaSeleccionadaId) {
      Alert.alert("Selecciona una lista");
      return;
    }

    if (!receta) {
      Alert.alert("Error", "No llegó la receta");
      return;
    }

    navigation.navigate("RecetaFavorita", { recipe: receta });
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

        <FlatList
          data={listas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.lista}
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
                    {item.imagen ? (
                      <Image
                        source={{ uri: item.imagen }}
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

        <View style={styles.zonaBotones}>
          <Pressable onPress={pulsarGuardar} style={styles.botonInferior}>
            <Text style={styles.textoBotonInferior}>Guardar</Text>
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

      <BarraBusqueda currentRoute="Favoritos" />
    </SafeAreaView>
  );
}
