import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
  const { mainDataStore } = useStore();
  const BACKGROUND_FETCH_TASK = 'background-fetch';
  const [isRegistered, setIsRegistered] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<BackgroundFetch.BackgroundFetchStatus | null>(null);

  TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    try {
      const receivedData = await mainDataStore.fetchInBackground();
      if (receivedData !== undefined) {
        checkingForNotifications(receivedData);
      }
      return receivedData
        ? BackgroundFetch.BackgroundFetchResult.NewData
        : BackgroundFetch.BackgroundFetchResult.NoData
    } catch (err) {
      console.log('Error trying to fetch in background)', err)
    }
  });

  const checkingForNotifications = async (downloadedData: any) => {
    const jsonValue = await AsyncStorage.getItem('@Notifications');
    const notifications = (jsonValue != null ? JSON.parse(jsonValue) : null);
    notifications.forEach((item: any) => {
      if (item.drop !== null) {
        if (downloadedData[item.id] <= item.drop) {
          makeNotification(item.id, 'dropped', item.drop);
        }
      }
      if (item.pick !== null) {
        if (downloadedData[item.id] >= item.pick) {
          makeNotification(item.id, 'picked', item.pick);
        }
      }
    })
  }

  const makeNotification = (titleCurrency: string, changedTo: string, certainValue: number) => {
    const content = { title: 'Your Currency just ' + changedTo, body: titleCurrency + ' just ' + changedTo + ' to ' + certainValue };
    Notifications.scheduleNotificationAsync({ content, trigger: null });
  }

  useEffect(() => {
    checkStatusAsync();
  }, [])

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    setStatus(status);
    setIsRegistered(isRegistered);
    if (isRegistered) {
     TaskManager.unregisterAllTasksAsync();
     await registerBackgroundFetchAsync();
    }
     await registerBackgroundFetchAsync();
  };

  async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 1,
      stopOnTerminate: false,
      startOnBoot: false,
    });
  };

  return (

    <SafeAreaProvider>
      <StoreContext.Provider value={store}>
        <Navigation />
      </StoreContext.Provider>
    </SafeAreaProvider>
  );
}
)
