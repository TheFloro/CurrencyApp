import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import CurrencyItemOnMain from '../components/CurrencyItemOnMain';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useStore } from '../store/store';
import TitleToSortBy from '../components/TitleToSortBy';
import { observer } from 'mobx-react-lite';

const TabOneScreen = (props: any, navigation: RootTabScreenProps<'TabOne'>) => {

  const { someStore } = useStore();

  const [sortCurrency, setSortCurrency] = useState(true);
  const [sortPrice, setSortPrice] = useState(true);
  const [sortChange, setSortChange] = useState(true);
  // const [data, setData] = useState<any>([]);
  // const [dataToRender, setDataToRender] = useState<any>([]);
  // const [historyData, setHistoryData] = useState<any>([]);
  // const [historyDataToWorkOn, setHistoryDataToWorkOn] = useState<any>([]);

  const [isDataLoaded, setDataLoaded] = useState(false);



  // const checkChangeFetch = (currency: string, dateFrom: string, dateTo: string) => {
  //   fetch(`https://freecurrencyapi.net/api/v2/historical?apikey=fe01c280-43d8-11ec-b6f7-0bd38475eeb3&base_currency=${currency}&date_from=${dateFrom}&date_to=${dateTo}`)
  //     .then((response) => response.json())
  //     .then(json => setHistoryData(json.data))
  //     .catch((error) => console.error(error))
  // }

  // const checkMyFetch = () => {
  //   fetch('https://freecurrencyapi.net/api/v2/latest?apikey=fe01c280-43d8-11ec-b6f7-0bd38475eeb3&base_currency=PLN')
  //     .then((response) => response.json())
  //     .then(json => setData({ data: json.data, baseCurrency: json.query.base_currency }))
  //     .catch((error) => console.error(error))
  // }


  //here i have to make it async so it can make array after fetching
  useEffect(() => {
    // if (!isDataLoaded) {
    //   checkMyFetch();
    //   checkChangeFetch('PLN', '2021-11-13', '2021-11-14');
    //   setDataLoaded(true);
    // } else {
    //   const todayData: any = [];
    //   const historicalData: any = [];
    //     for (const [id, value] of Object.entries(data.data)) {
    //       todayData.push({ id: id, value: value })
    //     }
    //   if (dataToRender !== null && dataToRender !== undefined) {
    //     for (const [data, value] of Object.entries(historyData)) {
    //       historicalData.push([data, value])
    //     }
    //   }
    //   if (historyDataToWorkOn !== null && historyDataToWorkOn !== undefined) {
    //     const yesterdayData: any = [];
    //     for (const [id, value] of Object.entries(historicalData[0][1])) {
    //       yesterdayData.push({ id: id, value: value });
    //     }
    //     const yesterday: any = [...yesterdayData];
    //     const today: any = [...todayData];

    //     yesterday.sort((a: any, b: any) => {
    //       if (a.id < b.id) return -1;
    //       return a.id > b.id ? 1 : 0;
    //     }),
    //       today.sort((a: any, b: any) => {
    //         if (a.id < b.id) return -1;
    //         return a.id > b.id ? 1 : 0;
    //       })

    //     const arrayWithAllData: any = [];
    //     for (let i: number = 0; i <= yesterday.length - 1; i++) {
    //       arrayWithAllData.push({ id: today[i].id, value: today[i].value, change: (((today[i].value - yesterday[i].value) * 2) / (today[i].value + yesterday[i].value)).toFixed(10) });
    //     }
    //     setDataToRender(arrayWithAllData);
    //   }
    // }

    initialDataLoader();


    //console.log(someStore.data.data, 'just checking');
    // console.log(someStore.data.baseCurrency)

  }, [])

  const initialDataLoader = async () => {

    await someStore.fetchingDataByCurrency();
    await someStore.fetchingDataByHistory('PLN', '2021-11-13', '2021-11-14');

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