import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StatusBar, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BarraBusqueda from '../components/BarraBusqueda';
import styles from '../styles/PerfilUsuario';

export default function EditarUsuario({ navigation, user, setUser }) {
  const [nombre, setNombre] = useState(user.nombre);
  const [apellidos, setApellidos] = useState(user.apellidos);
  const [correo, setCorreo] = useState(user.correo);
  const [password, setPassword] = useState(user.password);
  const [alergias, setAlergias] = useState(user.alergias);

  const actualizar = () => {
    setUser({
      nombre,
      apellidos,
      correo,
      password,
      alergias,
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5EEDC" />

      {/* Imagen superior */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/image1.png")}
          style={styles.image}
        />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Editar Usuario</Text>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Inputs */}
      <Input label="NOMBRE" value={nombre} onChangeText={setNombre} />
      <Input label="APELLIDOS" value={apellidos} onChangeText={setApellidos} />
      <Input label="CORREO ELECTRÓNICO" value={correo} onChangeText={setCorreo} />
      <Input label="CONTRASEÑA" value={password} secureTextEntry onChangeText={setPassword} />
      <Input label="ALERGIAS O INGREDIENTES" value={alergias} onChangeText={setAlergias} />

      {/* Botón actualizar */}
      <TouchableOpacity style={styles.button} onPress={actualizar}>
        <Text style={styles.buttonText}>Actualizar</Text>
      </TouchableOpacity>
        <BarraBusqueda currentRoute="PerfilUsuario" />
    </View>
  );
}

function Input({ label, value, onChangeText, secureTextEntry }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}