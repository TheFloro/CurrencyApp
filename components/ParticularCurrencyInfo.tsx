import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { mainColor } from '../constants/Colors';

interface ParticularCurrencyInfoProps {
    style: any;
    titleText: string;
    insideText: string | number;
    addicionalSymbol: any;
}

const ParticularCurrencyInfo = ({style, titleText, insideText, addicionalSymbol}: ParticularCurrencyInfoProps) => {
    return (
        <View style={{...styles.container, ...style}}>
            <Text style={{...styles.moreInfoTitles, ...style}}>{titleText}</Text>
            <Text style={{...styles.text, ...style}}>{insideText}{addicionalSymbol}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '46.5%',
        height: '94%',
        borderWidth: 1,
        borderColor: mainColor,
        borderRadius: 20,
    },
    moreInfoTitles: {
        fontFamily: 'sans-serif-thin',
        fontSize: 22,
    },
    text: {
        fontSize: 15
    },
})

export default ParticularCurrencyInfo;