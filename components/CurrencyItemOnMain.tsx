import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

const CurrencyItemOnMain = (props: any) => {
    const [positive, setPositive] = useState(props.positive);
    //setPositive(props.positive)
    return (
        <View style={styles.container}>
        <Pressable 
        onPress={() => {
            props.navigation.navigate('ParticularCurrency', {
                screen: 'ParticularCurrency',
                params: {
                    currencyId: props.id,
                    baseCurrency: props.baseCurrency,
                    currentValue: props.value
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
            
        </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
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