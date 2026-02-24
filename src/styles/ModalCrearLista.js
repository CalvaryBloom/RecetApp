import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },

  modalBox: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#CCD5AE", // verde del figma
    borderRadius: 22,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },

  modalTitle: {
    position: "absolute",
    top: -26,
    left: 0,
    color: "#C9C9C9",
    fontSize: 14,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#7AA7FF", // borde azul como el foco
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },

  buttonSoft: {
    backgroundColor: "#E9EDC9", // botón claro
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 14,
  },

  buttonText: {
    color: "#333",
    fontSize: 18,
  },
});