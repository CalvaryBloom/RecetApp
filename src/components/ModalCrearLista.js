import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "../styles/ModalCrearLista";

export default function ModalCrearLista({ visible, onClose, onSave }) {
  const [nombreLista, setNombreLista] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const cerrar = () => {
    setNombreLista("");
    setImageUri(null);
    onClose?.();
  };

  const elegirImagen = async () => {
    // Pedir permiso
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Activa permisos de galería.");
      return;
    }

    // Abrir galería
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const guardar = () => {
    const nombre = nombreLista.trim();
    if (!nombre) {
      Alert.alert("Error", "Escribe un nombre para la lista");
      return;
    }

    //  Esto es lo que hace que “se guarde” en ElegirLista
    onSave?.({ nombre, imagen: imageUri });

    cerrar();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={cerrar}>
      <Pressable style={styles.overlay} onPress={cerrar}>
        <Pressable style={styles.modalBox} onPress={() => {}}>
          <TextInput
            style={styles.input}
            placeholder="Nombre lista"
            value={nombreLista}
            onChangeText={setNombreLista}
          />

          {/* Preview opcional */}
          {imageUri ? (
            <View style={{ alignItems: "center", marginBottom: 12 }}>
              <Image
                source={{ uri: imageUri }}
                style={{ width: 90, height: 90, borderRadius: 12 }}
              />
            </View>
          ) : null}

          <TouchableOpacity style={styles.buttonSoft} onPress={elegirImagen}>
            <Text style={styles.buttonText}>Añadir imagen</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSoft} onPress={guardar}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}