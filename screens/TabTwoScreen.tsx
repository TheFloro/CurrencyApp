import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import CurrencyItemOnMain from '../components/CurrencyItemOnMain';

import { Text, View } from '../components/Themed';
import TitleToSortBy from '../components/TitleToSortBy';
import { useStore } from '../store/store';

const TabTwoScreen = (props: any) => {
  const { someStore } = useStore();

  const isNotEmpty: boolean = someStore.observatedCurrency.length > 0;

  return (
    <View style={styles.container}>
      {!isNotEmpty ?
        <View style={styles.ifEmptyContainer}>
          <Text style={styles.textIfEmpty}>You haven't added anything to your Observable yet</Text>
        </View>
        :
        <>
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
          <View style={{ backgroundColor: 'lightblue' }}>
            <View style={{ marginBottom: 30 }}>
              <FlatList
                style={{ backgroundColor: 'lightblue' }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: 'lightblue'
  },
  titlesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    backgroundColor: 'lightblue'
  },
  ifEmptyContainer:{
    alignItems: 'center', 
    justifyContent:'center', 
    flex:1, 
    backgroundColor: 'lightblue'},
  textIfEmpty: {
    textAlign: 'center',
    fontSize: 30
  }
});

export default observer(TabTwoScreen);