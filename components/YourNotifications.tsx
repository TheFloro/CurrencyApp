import AsyncStorage from '@react-native-async-storage/async-storage';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { mainScreenColor } from '../constants/Colors';
import { useStore } from '../store/store';
import YourNotificationItem from './YourNotificationItem';

const YourNotifications = (props: any) => {
    const { someStore } = useStore();
    // const [notification, setNotification] = useState<any>([]);

    // const getNotification = async () => {
    //     const jsonValue = await AsyncStorage.getItem('@Notifications');
    //     const a = (jsonValue != null ? JSON.parse(jsonValue) : null);
    //     setNotification(a);
    // }

    useEffect(() => {
        someStore.getNotification();
    }, [someStore.makingNewPickNotifications, someStore.makingNewDropNotifications, someStore.notificationReload, someStore.reloadNotificationAction])

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Your Notifications</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.titleText}>Currency</Text>
                    <Text style={styles.titleText}>Pick</Text>
                    <Text style={styles.titleText}>Drop</Text>
                </View>
            </View>
            <View style={styles.notifications}>
                <FlatList
                extraData={someStore.notification}
                    data={someStore.notification}
                    keyExtractor={({ id }) => id}
                    renderItem={({ item }) => (
                        <YourNotificationItem
                            id={item.id}
                            pick={item.pick}
                            drop={item.drop}
                            baseCurrency={someStore.allInfoData.baseCurrency}
                        />
                    )}
                />
                <Button title='Clear your Notification' onPress={() => someStore.clearNotifications()} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    titleContainer: {
        backgroundColor: '#000',
        padding: 10
    },
    titleText: {
        color: '#FFF',
        fontSize: 22,
        textAlign: 'center'
    },
    notifications: {
    }
})

export default observer(YourNotifications);