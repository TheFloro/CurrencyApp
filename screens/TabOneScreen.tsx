import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import CurrencyItemOnMain from '../components/CurrencyItemOnMain';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useStore } from '../store/store';
import TitleToSortBy from '../components/TitleToSortBy';
import { observer } from 'mobx-react-lite';
import { getDate } from '../components/getDate';
import TitleContainer from '../components/titleContainer';
import { mainScreenColor } from '../constants/Colors';

const TabOneScreen = (props: any, navigation: RootTabScreenProps<'TabOne'>) => {

  const { someStore } = useStore();

  const [sortCurrency, setSortCurrency] = useState(true);
  const [sortPrice, setSortPrice] = useState(true);
  const [sortChange, setSortChange] = useState(true);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (!isDataLoaded) {
      dataLoader();
    }
    //someStore.fetchInBackground();
  }, [])

 useEffect(() => {
   if (!someStore.isEverythingFetching){
     someStore.updateObservatedCurrency();
   }   
 }, [someStore.isEverythingFetching, someStore.updateObservatedCurrencyArray])
  
const dataLoader = async () =>{
  try {
    await someStore.fetchingDataOfTenLastDays('PLN', getDate(9), getDate(0));
    setIsDataLoaded(true);
  } catch (e) {
    console.log(e, 'error in dataLoader');
  }
}

 

  return (
    <>
      <View style={styles.titlesContainer}>
        <TitleContainer />
      </View>
      <View style={styles.container}>
        {/* {isLoading ? <Text>Loading...</Text> :  */}
          <View style={{ marginBottom: 30, backgroundColor: mainScreenColor }}>
            <FlatList
              extraData={someStore.flatListReload}
              style={{ backgroundColor: mainScreenColor, marginBottom: 30 }}
              contentContainerStyle={{alignItems: 'center'}}
              data={someStore.dataToDisplay}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => (
                <CurrencyItemOnMain
                  navigation={props.navigation}
                  id={item.id}
                  baseCurrency={someStore.allInfoData.baseCurrency}
                  value={item.value}
                  change={item.change}
                  positive={item.change > 0 ? true : false}
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
  },
  titlesContainer: {
    flexDirection: 'row',
    backgroundColor: mainScreenColor, //#ffa62b
    width: '100%'
  },
});

export default observer(TabOneScreen);