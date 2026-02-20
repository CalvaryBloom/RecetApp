import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  Platform, 
  StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Datos de prueba (mock) para mostrar en la lista
const RECIPES = [
  {
    id: '1',
    title: 'Hamburguesa',
    description: 'Deliciosa hamburguesa casera con carne, queso, lechuga y tomate.',
    time: '30 min',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '2',
    title: 'Pasta',
    description: 'Pasta clásica con salsa de tomate casera y albahaca fresca.',
    time: '45 min',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '3',
    title: 'Pizza Margarita',
    description: 'Pizza tradicional con mozzarella fundida y salsa de tomate.',
    time: '60 min',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '4',
    title: 'Ensalada Fresca',
    description: 'Ensalada saludable con aguacate, tomate, pepino y vinagreta.',
    time: '15 min',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '5',
    title: 'Tacos al Pastor',
    description: 'Auténticos tacos mexicanos con carne adobada y piña.',
    time: '40 min',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=500&q=60'
  }
];

export default function Home({ navigation }) {

  // Función que renderiza cada tarjeta de receta
  const renderRecipeCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <TouchableOpacity>
            {/* Cambiado al botón de Me gusta */}
            <Ionicons name="heart-outline" size={24} color="#FF4B4B" />
          </TouchableOpacity>
        </View>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Cabecera personalizada con el logo */}
        <View style={styles.header}>
          <Image 
            source={require('../../assets/image1.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search-outline" size={26} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => navigation.replace('Inicio')}
            >
              <Ionicons name="log-out-outline" size={28} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Título de la sección */}
        <Text style={styles.sectionTitle}>¿Qué te apetece comer hoy?</Text>

        {/* Lista de Platos (Scrollable) */}
        <FlatList
          data={RECIPES}
          keyExtractor={item => item.id}
          renderItem={renderRecipeCard}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Barra de Navegación Inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={28} color="#FF4B4B" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Favoritos')}>
          <Ionicons name="heart-outline" size={28} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="add-circle-outline" size={34} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('PerfilUsuario')}>
          <Ionicons name="person-outline" size={28} color="#666" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FEFAE0', // Fondo actualizado al nuevo color
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#FEFAE0', // Fondo actualizado al nuevo color
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FEFAE0', // Fondo actualizado al nuevo color
  },
  logo: {
    width: 120,
    height: 40,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF', // Mantenemos el blanco para que contraste
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 2,
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  cardDescription: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Mantenemos la barra en blanco
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingBottom: Platform.OS === 'ios' ? 25 : 12,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});