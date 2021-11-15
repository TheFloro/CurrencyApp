import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { getDate } from '../components/getDate';
import NotificationButton from '../components/NotificationButton';
import ParticularCurrencyInfo from '../components/ParticularCurrencyInfo';
import { useStore } from '../store/store';

const ParticularCurrency = (props: any) => {
    const { currencyId, baseCurrency, currentValue } = props.route.params.params;
    const { someStore } = useStore();
    const lastDaysPrices = [...someStore.changingDataForLastDays(currencyId)];
    const numColumns = lastDaysPrices.length;

    const lowestDropPrice = Math.min(...lastDaysPrices);
    const highestPicPrice = Math.max(...lastDaysPrices);
    //[0] is *days ago, [length-1] is current
    const percantageChange = (((lastDaysPrices[lastDaysPrices.length - 1] - lastDaysPrices[0]) * 2) / (lastDaysPrices[lastDaysPrices.length - 1] + lastDaysPrices[0])).toFixed(8)

    return (
        <View style={styles.container}>
            <View style={styles.graph}>
                <FlatList
                    numColumns={numColumns}
                    style={{ margin: 5 }}
                    data={lastDaysPrices}
                    keyExtractor={item => item}
                    renderItem={({ item, index }) => (
                        <View style={{ margin: 2 }}>
                            <Text>{item}</Text>
                        </View>
                    )}
                />
            </View>
            <View style={styles.moreInfoContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{currencyId}/{baseCurrency}</Text>
                </View>
                <View style={styles.moreInfo}>
                    <View style={styles.pickDropContainer}>
                        <ParticularCurrencyInfo
                            titleText='Highest Pick'
                            insideText={highestPicPrice}
                            style={{backgroundColor: 'black', color:'green'}}
                            margin={{}}
                        />
                        <ParticularCurrencyInfo
                            titleText='Lowest Drop'
                            insideText={lowestDropPrice}
                            style={{backgroundColor: 'black', color:'red'}}
                            margin={{}}
                        />
                    </View>
                    <View style={styles.percentageContainer}>
                    <ParticularCurrencyInfo
                            titleText='Current'
                            insideText={currentValue}
                            style={{backgroundColor: 'black', color:'white'}}
                            margin={{}}
                        />
                        <ParticularCurrencyInfo
                            titleText='Percent'
                            insideText={percantageChange}
                            addicionalSymbol='%'
                            style={{backgroundColor: 'black', color:'#80A1D4'}}
                            margin={{}}
                        />
                    </View>
                </View>
                <View style={styles.notificationContainer}>
                    <NotificationButton text='Get Notification when currency picks' />
                    <NotificationButton text='Get Notification when currency drops' />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    graph: {
        flex: 1,
        borderWidth: 3,
        borderColor: 'black',
        marginTop: 5,
        marginHorizontal: 5
    },
    moreInfoContainer: {
        flex: 2,
        backgroundColor: 'darkgreen'
    },
    titleContainer: {
        borderWidth: 3,
        borderColor: 'black',
        height: 50,
        justifyContent: 'center',
        marginTop: -3,
        backgroundColor: 'green'
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white'
    },
    moreInfo: {
        marginTop: -3,
        borderColor: 'black',
        borderWidth: 3
    },
    pickDropContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
    },
    percentageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
    },
    notificationContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        backgroundColor: 'white',
        //'#488B49'
    },
});

export default ParticularCurrency;