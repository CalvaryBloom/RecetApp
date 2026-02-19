import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import PerfilUsuario from "./src/screens/PerfilUsuario";
import EditarUsuario from "./src/screens/EditarUsuario";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function UsuarioStack() {
  const [user, setUser] = useState({
    nombre: "Pedro",
    apellidos: "Martínez Mañas",
    correo: "pedromama@gmail.com",
    password: "************",
    alergias: "melocotón, gluten",
  });

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="PerfilUsuario"
        children={(props) => (
          <PerfilUsuario {...props} user={user} setUser={setUser} />
        )}
      />

      <Stack.Screen
        name="EditarUsuario"
        children={(props) => (
          <EditarUsuario {...props} user={user} setUser={setUser} />
        )}
      />
    </Stack.Navigator>
  );
}

function Home() {
  return null;
}

function Favoritos() {
  return null;
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarStyle: {
      height: 60,
      backgroundColor: "#CCD5AE", // Fondo verde
      borderTopWidth: 0,
    },
    tabBarActiveTintColor: "red",   // Icono seleccionado en rojo
    tabBarInactiveTintColor: "white", // Iconos no seleccionados en blanco

    tabBarIcon: ({ color, size }) => {
      let iconName;

      if (route.name === "Usuario") iconName = "person-outline";
      if (route.name === "Home") iconName = "home-outline";
      if (route.name === "Favoritos") iconName = "heart-outline";

      return <Ionicons name={iconName} size={24} color={color} />;
    },
  })}
>
        <Tab.Screen
          name="Usuario"
          component={UsuarioStack}
          options={{
            tabBarIcon: () => <Ionicons name="person-outline"  size={24} />,
          }}
        />

        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: () => <Ionicons name="home-outline" size={24} />,
          }}
        />

        <Tab.Screen
          name="Favoritos"
          component={Favoritos}
          options={{
            tabBarIcon: () => <Ionicons name="heart-outline" size={24} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}