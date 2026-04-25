import React, { useState } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Pantallas
import RecetApp from "./src/screens/RecetApp";
import Login from "./src/screens/Login";
import Registro from "./src/screens/Registro";
import ContrasenyaOlvidada from "./src/screens/ContrasenyaOlvidada";
import Home from "./src/screens/Home";
import RecetaBuscada from "./src/screens/RecetaBuscada";
import ElegirLista from "./src/screens/ElegirLista";
import PerfilUsuario from "./src/screens/PerfilUsuario";
import EditarUsuario from "./src/screens/EditarUsuario";
import Favoritos from "./src/screens/Favoritos";
import RecetaLista from "./src/screens/RecetaLista";

// Componentes
import BarraBusqueda from "./src/components/BarraBusqueda";

const Stack = createStackNavigator();

export default function App() {
  const navigationRef = useNavigationContainerRef();
  const [currentRoute, setCurrentRoute] = useState("Inicio");

  // Estado global del usuario (luego esto vendrá del backend)
  const [user, setUser] = useState({
    nombre: "Sergio",
    apellidos: "García",
    correo: "sergio@example.com",
    password: "123456",
    alergias: "Ninguna",
  });

  // Pantallas donde queremos mostrar la barra inferior
  const rutasConBarra = ["Home", "Favoritos", "PerfilUsuario"];
  const mostrarBarra = rutasConBarra.includes(currentRoute);

  const actualizarRutaActual = () => {
    const ruta = navigationRef.getCurrentRoute()?.name;
    if (ruta) {
      setCurrentRoute(ruta);
    }
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={actualizarRutaActual}
      onStateChange={actualizarRutaActual}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* AUTH */}
        <Stack.Screen name="Inicio" component={RecetApp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen
          name="ContrasenyaOlvidada"
          component={ContrasenyaOlvidada}
        />

        {/* APP */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Favoritos" component={Favoritos} />

        <Stack.Screen name="RecetaBuscada" component={RecetaBuscada} />
        <Stack.Screen name="ElegirLista" component={ElegirLista} />
        <Stack.Screen name="RecetaLista" component={RecetaLista} />

        {/* PERFIL */}
        <Stack.Screen name="PerfilUsuario">
          {(props) => <PerfilUsuario {...props} user={user} />}
        </Stack.Screen>

        <Stack.Screen name="EditarUsuario">
          {(props) => (
            <EditarUsuario {...props} user={user} setUser={setUser} />
          )}
        </Stack.Screen>
      </Stack.Navigator>

      {/* Barra inferior global */}
      {mostrarBarra && <BarraBusqueda currentRoute={currentRoute} />}
    </NavigationContainer>
  );
}