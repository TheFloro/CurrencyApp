import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const YourNotifications = (props: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Your Notifications</Text>
            </View>
            <View style={styles.notifications}>
                <Text>FlatList with Items of Notifications</Text>
                <Text>example1</Text>
                <Text>example2</Text>
                <Text>example3</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    titleContainer: {
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 10
    },
    titleText: {
        color: '#FFF',
        fontSize: 22
    },
    notifications: {
        alignItems: 'center'
    }
})

export default YourNotifications;