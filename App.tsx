import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { store, StoreContext, useStore } from './store/store';
import * as Notifications from 'expo-notifications';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { observer } from 'mobx-react-lite';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

export default observer(function App() {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [status, setStatus] = useState<BackgroundFetch.BackgroundFetchStatus | null>(null);
  const { someStore } = useStore();
  const BACKGROUND_FETCH_TASK = 'background-fetch'

  TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    try {
      const receivedData = await someStore.fetchInBackground();
      checkingForNotifications(receivedData);
      return receivedData
        ? BackgroundFetch.BackgroundFetchResult.NewData
        : BackgroundFetch.BackgroundFetchResult.NoData
    } catch (err) {
      console.log('error in backgroundFetch)', err)
    }
  });

  const checkingForNotifications = async (downloadedData: any) => {
    const jsonValue = await AsyncStorage.getItem('@Notifications');
    const notifications = (jsonValue != null ? JSON.parse(jsonValue) : null);
    console.log('downloaded Data', downloadedData);
    notifications.forEach((item: any) => {
      if (downloadedData[item.id] <= item.drop) {
        makeNotification(item.id, 'dropped', item.drop);
        console.log('DROP Notification that certain currency just dropped to your value');
      } else if (downloadedData[item.id] >= item.pick) {
        makeNotification(item.id, 'picked', item.pick);
        console.log('PICK Notification that certain currency just reached your value');
      } else {
        console.log('NOTHING HAPPENDS');
      }
    })
  }

  const makeNotification = (titleCurrency: string, changedTo: string, certainValue: number) => {
    const content = { title: 'Your Currency just ' + changedTo, body: titleCurrency + ' just ' + changedTo + ' to ' + certainValue };

    Notifications.scheduleNotificationAsync({ content, trigger: null });
  }

  useEffect(() => {
    toggleFetchTask();
  }, [])

  const toggleFetchTask = async () => {
    await registerBackgroundFetchAsync();
  };

  async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 1, // 15 minutes 60*15
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  }

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (

      <SafeAreaProvider>
        <StoreContext.Provider value={store}>
          <Navigation colorScheme={colorScheme} />
        </StoreContext.Provider>
      </SafeAreaProvider>
    );
  }
})
