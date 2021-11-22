import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface NotificationButtonProps{
    style: any;
    onClick: any;
    text: string;
    iconStyles: any;
    icon: any
}

const NotificationButton = ({style, onClick, text, iconStyles, icon}: NotificationButtonProps) => {
    return (
        <TouchableOpacity style={{...styles.notficationButton, ...style}} onPress={onClick}>
             <Text style={styles.notificationText}>{text}</Text>
            <FontAwesome
              name={icon}
              size={25}
              color='white'
              style={{...styles.icon, ...iconStyles}}
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
        backgroundColor: 'rgba(1,1,1,0.5)',
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