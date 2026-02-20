import React from 'react';
import { View, Text} from 'react-native';

import styles from '../styles/Favoritos';

export default function Favoritos() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Esto es pantalla favoritos</Text>
        </View>
    );
}