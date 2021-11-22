import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { mainScreenColor } from '../constants/Colors';

interface CurrencyItemOnMainProps {
    positivea: boolean;
    navigation: any;
    id: string;
    baseCurrency: string;
    value: number;
    change: number;
    style: any;
}

const CurrencyItemOnMain = ({positivea, navigation, id, baseCurrency, value, change, style} :CurrencyItemOnMainProps) => {
    const positive = positivea;

    return (
        <View style={styles.container}>
        <Pressable 
        onPress={() => {
            navigation.navigate('ParticularCurrency', {
                screen: 'ParticularCurrency',
                params: {
                    currencyId: id,
                    baseCurrency: baseCurrency,
                    currentValue: value
                }
            })
        }}
        style={({ pressed }) => ({
            alignItems: 'center',
            opacity: pressed ? 0.2 : 1,
            padding: 10,
            backgroundColor: pressed ? 'lightgreen' : 'white',
            borderRadius: 25,
          })}
        >
            <View style={{ ...styles.item, ...style }}>
                <View style={styles.currency}>
                    <Text style={styles.itemText}>{id}/</Text>
                    <Text style={{ textAlignVertical: 'bottom', fontSize: 12 }}>{baseCurrency}</Text>
                </View>
                <View style={styles.price}>
                    <Text style={styles.itemText}>{value}</Text>
                </View>
                <View style={positive ? styles.change : styles.changeNegative}>
                    <Text style={styles.changeText}>{change}%</Text>
                </View>
            </View>
            
        </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        marginVertical: 5,
        borderWidth: 2,
        borderColor: 'rgba(155,155,155,0.1)',
        backgroundColor: mainScreenColor,
        borderRadius: 25,
        shadowColor: "#134611",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 4,
        width: '95%',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    currency: {
        width: '30%',
        flexDirection: 'row'
    },
    price: {
        width: '40%'
    },
    change: {
        width: '20%',
        padding: 5,
        alignItems: 'center',
        backgroundColor: 'green'
    },
    changeNegative: {
        width: '20%',
        padding: 5,
        alignItems: 'center',
        backgroundColor: 'red'
    },
    itemText: {
        fontSize: 18
    },
    changeText: {
        fontSize: 15,
        color: 'white'
    }
});

export default CurrencyItemOnMain;