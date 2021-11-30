import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Alert, Text, RefreshControl } from 'react-native';
import CurrencyItemOnMain from '../components/CurrencyItemOnMain';

import { useStore } from '../store/store';
import { observer } from 'mobx-react-lite';
import { getDate } from '../components/getDate';
import TitleContainer from '../components/titleContainer';
import { mainScreenColor } from '../constants/Colors';
import * as Network from 'expo-network';

const TabOneScreen = (props: any) => {
  const { mainDataStore } = useStore();
  //const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isInternet, setIsInternet] = useState<boolean | undefined>(false);

  // useEffect(() => {
  //   if (!isDataLoaded) {
  //     dataLoader();
  //   }
  // }, [isDataLoaded])

  useEffect(() => {
    dataLoader();
  }, []);

  useEffect(() => {
    if (!mainDataStore.isEverythingFetching) {
      mainDataStore.updateObservatedCurrency();
    }
  }, [mainDataStore.isEverythingFetching, mainDataStore.updateObservatedCurrencyArray])

  const dataLoader = async () => {
    try {
      const internetConnection = await Network.getNetworkStateAsync();
      setIsInternet(internetConnection.isInternetReachable);
      await mainDataStore.fetchingDataOfTenLastDays('PLN', getDate(9), getDate(0));
      //setIsDataLoaded(true);
      console.log('dataLoader NOW');
    } catch (e) {
      Alert.alert('I am sorry there was a problem with your connection or database')
    }
  }

  const isTypeOfNan = (item: string) => {
    if (item === 'NaN') {
      return Number(0);
    } else {
      return Number(item);
    }
  }

  return (
    <>
      <View style={styles.titlesContainer}>
        <TitleContainer />
      </View>
      <View style={styles.container}>
        {!isInternet ?
          <View style={styles.noInternetInfo}>
            <Text style={{fontSize: 20}}>There is no Internet connection</Text>
          </View>
          :
          <View style={{ backgroundColor: mainScreenColor }}>
            <FlatList
              // onRefresh={() => { setIsDataLoaded(false); }}
              // refreshing={!isDataLoaded}
              // extraData={mainDataStore.flatListReload}
              refreshControl={
                <RefreshControl 
                  refreshing={mainDataStore.flatListReload}
                  onRefresh={dataLoader}
                />
              }
              style={{ backgroundColor: mainScreenColor, marginBottom: 45 }}
              contentContainerStyle={{ alignItems: 'center', backgroundColor: mainScreenColor }}
              data={mainDataStore.dataToDisplay}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => (
                <CurrencyItemOnMain
                  navigation={props.navigation}
                  id={item.id}
                  baseCurrency={mainDataStore.allInfoData.baseCurrency}
                  value={item.value}
                  change={isTypeOfNan(item.change)}
                  positivea={isTypeOfNan(item.change) > 0 ? true : false}
                  style={{}}
                />
              )}
            />
          </View>
        }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainScreenColor,
    height: '100%'
  },
  noInternetInfo:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  titlesContainer: {
    flexDirection: 'row',
    backgroundColor: mainScreenColor, //#ffa62b
    width: '100%'
  },
});

export default observer(TabOneScreen);