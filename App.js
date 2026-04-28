import React, { useState } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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

import BarraBusqueda from "./src/components/BarraBusqueda";

const Stack = createStackNavigator();

// ... todos tus imports se mantienen igual

export default function App() {
  const navigationRef = useNavigationContainerRef();
  const [currentRoute, setCurrentRoute] = useState("Inicio");

  // --- AQUÍ ESTÁ EL CAMBIO: Declaramos las variables que faltaban ---
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({
    nombre: "Sergio",
    apellidos: "García",
    correo: "sergio@example.com",
    password: "123456",
    alergias: "Ninguna",
  });
  // -----------------------------------------------------------------

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
        <Stack.Screen name="Inicio" component={RecetApp} />

        {/* CORRECCIÓN EN EL LOGIN: Ahora setToken y setUser sí existen arriba */}
        <Stack.Screen name="Login">
          {(props) => (
            <Login {...props} setToken={setToken} setUser={setUser} />
          )}
        </Stack.Screen>

        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen
          name="ContrasenyaOlvidada"
          component={ContrasenyaOlvidada}
        />

        <Stack.Screen name="Home">
          {(props) => <Home {...props} token={token} user={user} />}
        </Stack.Screen>

        <Stack.Screen name="Favoritos" component={Favoritos} />

        <Stack.Screen name="PerfilUsuario">
          {(props) => (
            <PerfilUsuario
              {...props}
              user={user}
              token={token}
              setUser={setUser}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="EditarUsuario">
          {(props) => (
            <EditarUsuario
              {...props}
              user={user}
              setUser={setUser}
              token={token} // ESTE ES EL TOKEN QUE USA EL FETCH
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="RecetaBuscada" component={RecetaBuscada} />
        <Stack.Screen name="ElegirLista" component={ElegirLista} />
        <Stack.Screen name="RecetaLista" component={RecetaLista} />
      </Stack.Navigator>

      {/* Pasamos el token a la barra para que lo mantenga vivo */}
      {mostrarBarra && (
        <BarraBusqueda currentRoute={currentRoute} token={token} user={user} />
      )}
    </NavigationContainer>
  );
}
