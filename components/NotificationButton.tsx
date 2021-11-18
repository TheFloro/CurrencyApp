import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const NotificationButton = (props: any) => {
    return (
        <TouchableOpacity style={{...styles.notficationButton, ...props.styles}}>
             <Text style={styles.notificationText}>{props.text}</Text>
            <FontAwesome
              name={props.icon}
              size={25}
              color='white'
              style={{...styles.icon, ...props.iconStyles}}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    notficationButton: {
        padding: 5,
        margin: 1,
        borderColor: 'gold',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    notificationText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'gold',
        marginHorizontal: 20
    },
    icon: {
        margin: 5
    }
})

export default NotificationButton;