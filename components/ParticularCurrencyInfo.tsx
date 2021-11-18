import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { mainColor } from '../constants/Colors';

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
        width: '49.5%',
        height: '96%',
        borderWidth: 1,
        borderColor: mainColor,
        borderRadius: 20
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