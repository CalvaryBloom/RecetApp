import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { API_BASE_URL } from "../services/service";
import BarraBusqueda from "../components/BarraBusqueda";

export default function FavoritosScreen({ navigation, token }) {
  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingListId, setEditingListId] = useState(null);
  const [editingListName, setEditingListName] = useState("");

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

  const abrirModalEditar = (lista) => {
    setEditingListId(lista.id);
    setEditingListName(lista.nombre || "");
    setEditModalVisible(true);
  };

  const cerrarModalEditar = () => {
    setEditModalVisible(false);
    setEditingListId(null);
    setEditingListName("");
  };

  const guardarNombreLista = async () => {
    const nuevoNombre = editingListName.trim().toUpperCase();
    if (!editingListId || !nuevoNombre) {
      Alert.alert("Error", "El nombre no puede estar vacío.");
      return;
    }

    try {
      const endpoints = [
        `${API_BASE_URL}/listas/${editingListId}`,
        `${API_BASE_URL}/listas/update/${editingListId}`
      ];
      let actualizado = false;

      for (const endpoint of endpoints) {
        const response = await fetch(endpoint, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ nombre: nuevoNombre })
        });

        if (response.ok) {
          actualizado = true;
          break;
        }
      }

      if (!actualizado) {
        Alert.alert("No se pudo editar", "Revisa que el backend tenga endpoint de edición de listas.");
        return;
      }

      cerrarModalEditar();
      fetchListas();
    } catch (error) {
      Alert.alert("Error de conexión", error.message);
    }
  };

  const eliminarLista = (lista) => {
    Alert.alert(
      "Eliminar lista",
      `¿Seguro que quieres eliminar "${lista.nombre}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const endpoints = [
                `${API_BASE_URL}/listas/${lista.id}`,
                `${API_BASE_URL}/listas/delete/${lista.id}`
              ];
              let eliminado = false;

              for (const endpoint of endpoints) {
                const response = await fetch(endpoint, {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                });

                if (response.ok) {
                  eliminado = true;
                  break;
                }
              }

              if (!eliminado) {
                Alert.alert("No se pudo eliminar", "Revisa que el backend tenga endpoint de borrado de listas.");
                return;
              }

              fetchListas();
            } catch (error) {
              Alert.alert("Error de conexión", error.message);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <Image
                source={require('../../assets/image1.png')}
                style={styles.logo}
        />

        <Text style={styles.title}>MIS LISTAS</Text>
      </View>

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
                onEdit={() => abrirModalEditar(item)}
                onDelete={() => eliminarLista(item)}
             />
           ))
        )}
      </ScrollView>

      <Modal
        visible={editModalVisible}
        transparent
        animationType="fade"
        onRequestClose={cerrarModalEditar}
      >
        <Pressable style={styles.modalOverlay} onPress={cerrarModalEditar}>
          <Pressable style={styles.modalBox} onPress={() => {}}>
            <Text style={styles.modalTitle}>Editar nombre de lista</Text>
            <TextInput
              value={editingListName}
              onChangeText={setEditingListName}
              placeholder="Nuevo nombre"
              style={styles.modalInput}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalButton} onPress={cerrarModalEditar}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={guardarNombreLista}>
                <Text style={styles.modalButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <BarraBusqueda currentRoute="Favoritos" token={token} />
    </SafeAreaView>
  );
}

function CategoryItem({ title, image, onPress, onEdit, onDelete }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        {image ? (
          <Image source={{ uri: image }} style={styles.cardImage} />
        ) : (
          <View style={[styles.cardImage, { backgroundColor: '#D18B47', justifyContent: 'center', alignItems: 'center' }]}>
            <Ionicons name="list" size={28} color="#FEFAE0" />
          </View>
        )}
        <Text style={styles.cardText} numberOfLines={2}>{title}</Text>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
          <Ionicons name="pencil" size={20} color="#8A6F4D" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.actionButtonDelete}>
          <Ionicons name="trash" size={20} color="#B84545" />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

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

  cardActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: 10,
  },

  actionButton: {
    backgroundColor: "rgba(254, 250, 224, 0.6)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  actionButtonDelete: {
    backgroundColor: "rgba(184, 69, 69, 0.15)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 20
  },

  modalBox: {
    backgroundColor: "#FEFAE0",
    borderRadius: 16,
    padding: 16
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#8A6F4D",
    marginBottom: 10
  },

  modalInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10
  },

  modalButton: {
    backgroundColor: "#CCD5AE",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8
  },

  modalButtonText: {
    fontWeight: "700",
    color: "#5E654B"
  }
});
