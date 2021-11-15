import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const NotificationButton = (props: any) => {
    return (
        <TouchableOpacity style={styles.notficationButton}>
            <Text style={styles.notificationText}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    notficationButton: {
        padding: 5,
        margin: 1,
        borderColor: 'gold',
        borderWidth: 5,
        borderRadius: 20,
        backgroundColor: 'black',
        height: '30%',
        justifyContent: 'center'
    },
    notificationText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'gold'
    },
})

export default NotificationButton;