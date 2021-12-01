import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Alert, Text, RefreshControl } from 'react-native';
import CurrencyItemOnMain from '../components/CurrencyItemOnMain';

import { useStore } from '../store/store';
import { observer } from 'mobx-react-lite';
import { getDate } from '../components/getDate';
import TitleContainer from '../components/titleContainer';
import { mainScreenColor } from '../constants/Colors';

const TabOneScreen = (props: any) => {
  const { mainDataStore } = useStore();

  useEffect(() => {
    dataLoader();
  }, []);

  useEffect(() => {
    if (!mainDataStore.isEverythingFetching) {
      mainDataStore.updateObservatedCurrency();
    }
  }, [mainDataStore.isEverythingFetching, mainDataStore.updateObservatedCurrency])

  const dataLoader = () => {
    mainDataStore.fetchingDataOfTenLastDays('PLN', getDate(10), getDate(1)); //API has a problem with todays data (01.12.2021), so i fetch one day back
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
        <View style={{ backgroundColor: mainScreenColor }}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={mainDataStore.refreshing}
                onRefresh={dataLoader}
              />
            }
            style={{ backgroundColor: mainScreenColor, marginBottom: 45 }}
            contentContainerStyle={{ alignItems: 'center', backgroundColor: mainScreenColor }}
            data={mainDataStore.computedValue()}
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainScreenColor,
    height: '100%'
  },
  noInternetInfo: {
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