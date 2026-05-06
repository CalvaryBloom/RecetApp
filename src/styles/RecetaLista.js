import { StyleSheet } from "react-native";

export default StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: "#FEFAE0",
  },
  contenedor: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 80,
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
    color: "#8A6F4D",
  },
  botonVolver: {
    padding: 8,
  },
  flecha: {
    fontSize: 22,
    color: "#8A6F4D",
    fontWeight: "800",
  },

  titulo: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
    color: "#8A6F4D",
    marginTop: 6,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 12.5,
    color: "#5C4A33",
    marginBottom: 14,
  },

  lista: {
    gap: 12,
    paddingBottom: 10,
  },

  pildoraBorde: {
    borderWidth: 2.5,
    borderColor: "#D7D4B5",
    borderRadius: 999,
    padding: 5,
  },
  pildoraBordeSeleccionada: {
    borderColor: "#8A6F4D",
  },
  pildoraDentro: {
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pildoraDentroSeleccionada: {
    backgroundColor: "#CCD5AE",
  },
  textoPildora: {
    fontSize: 13,
    fontWeight: "800",
    color: "#8A6F4D",
    letterSpacing: 0.5,
  },
  textoPildoraSeleccionada: {
    color: "#5C4A33",
  },

  circuloImagen: {
    width: 34,
    height: 34,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#D7D4B5",
    backgroundColor: "#FFF",
  },
  circuloImagenSeleccionada: {
    borderColor: "#8A6F4D",
  },

  zonaBotones: {
    paddingTop: 14,
    gap: 12,
  },
  botonInferior: {
    alignSelf: "center",
    width: "70%",
    backgroundColor: "#CCD5AE",
    paddingVertical: 12,
    borderRadius: 999,
  },
  textoBotonInferior: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    color: "#5C4A33",
  },
});
