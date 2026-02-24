import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import styles from "../styles/ModalCrearLista";

export default function ModalCrearLista({
  visible,
  onClose,
  onAddImage,
  onSave,
}) {
  const [nombreLista, setNombreLista] = useState("");

  const guardar = () => {
    const name = nombreLista.trim();
    if (!name) return;

    // 👇 “relación” con el padre: le mandamos el nombre creado
    onSave?.(name);

    // reset
    setNombreLista("");
    onClose?.();
  };

  const cerrar = () => {
    setNombreLista("");
    onClose?.();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={cerrar}>
      {/* Overlay (click fuera para cerrar) */}
      <Pressable style={styles.overlay} onPress={cerrar}>
        {/* Caja modal (evita cerrar al tocar dentro) */}
        <Pressable style={styles.modalBox} onPress={() => {}}>
          <Text style={styles.modalTitle}>Modal Crear lista</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre lista"
            placeholderTextColor="#666"
            value={nombreLista}
            onChangeText={setNombreLista}
          />

          <TouchableOpacity style={styles.buttonSoft} onPress={onAddImage}>
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