import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { getDate } from '../components/getDate';
import NotificationButton from '../components/NotificationButton';
import ParticularCurrencyInfo from '../components/ParticularCurrencyInfo';
import { useStore } from '../store/store';
import { LineChart } from 'react-native-chart-kit';

const ParticularCurrency = (props: any) => {
    const { currencyId, baseCurrency, currentValue } = props.route.params.params;
    const { someStore } = useStore();
    const lastDaysPrices = [...someStore.changingDataForLastDays(currencyId)];

    const lowestDropPrice = Math.min(...lastDaysPrices);
    const highestPicPrice = Math.max(...lastDaysPrices);
    //[0] is Xdays ago, [length-1] is current
    const percantageChange = (((lastDaysPrices[lastDaysPrices.length - 1] - lastDaysPrices[0]) * 2) / (lastDaysPrices[lastDaysPrices.length - 1] + lastDaysPrices[0])).toFixed(8)
    const dates = someStore.tenlastDaysData.map((item: any) => item.data)

    return (
        <View style={styles.container}>
            <View style={styles.graph}>
                <View>
                    <LineChart
                        data={{
                            labels: dates,
                            datasets: [
                                {
                                    data: lastDaysPrices
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width}
                        height={Dimensions.get("window").height/3}
                        yAxisLabel=""
                        yAxisSuffix=""
                        yAxisInterval={1}
                        verticalLabelRotation={-55}
                        chartConfig={{ 
                            backgroundColor: "green",
                            backgroundGradientFrom: "grey",
                            backgroundGradientTo: "#A2D3C2",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(25, 0, 0, ${opacity})`,
                            style: {
                                // borderRadius: 16
                            },
                            propsForDots: {
                                r: "5",
                                strokeWidth: "3",
                                stroke: "orange"

                            },
                        }}
                        style={{
                            paddingRight: 50
                        }}
                    />
                </View>
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
                            style={{ backgroundColor: 'black', color: 'green' }}
                            margin={{}}
                        />
                        <ParticularCurrencyInfo
                            titleText='Lowest Drop'
                            insideText={lowestDropPrice}
                            style={{ backgroundColor: 'black', color: 'red' }}
                            margin={{}}
                        />
                    </View>
                    <View style={styles.percentageContainer}>
                        <ParticularCurrencyInfo
                            titleText='Current'
                            insideText={currentValue}
                            style={{ backgroundColor: 'black', color: 'white' }}
                            margin={{}}
                        />
                        <ParticularCurrencyInfo
                            titleText='Percent'
                            insideText={percantageChange}
                            addicionalSymbol='%'
                            style={{ backgroundColor: 'black', color: '#80A1D4' }}
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
        // borderWidth: 3,
        // borderColor: 'black',
        // marginTop: 5,
        // marginHorizontal: 5
    },
    moreInfoContainer: {
        flex: 2,
        backgroundColor: 'darkgreen'
    },
    titleContainer: {
        borderTopWidth: 3,
        borderBottomWidth: 3,
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