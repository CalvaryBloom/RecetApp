import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import API_URL from "../api/api";

export default function ElegirLista({ route, navigation }) {
  const { receta } = route.params;
  const [listas, setListas] = useState([]);
  const [nombreLista, setNombreLista] = useState("");

  useEffect(() => {
    cargarListas();
  }, []);

  const cargarListas = async () => {
    try {
      const response = await fetch(`${API_URL}/listas/mine`);
      const data = await response.json();
      setListas(data);
    } catch (error) {
      console.log("Error cargando listas:", error);
    }
  };

  const crearLista = async () => {
    if (!nombreLista.trim()) return;

    try {
      await fetch(`${API_URL}/listas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombreLista,
        }),
      });

      setNombreLista("");
      cargarListas();
    } catch (error) {
      console.log("Error creando lista:", error);
    }
  };

  const añadirRecetaALista = async (listaId) => {
    try {
      await fetch(`${API_URL}/listas/${listaId}/recetas/${receta.id}`, {
        method: "POST",
      });

      navigation.navigate("Favoritos");
    } catch (error) {
      console.log("Error añadiendo receta a lista:", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Elige una lista</Text>

      <TextInput
        placeholder="Nueva lista"
        value={nombreLista}
        onChangeText={setNombreLista}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
        }}
      />

      <Button title="Crear lista" onPress={crearLista} />

      <FlatList
        data={listas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => añadirRecetaALista(item.id)}>
            <Text style={{ padding: 15 }}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}