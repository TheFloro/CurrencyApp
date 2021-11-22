import AsyncStorage from '@react-native-async-storage/async-storage';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CurrencyItemOnMain from '../components/CurrencyItemOnMain';
import TitleForTabTwo from '../components/TitleForTabTwo';
import YourNotifications from '../components/YourNotifications';
import { secondScreenColor } from '../constants/Colors';
import { useStore } from '../store/store';

const TabTwoScreen = (props: any) => {
  const { mainDataStore } = useStore();

  const isNotEmpty: boolean = mainDataStore.observatedCurrency.length > 0;

  return (
    <View style={styles.container}>
      <YourNotifications />
      {!isNotEmpty ?
        <View style={styles.ifEmptyContainer}>
          <Text style={styles.textIfEmpty}>You haven't added anything to your "Keep Track" list yet</Text>
        </View>
        :
        <>
            <TitleForTabTwo
              mainTitle='Your Currencies'
              first='Currency'
              second='Price'
              third='24H Change'
            />
              <FlatList
                style={{ backgroundColor: secondScreenColor }}
                contentContainerStyle={{ alignItems: 'center' }}
                data={mainDataStore.observatedCurrency}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                  <CurrencyItemOnMain
                    navigation={props.navigation}
                    id={item.id}
                    baseCurrency={mainDataStore.allInfoData.baseCurrency}
                    value={item.value}
                    change={item.change}
                    positivea={item.change > 0 ? true : false}
                    style={{}}
                  />
                )}
              />
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: secondScreenColor
  },
  titlesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    backgroundColor: secondScreenColor
  },
  ifEmptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: secondScreenColor
  },
  textIfEmpty: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'sans-serif-light'
  }
});

export default observer(TabTwoScreen);