import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CurrencyItemOnMain = (props: any) => {
    const [positive, setPositive] = useState(props.positive);
    //setPositive(props.positive)
    return (
        <TouchableOpacity onPress={() => {
            props.navigation.navigate('ParticularCurrency', {
                screen: 'ParticularCurrency',
                params: {
                    currencyId: props.id,
                    baseCurrency: props.baseCurrency,
                    currentValue: props.value
                }
            })
        }}>
            <View style={{ ...styles.item, ...props.style }}>
                <View style={styles.currency}>
                    <Text style={styles.itemText}>{props.id}/</Text>
                    <Text style={{ textAlignVertical: 'bottom', fontSize: 12 }}>{props.baseCurrency}</Text>
                </View>
                <View style={styles.price}>
                    <Text style={styles.itemText}>{props.value}</Text>
                </View>
                <View style={positive ? styles.change : styles.changeNegative}>
                    <Text style={styles.changeText}>{props.change}%</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 3,
        borderColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F4F9E9',
        borderRadius: 20
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
        borderColor: 'green',
        borderWidth: 5,
        alignItems: 'center',
        backgroundColor: 'green'
    },
    changeNegative: {
        width: '20%',
        borderColor: 'red',
        borderWidth: 5,
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