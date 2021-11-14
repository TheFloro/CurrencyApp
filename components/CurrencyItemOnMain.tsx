import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CurrencyItemOnMain = (props: any) => {
    const [positive, setPositive] = useState(props.positive);
    //setPositive(props.positive)
    return (
        <TouchableOpacity onPress={() => {
            // console.log(props.children[0]._owner.key)
            //console.log(props.children[1].props.children.props.children)
            // props.navigation.navigate('ParticularCurrency',{
            //     screen: 'ParticularCurrency',
            //     params: {
            //         currencyId: props.children[0]._owner.key,
            //     }
            // })
            props.navigation.navigate('ParticularCurrency', {
                screen: 'ParticularCurrency',
                params: {
                    currencyId: props.id,
                    baseCurrency: props.baseCurrency
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
        alignItems: 'center'
    },
    itemOnMainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        borderColor: 'green',
        borderWidth: 5,
        alignItems: 'center'
    },
    changeNegative: {
        width: '20%',
        borderColor: 'red',
        borderWidth: 5,
        alignItems: 'center'
    },
    itemText: {
        fontSize: 18
    },
    changeText: {
        fontSize: 15
    }
});

export default CurrencyItemOnMain;