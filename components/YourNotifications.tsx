import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useStore } from '../store/store';
import TitleForTabTwo from './TitleForTabTwo';
import YourNotificationItem from './YourNotificationItem';

const YourNotifications = () => {
    const { mainDataStore } = useStore();

    useEffect(() => {
        mainDataStore.getNotification();
    }, [mainDataStore.makingNewPickNotifications, mainDataStore.makingNewDropNotifications, mainDataStore.notificationReload, mainDataStore.reloadNotificationAction])

    return (
        <View style={{height: '50%'}}>
            <TitleForTabTwo
                mainTitle='Your Notifications'
                first='Currency'
                second='Pick'
                third='Drop'
            />
                <FlatList
                    extraData={mainDataStore.notification}
                    data={mainDataStore.notification}
                    keyExtractor={({ id }) => id}
                    renderItem={({ item }) => (
                        <YourNotificationItem
                            id={item.id}
                            pick={item.pick}
                            drop={item.drop}
                            baseCurrency={mainDataStore.allInfoData.baseCurrency}
                        />
                    )}
                />
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={styles.notficationButton} onPress={() => mainDataStore.clearNotifications()}>
                    <Text style={styles.notificationText}>Clear all your Notifications</Text>
                </TouchableOpacity>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    notficationButton: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '50%',
        margin: 1
    },
    notificationText: {
        fontSize: 15,
        textAlign: 'center',
        color: 'gold'
    }
})

export default observer(YourNotifications);