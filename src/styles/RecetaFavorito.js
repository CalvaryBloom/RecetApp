import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FEFAE0",
  },

  container: {
    flex: 1,
    backgroundColor: "#FEFAE0",
    paddingHorizontal: 16,
    paddingTop: 6,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  logo: {
    width: 110,
    height: 45,
  },

  iconButton: {
    padding: 8,
    borderRadius: 20,
  },

  chosenLabel: {
    textAlign: "center",
    color: "#8C7A5A",
    marginTop: 8,
    marginBottom: 8,
    fontSize: 13,
  },

  chosenBar: {
    backgroundColor: "#CCD5AE",
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  chosenText: {
    color: "#333",
    fontSize: 14,
    maxWidth: "88%",
  },

  title: {
    marginTop: 14,
    marginBottom: 12,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#8C7A5A",
  },

  scrollContent: {
    paddingBottom: 10,
  },

  imageWrapper: {
    position: "relative",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 18,
  },

  image: {
    width: "100%",
    height: 210,
  },

  heartButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 18,
    padding: 8,
  },

  ingredientsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },

  ingredientsTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#8C7A5A",
    letterSpacing: 0.5,
  },

  ingredientsBox: {
    borderWidth: 1,
    borderColor: "#CCD5AE",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#FEFAE0",
  },

  ingredientItem: {
    color: "#6C757D",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
});