import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import CurrencyItemOnMain from '../components/CurrencyItemOnMain';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useStore } from '../store/store';
import TitleToSortBy from '../components/TitleToSortBy';
import { observer } from 'mobx-react-lite';
import { getDate } from '../components/getDate';

const TabOneScreen = (props: any, navigation: RootTabScreenProps<'TabOne'>) => {

  const { someStore } = useStore();

  const [sortCurrency, setSortCurrency] = useState(true);
  const [sortPrice, setSortPrice] = useState(true);
  const [sortChange, setSortChange] = useState(true);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  //here i have to make it async so it can make array after fetching
  useEffect(() => {
    if (!isDataLoaded) {
      initialDataLoader();
      setIsDataLoaded(true);
    };

    //console.log(someStore.data.data, 'just checking');
  }, [])

  const initialDataLoader = async () => {
    await someStore.fetchingDataByCurrency();
    await someStore.fetchingDataByYesterday('PLN', getDate(1), getDate(0));
    await someStore.fetchingDataOfTenLastDays('PLN', getDate(9), getDate(0));


    //i can optimalize it by adding this depedencies in fetch
    someStore.todayDataCurrencies(someStore.data.data);
    someStore.twoDayDataCurrencies(someStore.historyData);
    someStore.yesterdayDataCurrencies(someStore.twoDayCurrencies[0][1])
    someStore.dataToDisplayFunction();
  }


  const sortByPrice = () => {
    if (sortPrice) {
      someStore.dataToDisplay.sort(function (a: any, b: any) { return b.value - a.value })
      setSortPrice(false);
    } else {
      someStore.dataToDisplay.sort(function (a: any, b: any) { return a.value - b.value })
      setSortPrice(true);
    }
  }

  const sortByCurrency = () => {
    if (sortCurrency) {
      someStore.dataToDisplay.sort((a: any, b: any) => {
        if (a.id < b.id) return -1;
        return a.id > b.id ? 1 : 0;
      });
      setSortCurrency(false);
    } else {
      someStore.dataToDisplay.sort((a: any, b: any) => {
        if (a.id > b.id) return -1;
        return a.id < b.id ? 1 : 0;
      });
      setSortCurrency(true);
    }
  }
  const sortByChange = () => {
    if (sortChange) {
      someStore.dataToDisplay.sort(function (a: any, b: any) { return b.change - a.change })
      setSortChange(false);
    } else {
      someStore.dataToDisplay.sort(function (a: any, b: any) { return a.change - b.change })
      setSortChange(true);
    }
  }

  return (
    <View style={styles.container}>
      {/* {isLoading ? <Text>Loading...</Text> :  */}
      <View style={styles.titlesContainer}>
        <TitleToSortBy
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
        />
      </View>
      <View>
        <View style={{ marginBottom: 30 }}>
          <FlatList
            data={someStore.dataToDisplay}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <CurrencyItemOnMain
                navigation={props.navigation}
                id={item.id}
                baseCurrency={someStore.data.baseCurrency}
                value={item.value}
                change={item.change}
                positive={item.change > 0 ? true : false}
              >
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
});

export default observer(TabOneScreen);