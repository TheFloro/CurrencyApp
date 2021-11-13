import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const ParticularCurrency = (props: any) => {
    const { currencyId, baseCurrency } = props.route.params.params;

    let secondObject;
    let thirdObject;

    const firstObject = {
        "data": secondObject = {
            "2020-10-01": thirdObject = {
                "AED": 3.6733,
                "AFN": 76.75068,
                "ALL": 105.60167,
                "AMD": 488.58555,
                "AOA": 630.5234,
                "ARS": 76.18902,
                "AUD": 1.3926,
                "AZN": 1.70662,
                "BDT": 84.73177,
                "BGN": 1.66482,
                "BHD": 0.37641,
                "BIF": 1915.90187,
                "BIH": 1.66312,
                "BND": 1.36213,
                "BOB": 6.83011,
                "BRL": 5.64365,
                "BSD": 1.00003,
                "BTC": 0.0943,
                "BWP": 11.56605,
                "BYR": 2.60086,
                "CAD": 1.32868,
                "CDF": 1961.04866,
                "CHF": 0.91904,
                "CLP": 787.11015,
                "CNY": 6.79047,
                "COP": 3845.58018,
                "CRC": 603.06901,
                "CUC": 1.00002,
                "CVE": 93.76122,
                "CZK": 22.86586,
                "DJF": 177.50434,
                "DKK": 6.33844,
                "DOP": 58.5018,
                "DZD": 129.00134,
                "EGP": 15.75199,
                "ERN": 15.00024,
                "ETB": 36.75064,
                "ETH": 0.00283,
                "EUR": 0.85151,
                "FJD": 2.13153,
                "GBP": 0.77609,
                "GEL": 3.21041,
                "GHS": 5.79513,
                "GMD": 51.70088,
                "GNF": 9755.28625,
                "GTQ": 7.77666,
                "GYD": 207.68259,
                "HKD": 7.75034,
                "HNL": 24.65081,
                "HRV": 6.43629,
                "HTG": 65.92051,
                "HUF": 305.50507,
                "IDR": 14826.41456,
                "ILS": 3.42731,
                "INR": 73.25624,
                "IQD": 1187.64378,
                "IRR": 42000.77785,
                "ISK": 138.11428,
                "JMD": 139.91248,
                "JOD": 0.70802,
                "JPY": 105.55061,
                "KES": 108.44114,
                "KGS": 79.48904,
                "KHR": 4100.05177,
                "KMF": 418.83552,
                "KRW": 1162.99432,
                "KYD": 0.82502,
                "KZT": 429.3728,
                "LAK": 9187.73329,
                "LBP": 1513.21169,
                "LKR": 184.86209,
                "LRD": 197.00418,
                "LSL": 16.6018,
                "LTC": 0.02167,
                "LYD": 1.3799,
                "MAD": 9.25034,
                "MDL": 16.93288,
                "MGA": 3900.06787,
                "MKD": 52.4526,
                "MMK": 1305.01878,
                "MNT": 2826.03255,
                "MOP": 7.977,
                "MUR": 39.84724,
                "MVR": 15.4202,
                "MWK": 751.01839,
                "MXN": 21.84758,
                "MYR": 4.15055,
                "MZN": 71.50178,
                "NAD": 16.65023,
                "NGN": 382.51212,
                "NIO": 34.62104,
                "NOK": 9.3113,
                "NPR": 116.96925,
                "NZD": 1.50408,
                "OMR": 0.38491,
                "PAB": 1.00003,
                "PEN": 3.60903,
                "PGK": 3.48678,
                "PHP": 48.47095,
                "PKR": 165.00444,
                "PLN": 3.8159,
                "PYG": 6979.70466,
                "QAR": 3.64107,
                "RON": 4.15054,
                "RSD": 100.11794,
                "RUB": 77.24319,
                "RWF": 956.01037,
                "SAR": 3.75068,
                "SCR": 17.96036,
                "SDG": 55.30313,
                "SEK": 8.92377,
                "SGD": 1.36321,
                "SLL": 9812.73371,
                "SOS": 575.01465,
                "SRD": 14.1543,
                "SSP": 164.52392,
                "STD": 20.83359,
                "SVC": 8.74386,
                "SYP": 512.05705,
                "SZL": 16.6503,
                "THB": 31.58121,
                "TJS": 10.31759,
                "TMT": 3.49007,
                "TND": 2.76157,
                "TRY": 7.75653,
                "TTD": 6.78788,
                "TWD": 28.88273,
                "TZS": 2320.03035,
                "UAH": 28.3222,
                "UGX": 3710.1793,
                "URY": 42.58063,
                "USD": 1.00007,
                "UZS": 10310.248,
                "VND": 23188.5524,
                "XAF": 558.15965,
                "XOF": 558.51675,
                "XPF": 101.90208,
                "XRP": 4.19997,
                "YER": 250.40484,
                "ZAR": 16.53822,
            },
            "2020-10-02": thirdObject = {
                "AED": 3.5632
            },
            "2020-10-03": thirdObject = {
                "AED": 3.3454
            },
        }
    }

    const historicalData: any = [];
    for (const [data, value] of Object.entries(firstObject.data)) {
        historicalData.push({ data, value })
    }

    const historicalDataTotal: any = [];

    historicalData.every((item: any) => historicalDataTotal.push(item.value[currencyId]));

    const numColumns = 10;

    return (
        <View style={styles.container}>
            <View style={styles.graph}>
                <FlatList
                numColumns={numColumns}
                style={{margin: 10}}
                    data={historicalDataTotal}
                    keyExtractor={item => item}
                    renderItem={({ item, index }) => (
                        <View style={{margin: 10}}>
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
                        <View style={styles.highestpic}>
                            <Text style={{ ...styles.moreInfoTitles, ...styles.text }}>Highest pic </Text>
                            <Text style={styles.text}>3.6032</Text>
                        </View>
                        <View style={styles.lowestdrop}>
                            <Text style={{ ...styles.moreInfoTitles, ...styles.text }}>Lowest drop</Text>
                            <Text style={styles.text}>3.4453</Text>
                        </View>
                    </View>
                    <View style={styles.percentageContainer}>
                        <View style={styles.percentage}>
                            <Text style={{ ...styles.moreInfoTitles, ...styles.text }}>Current</Text>
                            <Text style={styles.text}>3.5632</Text>
                        </View>
                        <View style={styles.percentage}>
                            <Text style={{ ...styles.moreInfoTitles, ...styles.text }}>Percentage</Text>
                            <Text style={styles.text}>+3%</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.notificationContainer}>
                    <TouchableOpacity style={styles.notficationButton}>
                        <Text style={styles.notificationText}>Get Notification when currency picks</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.notficationButton}>
                        <Text style={styles.notificationText}>Get Notification when currency drops</Text>
                    </TouchableOpacity>
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
        flex: 1
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
    highestpic: {
        padding: 5,
        backgroundColor: 'green',
        alignItems: 'center',
        width: '49%'
    },
    percentage: {
        padding: 5,
        backgroundColor: 'blue',
        alignItems: 'center',
        width: '49%'
    },
    lowestdrop: {
        padding: 5,
        backgroundColor: 'red',
        alignItems: 'center',
        width: '49%'
    },
    moreInfoTitles: {
        fontSize: 20
    },
    text: {
        color: 'white',
        fontSize: 30
    },
    notificationContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    notficationButton: {
        padding: 5,
        margin: 5,
        borderColor: 'gold',
        borderWidth: 5,
        borderRadius: 20,
        backgroundColor: 'black'
    },
    notificationText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'gold'
    }
});

export default ParticularCurrency;