import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { store, StoreContext, useStore } from './store/store';
// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { getDate } from './components/getDate';

// const BACKGROUND_FETCH_TASK = 'background-fetch'

// TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
//   const { someStore } = useStore();
//   try {
//     const receivedData = await fetch(`https://freecurrencyapi.net/api/v2/historical?apikey=fe01c280-43d8-11ec-b6f7-0bd38475eeb3&base_currency=${currency}&date_from=${dateFrom}&date_to=${dateTo}`)
//     console.log("myTask() ", receivedData);
//     return receivedData
//       ? BackgroundFetch.BackgroundFetchResult.NewData
//       : BackgroundFetch.BackgroundFetchResult.NoData
//   } catch (err) {
//     return BackgroundFetch.BackgroundFetchResult.Failed;
//   }
// });

export default function App() {

  // useEffect(() => {
  //   registerForPushNotification().then((token) => console.log(token)).catch((err) => console.log(err))
  // }, [])

  // async function registerForPushNotification() {
  //   const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //   if (status != 'granted') {
  //     const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //   }
  //   if (status != 'granted') {
  //     alert('Fail to get the push token');
  //     return;
  //   }
  //   const token = (await Notifications.getExpoPushTokenAsync()).data;
  //   return token;
  // }

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (

      <SafeAreaProvider>
        <StoreContext.Provider value={store}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </StoreContext.Provider>
      </SafeAreaProvider>
    );
  }
}
