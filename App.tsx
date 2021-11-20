import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { store, StoreContext, useStore } from './store/store';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { getDate } from './components/getDate';
import { Button, Text, View } from 'react-native';

const BACKGROUND_FETCH_TASK = 'background-fetch'

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const {someStore} = useStore();
  try {
    const receivedData = await someStore.fetchInBackground();
    console.log("receivedData ", receivedData);
    getLocalNotification();
    return receivedData
      ? BackgroundFetch.BackgroundFetchResult.NewData
      : BackgroundFetch.BackgroundFetchResult.NoData
  } catch (err) {
    console.log(err)
  }
});

const makeNotification = (title: string, body: string) => {
  const content = { title: 'Your tracked currency reached certain value!', body: ''};

  Notifications.scheduleNotificationAsync({ content, trigger: null });
}

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 1, // 15 minutes 60*15
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

// const getPermission = async () => {
//   const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
//   if (status != 'granted'){
//     console.log("something")
//     const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
//   }
//   if (status != 'granted'){
//     alert('Fail to get the permission')
//     return;
//   }
//   return status;
// }

const content = { title: 'Test Notification', body: 'hey, you!' };

const getLocalNotification = async () => {
  //await getPermission();
  var now = new Date(Date.now() + (5 * 60 * 1000));
  console.log('5 minut w przody', now, new Date())
  Notifications.scheduleNotificationAsync({ content, trigger: null })
}

export default function App() {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [status, setStatus] = useState<BackgroundFetch.BackgroundFetchStatus | null>(null);

  useEffect(() => {
    toggleFetchTask();
    checkStatusAsync();
  }, [])

  const toggleFetchTask = async () => {
    await registerBackgroundFetchAsync();
    checkStatusAsync();
  };

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    setStatus(status);
    setIsRegistered(isRegistered);
  }

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
        </StoreContext.Provider>
      </SafeAreaProvider>
    );
  }
}
