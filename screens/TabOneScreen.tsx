import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, FlatList, Pressable } from 'react-native';
import CurrencyItemOnMain from '../components/CurrencyItemOnMain';
import { FontAwesome } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen(props: any, navigation: RootTabScreenProps<'TabOne'>) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});

  // const array = data.split(',');
  // console.log(array);

  let anotherObject: any;
  let thirdObject;

  const firstObject = {
    "data": anotherObject = {
      "AED": 3.67247,
      "AFN": 91.20128,
      "ALL": 106.57215,
      "AMD": 472.51019,
      "AOA": 596.4093,
      "ARS": 100.21128,
      "AUD": 1.37074,
      "AZN": 1.69482,
      "BDT": 85.66114,
      "BGN": 1.70824,
      "BHD": 0.37701,
      "BIF": 1981.94049,
      "BIH": 1.70783,
      "BND": 1.35213,
      "BOB": 6.83017,
      "BRL": 5.45526,
      "BSD": 1.00003,
      "BTC": 0.0154,
      "BWP": 11.44175,
      "BYR": 2.00003,
      "CAD": 1.25524,
      "CDF": 1995.82673,
      "CHF": 0.92078,
      "CLP": 799.96592,
      "CNY": 6.38111,
      "COP": 3882.3532,
      "CRC": 639.81599,
      "CUC": 24.00063,
      "CVE": 96.27232,
      "CZK": 22.04583,
      "DJF": 177.60179,
      "DKK": 6.49637,
      "DOP": 56.46073,
      "DZD": 137.58179,
      "EGP": 15.68023,
      "ERN": 15.07023,
      "ETB": 47.52115,
      "ETH": 0.00021,
      "EUR": 0.87351,
      "FJD": 2.09264,
      "GBP": 0.74631,
      "GEL": 3.13003,
      "GHS": 5.99015,
      "GMD": 52.00135,
      "GNF": 9450.1472,
      "GTQ": 7.72513,
      "GYD": 208.09588,
      "HKD": 7.79058,
      "HNL": 24.0007,
      "HRV": 6.55939,
      "HTG": 98.18151,
      "HUF": 320.61691,
      "IDR": 14233.23798,
      "ILS": 3.10749,
      "INR": 74.38221,
      "IQD": 1458.5392,
      "IRR": 42000.87563,
      "ISK": 131.22262,
      "JMD": 154.93444,
      "JOD": 0.70801,
      "JPY": 113.8927,
      "KES": 111.75329,
      "KGS": 84.78219,
      "KHR": 4060.09638,
      "KMF": 429.6706,
      "KRW": 1175.62488,
      "KYD": 0.82001,
      "KZT": 430.79198,
      "LAK": 10611.15403,
      "LBP": 1505.72525,
      "LKR": 200.00363,
      "LRD": 143.70312,
      "LSL": 15.32147,
      "LTC": 0,
      "LYD": 4.5456,
      "MAD": 9.12862,
      "MDL": 17.54751,
      "MGA": 3961.0823,
      "MKD": 53.58147,
      "MMK": 1769.05247,
      "MNT": 2842.07548,
      "MOP": 8.02414,
      "MUR": 42.70122,
      "MVR": 15.42028,
      "MWK": 808.40906,
      "MXN": 20.53049,
      "MYR": 4.1641,
      "MZN": 63.18095,
      "NAD": 15.2492,
      "NGN": 410.39648,
      "NIO": 35.43062,
      "NOK": 8.68902,
      "NPR": 119.08206,
      "NZD": 1.42423,
      "OMR": 0.38491,
      "PAB": 1.00001,
      "PEN": 4.00581,
      "PGK": 3.51128,
      "PHP": 49.77116,
      "PKR": 175.25408,
      "PLN": 4.05415,
      "PYG": 6864.82834,
      "QAR": 3.64008,
      "RON": 4.31976,
      "RSD": 102.62225,
      "RUB": 72.88344,
      "RWF": 1019.31262,
      "SAR": 3.75044,
      "SCR": 14.49308,
      "SDG": 436.71536,
      "SEK": 8.75685,
      "SGD": 1.35215,
      "SLL": 10889.11465,
      "SOS": 575.01656,
      "SRD": 21.32226,
      "SSP": 399.01063,
      "STD": 21.40061,
      "SVC": 8.75004,
      "SYP": 2510.0253,
      "SZL": 15.32165,
      "THB": 32.71042,
      "TJS": 11.27022,
      "TMT": 3.49005,
      "TND": 2.83005,
      "TRY": 10.0131,
      "TTD": 6.75402,
      "TWD": 27.78943,
      "TZS": 2297.03006,
      "UAH": 26.26036,
      "UGX": 3522.04643,
      "URY": 43.67076,
      "UZS": 10675.22233,
      "VND": 22640.33562,
      "XAF": 563.0164,
      "XOF": 569.51663,
      "XPF": 103.95298,
      "XRP": 0.83001,
      "YER": 249.98747,
      "ZAR": 15.33849,
    },
    "query": thirdObject = {
      "apikey": "fe01c280-43d8-11ec-b6f7-0bd38475eeb3",
      "base_currency": "USD",
      "timestamp": 1636746938,
    }
  }

  const baseCurrency: any = thirdObject.base_currency;

  const array: any = [];
  for (const [id, value] of Object.entries(anotherObject)) {
    array.push({ id, value })
  }
  //console.log(array, baseCurrency);


  // const [newInfo, setNewInfo] = useState({});
  //                                                               //historical of base USD
  //   useEffect(() => {
  //   fetch('https://freecurrencyapi.net/api/v2/historical?apikey=fe01c280-43d8-11ec-b6f7-0bd38475eeb3&base_currency=USD&date_from=2020-10-01&date_to=2021-11-12')
  //   .then((response) => response.json())
  //   .then(json => {
  //     console.log(json.data);
  //     setNewInfo(json);
  //   })
  //   // .catch((error) => console.error(error))
  //   // .finally(() => setLoading(false));
  // }, []);




                                                                  //normal fetch
  // useEffect(() => {
  //   fetch('https://freecurrencyapi.net/api/v2/latest?apikey=fe01c280-43d8-11ec-b6f7-0bd38475eeb3')
  //   .then((response) => response.json())
  //   .then(json => {
  //     console.log(json);
  //     setData(json);
  //   })
  //   // .catch((error) => console.error(error))
  //   // .finally(() => setLoading(false));
  // }, []);




  return (
    <View style={styles.container}>
      {/* {isLoading ? <Text>Loading...</Text> :  */}
      <View style={styles.titlesContainer}>
        <View>
          <Pressable
            onPress={() => { }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
              flexDirection: 'row',
              alignItems:'center'
            })}>
              <Text style={styles.title}>Currency</Text>
            <FontAwesome
              name="sort"
              size={15}
              color='grey'
              style={{}}
            />
          </Pressable>
        </View>
        <View>
          <Pressable
            onPress={() => { }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
              flexDirection: 'row',
              alignItems:'center'
            })}>
              <Text style={styles.title}>Price</Text>
            <FontAwesome
              name="sort"
              size={15}
              color='grey'
              style={{}}
            />
          </Pressable>
        </View>
        <View>
          <Pressable
            onPress={() => { }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
              flexDirection: 'row',
              alignItems:'center'
            })}>
              <Text style={styles.title}>24h Change</Text>
            <FontAwesome
              name="sort"
              size={15}
              color='grey'
              style={{}}
            />
          </Pressable>
        </View>
      </View>
      <View>
        <View style={{ marginBottom: 30 }}>
          <FlatList
            data={array}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item, index }) => (
              <CurrencyItemOnMain
              navigation={props.navigation}
              id={item.id}
              baseCurrency={baseCurrency}
              value={item.value}
              //percentage
              >
                {/* <View style={styles.currency}>
                  <Text style={styles.itemText}>{item.id}/</Text>
                  <Text style={{textAlignVertical:'bottom', fontSize: 12}}>{baseCurrency}</Text>
                </View>
                <View style={styles.price}>
                  <Text style={styles.itemText}>{item.value}</Text>
                </View>
                <View style={styles.change}>
                  <Text style={styles.itemText}>{random}</Text>
                </View> */}
              </CurrencyItemOnMain>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  titlesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    backgroundColor: 'lightgreen',
    marginHorizontal: 5
  },
  
});
