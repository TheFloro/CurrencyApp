import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import CurrencyItemOnMain from '../components/CurrencyItemOnMain';

import { Text, View } from '../components/Themed';
import TitleContainer from '../components/titleContainer';
import YourNotifications from '../components/YourNotifications';
import { secondScreenColor } from '../constants/Colors';
import { useStore } from '../store/store';

const TabTwoScreen = (props: any) => {
  const { someStore } = useStore();

  const isNotEmpty: boolean = someStore.observatedCurrency.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex:1}} contentContainerStyle={{flexGrow: 1}}>
      <YourNotifications />
      {!isNotEmpty ?
        <View style={styles.ifEmptyContainer}>
          <Text style={styles.textIfEmpty}>You haven't added anything to your "Keep Track" list yet</Text>
        </View>
        :
        <>
          <View style={{ width: '100%', height: 90, backgroundColor: '#000' }}>
            <Text style={{
              color: '#FFF',
              fontSize: 22,
              textAlign: 'center'
            }}>Your Currencies</Text>
            <TitleContainer />
          </View>
          <View style={styles.titlesContainer}>
            {/* <TitleToSortBy
          sortBy={sortByCurrency}
          title='Currency'
          icon='sort'
        />
        <TitleToSortBy
          sortBy={sortByPrice}
          title='Price'
          icon='sort'
        />
        <TitleToSortBy
          sortBy={sortByChange}
          title='24H Change'
          icon='sort'
        /> */}
          </View>
          <View style={{ backgroundColor: secondScreenColor }}>
            <View style={{ marginBottom: 30 }}>
              <FlatList
                style={{ backgroundColor: secondScreenColor }}
                contentContainerStyle={{ alignItems: 'center' }}
                data={someStore.observatedCurrency}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                  <CurrencyItemOnMain
                    navigation={props.navigation}
                    id={item.id}
                    baseCurrency={someStore.allInfoData.baseCurrency}
                    value={item.value}
                    change={item.change}
                    positive={item.change > 0 ? true : false}
                  >
                  </CurrencyItemOnMain>
                )}
              />
            </View>
          </View>
        </>
      }
      </ScrollView>
    </SafeAreaView>
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