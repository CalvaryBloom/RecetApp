import { StyleSheet } from 'react-native';

export default StyleSheet.create({
     fondo: {
    flex: 1,
    backgroundColor: "#FBF2D7",
  },
  contenedor: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 80, // espacio para la barra inferior
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
    color: "#D29A76",
  },
  botonVolver: {
    padding: 8,
  },
  flecha: {
    fontSize: 22,
    color: "#D29A76",
    fontWeight: "800",
  },

  titulo: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
    color: "#D29A76",
    marginTop: 6,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 12.5,
    color: "#B99277",
    marginBottom: 14,
  },

  lista: {
    gap: 12,
    paddingBottom: 10,
  },

  pildoraBorde: {
    borderWidth: 2.5,
    borderColor: "#D29A76",
    borderRadius: 999,
    padding: 5,
  },
  pildoraBordeSeleccionada: {
    borderColor: "#C7845D",
  },
  pildoraDentro: {
    backgroundColor: "#DDE6C7",
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pildoraDentroSeleccionada: {
    backgroundColor: "#D3DFB8",
  },
  textoPildora: {
    fontSize: 13,
    fontWeight: "800",
    color: "#D29A76",
    letterSpacing: 0.5,
  },
  textoPildoraSeleccionada: {
    color: "#C7845D",
  },

  circuloImagen: {
    width: 34,
    height: 34,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#D29A76",
    backgroundColor: "#FFF",
  },
  circuloImagenSeleccionada: {
    borderColor: "#C7845D",
  },

  zonaBotones: {
    paddingTop: 14,
    gap: 12,
  },
  botonInferior: {
    alignSelf: "center",
    width: "70%",
    backgroundColor: "#DDE6C7",
    paddingVertical: 12,
    borderRadius: 999,
  },
  textoBotonInferior: {
    textAlign: "center",
    fontSize: 12.5,
    fontWeight: "700",
    color: "#8D8D7A",
  },
});
