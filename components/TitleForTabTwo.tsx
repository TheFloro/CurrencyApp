import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { mainColor } from '../constants/Colors';

interface TitleForTabTwoProps{
    mainTitle: string;
    first: string;
    second: string;
    third: string;
}

const TitleForTabTwo = ({mainTitle, first, second, third}: TitleForTabTwoProps) => {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{mainTitle}</Text>
            <View style={styles.justTitle}>
                <Text style={styles.titleText}>{first}</Text>
                <Text style={styles.titleText}>{second}</Text>
                <Text style={styles.titleText}>{third}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        backgroundColor: '#000',
        padding: 10,
        alignItems: 'center'
    },
    titleText: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginHorizontal: 25
    },
    justTitle:{
        padding: 10,
        marginVertical: 5,
        borderWidth: 2,
        borderColor: mainColor,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'black',
        width: '100%'
    }
})

export default TitleForTabTwo;