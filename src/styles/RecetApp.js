import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAE0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },

  logo: {
    width: 320,
    height: 120,
    marginBottom: 20,
  },

  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
    marginBottom: 40,
  },

  button: {
    backgroundColor: '#CCD5AE',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 15,
    width: '70%',
  },

  buttonText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});