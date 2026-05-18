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
    color: "#8A6F4D",
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
    color: "#5C4A33",
    fontSize: 14,
    fontWeight: "bold",
    maxWidth: "88%",
  },

  title: {
    marginTop: 14,
    marginBottom: 12,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#8A6F4D",
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
    color: "#8A6F4D",
    letterSpacing: 0.5,
  },

  ingredientsBox: {
    borderWidth: 1.5,
    borderColor: "#D7D4B5",
    borderRadius: 15,
    padding: 12,
    backgroundColor: "#FFFFFF",
  },

  ingredientItem: {
    color: "#5C4A33",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
});