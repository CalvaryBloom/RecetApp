import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF9E0',
    padding: 30,
    justifyContent: 'center',
  },
  logo: {
    width: 320,
    height: 120,
    alignSelf: 'center',
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D2A478',
    marginBottom: 5,
    marginTop: 15,
    paddingHorizontal: 4,
  },
  input: {
    backgroundColor: '#FBE6CA',
    padding: 14,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#D2A478',
    color: '#5C4A33',
    fontSize: 15,
  },
  forgotPassword: {
    color: '#D2A478',
    marginTop: 12,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#C8D6B9',
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5C4A33',
  },
  registerButton: {
    marginTop: 20,
  },
  registerText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#D2A478',
    fontWeight: '600',
  },
});