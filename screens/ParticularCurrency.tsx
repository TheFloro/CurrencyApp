import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import NotificationButton from '../components/NotificationButton';
import ParticularCurrencyInfo from '../components/ParticularCurrencyInfo';
import { useStore } from '../store/store';
import { LineChart } from 'react-native-chart-kit';
import { FontAwesome } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { mainColor, mainScreenColor } from '../constants/Colors';

const ParticularCurrency = (props: any) => {
    const { currencyId, baseCurrency, currentValue } = props.route.params.params;
    const { someStore } = useStore();
    const lastDaysPrices = [...someStore.changingDataForLastDays(currencyId)];

    const lowestDropPrice = Math.min(...lastDaysPrices);
    const highestPicPrice = Math.max(...lastDaysPrices);
    //[0] is Xdays ago, [length-1] is current
    const percantageChange = (((lastDaysPrices[lastDaysPrices.length - 1] - lastDaysPrices[lastDaysPrices.length - 2]) * 2) / (lastDaysPrices[lastDaysPrices.length - 1] + lastDaysPrices[lastDaysPrices.length - 2])).toFixed(8)
    const dates = someStore.allInfoData.data.map((item: any) => item.date)

    const currentCurrencyIsObservated = someStore.observatedCurrency.some((currency: any) => currency.id === currencyId)

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Pressable
                    onPress={() => { someStore.toggleObservatedCurrency(currencyId) }}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                    })}>
                    <FontAwesome
                        name={currentCurrencyIsObservated ? "eye" : "eye-slash"}
                        size={25}
                        color={currentCurrencyIsObservated ? '#ffed66' : 'lightgrey'}
                        style={{ marginRight: 15 }}
                    />
                </Pressable>
            )
        })
    }, [currentCurrencyIsObservated])

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
                        height={Dimensions.get("window").height / 3}
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
                            titleText='Percent 24h'
                            insideText={percantageChange}
                            addicionalSymbol='%'
                            style={{ backgroundColor: 'black', color: '#80A1D4' }}
                            margin={{}}
                        />
                    </View>
                </View>
                {/* <View style={styles.notificationContainer}>
                    <NotificationButton text='Get Notification when currency picks' />
                    <NotificationButton text='Get Notification when currency drops' />
                </View> */}
                <View style={styles.notificationContainer}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.getNotification}>
                            <Text style={styles.getNotificationText}>Get Notifications when:</Text>
                        </View>
                    </View>
                    <View style={{ flex: 2 }}>
                        <NotificationButton icon='long-arrow-up' text='Currency picks' styles={{ borderColor: 'green' }} iconStyles={{color: 'green'}} />
                        <NotificationButton icon='long-arrow-down' text='Currency drops' styles={{ borderColor: 'red' }} iconStyles={{color: 'red'}} />
                    </View>
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
        backgroundColor: mainScreenColor
    },
    titleContainer: {
        borderWidth: 2,
        borderColor: mainColor,
        height: 50,
        justifyContent: 'center',
        marginTop: -3,
        backgroundColor: 'black'
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white'
    },
    moreInfo: {
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
    // notificationContainer: {
    //     flex: 1,
    //     justifyContent: 'space-evenly',
    //     alignItems: 'stretch',
    //     backgroundColor: mainScreenColor,
    //     //'#488B49'
    // },
    notificationContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    getNotification: {
        borderColor: 'grey',
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1
    },
    getNotificationText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'gold'
    },

});

export default observer(ParticularCurrency);