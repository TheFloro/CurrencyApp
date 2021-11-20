import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const YourNotificationItem = (props: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <View style={styles.textContainer}>
                    <Text style={styles.itemText}>{props.id}/</Text>
                    <Text style={{ textAlignVertical: 'bottom', fontSize: 10 }}>{props.baseCurrency}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.itemText}>{props.pick}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.itemText}>{props.drop}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        borderWidth: 2,
        borderColor: 'rgba(155,155,155,0.1)',
        backgroundColor: 'white',
        borderRadius: 25,
        shadowColor: "#134611",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 4,
        width: '90%',
        alignSelf: 'center',
        padding: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemText: {
        fontSize: 14,
    },
    textContainer: {
        flexDirection: 'row',
        margin: 5,
        padding: 10
    }
})

export default YourNotificationItem;