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
    const { mainDataStore } = useStore();
    const lastDaysPrices = [...mainDataStore.changingDataForLastDays(currencyId)];

    const lowestDropPrice = Math.min(...lastDaysPrices);
    const highestPicPrice = Math.max(...lastDaysPrices);
    //[0] is Xdays ago, [length-1] is current
    const percantageChange = (((lastDaysPrices[lastDaysPrices.length - 1] - lastDaysPrices[lastDaysPrices.length - 2]) * 2) / (lastDaysPrices[lastDaysPrices.length - 1] + lastDaysPrices[lastDaysPrices.length - 2])).toFixed(8)
    const dates = mainDataStore.allInfoData.data.map((item: any) => item.date);
    let currentCurrencyIsObservated: any = [];
    useEffect(() => {
        currentCurrencyIsObservated = mainDataStore.observatedCurrency.some((item: any) => item.id === currencyId);
    }, [mainDataStore.observatedCurrency])


    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Pressable
                    onPress={() => { mainDataStore.toggleObservatedCurrency(currencyId) }}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                        marginRight: 15,
                        width: 60,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center'
                    })}>
                    <FontAwesome
                        name={currentCurrencyIsObservated ? "eye" : "eye-slash"}
                        size={25}
                        color={currentCurrencyIsObservated ? '#ffed66' : 'lightgrey'}
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
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(25, 0, 0, ${opacity})`,
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
                            addicionalSymbol=''
                            style={{ backgroundColor: 'black', color: 'green' }}
                        />
                        <ParticularCurrencyInfo
                            titleText='Lowest Drop'
                            insideText={lowestDropPrice}
                            addicionalSymbol=''
                            style={{ backgroundColor: 'black', color: 'red' }}
                        />
                    </View>
                    <View style={styles.percentageContainer}>
                        <ParticularCurrencyInfo
                            titleText='Current'
                            insideText={currentValue}
                            addicionalSymbol=''
                            style={{ backgroundColor: 'black', color: 'white' }}
                        />
                        <ParticularCurrencyInfo
                            titleText='Percent 24h'
                            insideText={percantageChange}
                            addicionalSymbol='%'
                            style={{ backgroundColor: 'black', color: '#80A1D4' }}
                        />
                    </View>
                </View>
                <View style={styles.notificationContainer}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.getNotification}>
                            <Text style={styles.getNotificationText}>Get Notifications when:</Text>
                        </View>
                    </View>
                    <View style={{ flex: 2 }}>
                        <NotificationButton
                            icon='long-arrow-up'
                            text='Currency picks'
                            style={{ borderColor: 'green' }}
                            iconStyles={{ color: 'green' }}
                            onClick={() => {
                                props.navigation.navigate('CurrencyPicksModal', {
                                    screen: 'CurrencyPicksModal',
                                    params: {
                                        currencyId: props.route.params.params.currencyId,
                                        currentValue: props.route.params.params.currentValue
                                    }
                                })
                            }}
                        />
                        <NotificationButton
                            icon='long-arrow-down'
                            text='Currency drops'
                            style={{ borderColor: 'red' }}
                            iconStyles={{ color: 'red' }}
                            onClick={() => {
                                props.navigation.navigate('CurrencyDropsModal', {
                                    screen: 'CurrencyDropsModal',
                                    params: {
                                        currencyId: props.route.params.params.currencyId,
                                        currentValue: props.route.params.params.currentValue
                                    }
                                })
                            }}
                        />
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
        flex: 1
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
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 100,
    },
    percentageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 100,
    },
    notificationContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    getNotification: {
        borderColor: 'grey',
        borderRadius: 20,
        backgroundColor: 'black',
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