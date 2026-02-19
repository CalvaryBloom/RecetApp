import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Favoritos() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Esto es pantalla favoritos</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    },
});