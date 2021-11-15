import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ParticularCurrencyInfo = (props: any) => {
    return (
        <View style={{...styles.container, ...props.style, ...props.margin}}>
            <Text style={{...styles.moreInfoTitles, ...props.style}}>{props.titleText}</Text>
            <Text style={{...styles.text, ...props.style}}>{props.insideText}{props.addicionalSymbol}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        height: '100%',
        borderWidth: 1,
        borderColor: 'darkgreen'
    },
    moreInfoTitles: {
        fontFamily: 'sans-serif-thin',
        fontSize: 30,
    },
    text: {
        fontSize: 20
    },
})

export default ParticularCurrencyInfo;