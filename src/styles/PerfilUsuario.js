import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    // CAMBIA 'center' por 'flex-start' para que el contenido suba
    justifyContent: 'flex-start', 
    alignItems: 'center', // Mantiene los elementos centrados horizontalmente
    backgroundColor: "#F5EEDC",
    paddingTop: 100, // Ajusta este número según prefieras (subir o bajar todo el bloque)
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 50,
    borderRadius: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  field: {
    marginBottom: 15,
  },
  label: {
    fontSize: 13,
    color: "#555",
  },
  value: {
    fontSize: 16,
    paddingVertical: 8,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#CCD5AE",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 17,
    fontWeight: "bold",
  },
});
