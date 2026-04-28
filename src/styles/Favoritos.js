import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#FEFAE0',
    padding: 30,
    justifyContent: 'center',
  },

  header: {
    padding: 20,
    alignItems: "center"
  },

  logo: {
    width: 320,
    height: 120,
    marginBottom: 30,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#8A6F4D"
  },

  selectButton: {
    borderWidth: 1.5,
    borderColor: "#D18B47",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5
  },

  selectText: {
    color: "#D18B47",
    fontSize: 12,
    fontWeight: "bold"
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 80
  },

  card: {
    backgroundColor: "#D7D4B5",
    borderWidth: 2,
    borderColor: "#D18B47",
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  cardText: {
    fontWeight: "bold",
    color: "#8A6F4D"
  },

  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  }
});