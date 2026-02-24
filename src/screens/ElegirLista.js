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

import BarraBusqueda from "../../components/BarraBusqueda";

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

      {/* Barra inferior REAL (la misma que el resto de pantallas) */}
      <BarraBusqueda currentRoute="Home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: "#FBF2D7",
  },
  contenedor: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 80, // espacio para la barra inferior
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  marca: {
    fontSize: 16,
    fontWeight: "700",
    color: "#D29A76",
  },
  botonVolver: {
    padding: 8,
  },
  flecha: {
    fontSize: 22,
    color: "#D29A76",
    fontWeight: "800",
  },

  titulo: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
    color: "#D29A76",
    marginTop: 6,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 12.5,
    color: "#B99277",
    marginBottom: 14,
  },

  lista: {
    gap: 12,
    paddingBottom: 10,
  },

  pildoraBorde: {
    borderWidth: 2.5,
    borderColor: "#D29A76",
    borderRadius: 999,
    padding: 5,
  },
  pildoraBordeSeleccionada: {
    borderColor: "#C7845D",
  },
  pildoraDentro: {
    backgroundColor: "#DDE6C7",
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pildoraDentroSeleccionada: {
    backgroundColor: "#D3DFB8",
  },
  textoPildora: {
    fontSize: 13,
    fontWeight: "800",
    color: "#D29A76",
    letterSpacing: 0.5,
  },
  textoPildoraSeleccionada: {
    color: "#C7845D",
  },

  circuloImagen: {
    width: 34,
    height: 34,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#D29A76",
    backgroundColor: "#FFF",
  },
  circuloImagenSeleccionada: {
    borderColor: "#C7845D",
  },

  zonaBotones: {
    paddingTop: 14,
    gap: 12,
  },
  botonInferior: {
    alignSelf: "center",
    width: "70%",
    backgroundColor: "#DDE6C7",
    paddingVertical: 12,
    borderRadius: 999,
  },
  textoBotonInferior: {
    textAlign: "center",
    fontSize: 12.5,
    fontWeight: "700",
    color: "#8D8D7A",
  },
});