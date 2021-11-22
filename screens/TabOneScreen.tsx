import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import CurrencyItemOnMain from '../components/CurrencyItemOnMain';

import { useStore } from '../store/store';
import { observer } from 'mobx-react-lite';
import { getDate } from '../components/getDate';
import TitleContainer from '../components/titleContainer';
import { mainScreenColor } from '../constants/Colors';

const TabOneScreen = (props: any) => {
  const { mainDataStore } = useStore();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (!isDataLoaded) {
      dataLoader();
    }
  }, [isDataLoaded])

 useEffect(() => {
   if (!mainDataStore.isEverythingFetching){
    mainDataStore.updateObservatedCurrency();
   }   
 }, [mainDataStore.isEverythingFetching, mainDataStore.updateObservatedCurrencyArray])
  
const dataLoader = async () =>{
  try {
    await mainDataStore.fetchingDataOfTenLastDays('PLN', getDate(9), getDate(0));
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
          <View style={{backgroundColor: mainScreenColor }}>
            <FlatList
            onRefresh={() => {setIsDataLoaded(false);}}
            refreshing={!isDataLoaded}
              extraData={mainDataStore.flatListReload}
              style={{ backgroundColor: mainScreenColor, marginBottom: 45 }}
              contentContainerStyle={{alignItems: 'center', backgroundColor: mainScreenColor}}
              data={mainDataStore.dataToDisplay}
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