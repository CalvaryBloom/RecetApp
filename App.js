import React, { useState } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login";
import Registro from "./src/screens/Registro";
import ContrasenyaOlvidada from "./src/screens/ContrasenyaOlvidada";
import Home from "./src/screens/Home";
import Inicio from "./src/screens/Inicio";
import Favoritos from "./src/screens/Favoritos";
import PerfilUsuario from "./src/screens/PerfilUsuario";
import EditarUsuario from "./src/screens/EditarUsuario";

import RecetaBuscada from "./src/screens/RecetaBuscada";

import BarraBusqueda from "./src/components/BarraBusqueda";

const Stack = createStackNavigator();

export default function App() {
  const navigationRef = useNavigationContainerRef();
  const [currentRoute, setCurrentRoute] = useState("Inicio");
  // Estado global del usuario
  const [user, setUser] = useState({
    nombre: "Sergio",
    apellidos: "García",
    correo: "sergio@example.com",
    password: "123456",
    alergias: "Ninguna",
  });

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
        {/* IMPORTANTE
          PARA QUE FUNCIONE CORRECTAMENTE LA NAVEGACION TIENE  QUE ESTAR AQUI TODAS LAS PANTALLAS
        */}
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen
          name="ContrasenyaOlvidada"
          component={ContrasenyaOlvidada}
        />

        {/* OTRAS PANTALLAS */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Favoritos" component={Favoritos} />
        {/* Pasamos user y setUser */}
        <Stack.Screen name="PerfilUsuario">
          {(props) => <PerfilUsuario {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="EditarUsuario">
          {(props) => (
            <EditarUsuario {...props} user={user} setUser={setUser} />
          )}
        </Stack.Screen>
        <Stack.Screen name="RecetaBuscada" component={RecetaBuscada} />
        <Stack.Screen name="RecetaLista" component={RecetaBuscada} />
      </Stack.Navigator>

      {mostrarBarra && <BarraBusqueda currentRoute={currentRoute} />}
    </NavigationContainer>
  );
}
