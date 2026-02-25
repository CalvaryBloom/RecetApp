import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
  SafeAreaView,
} from "react-native";

import styles from "../styles/RecetaLista";
import BarraBusqueda from "../components/BarraBusqueda";


export default function RecetaLista() {
  const listas = [
    { id: "1", nombre: "DESAYUNO" },
    { id: "2", nombre: "ALMUERZO" },
    { id: "3", nombre: "COMIDA" },
    { id: "4", nombre: "MERIENDA" },
    { id: "5", nombre: "CENA" },
  ];

  const [listaSeleccionadaId, setListaSeleccionadaId] = useState("");

  function pulsarGuardar() {
    if (listaSeleccionadaId === "") {
      Alert.alert("Selecciona una lista");
      return;
    }

    Alert.alert("Guardar", "Más adelante se conectará al backend");
  }

  function pulsarCrearLista() {
    Alert.alert("Crear lista", "Más adelante se conectará al backend");
  }

  function pulsarVolver() {
    Alert.alert("Volver", "Aquí irá navigation.goBack()");
  }

  return (
    <SafeAreaView style={styles.fondo}>
      <View style={styles.contenedor}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.marca}>RecetApp</Text>

          <Pressable onPress={pulsarVolver} style={styles.botonVolver}>
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
            const estaSeleccionada = item.id === listaSeleccionadaId;

            return (
              <Pressable
                onPress={() => setListaSeleccionadaId(item.id)}
                style={[
                  styles.pildoraBorde,
                  estaSeleccionada ? styles.pildoraBordeSeleccionada : null,
                ]}
              >
                <View
                  style={[
                    styles.pildoraDentro,
                    estaSeleccionada ? styles.pildoraDentroSeleccionada : null,
                  ]}
                >
                  <Text
                    style={[
                      styles.textoPildora,
                      estaSeleccionada ? styles.textoPildoraSeleccionada : null,
                    ]}
                  >
                    {item.nombre}
                  </Text>

                  <View
                    style={[
                      styles.circuloImagen,
                      estaSeleccionada
                        ? styles.circuloImagenSeleccionada
                        : null,
                    ]}
                  />
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
      <BarraBusqueda currentRoute="Favoritos" />
    </SafeAreaView>
  );
}
