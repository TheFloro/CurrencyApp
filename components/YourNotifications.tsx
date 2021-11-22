import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { secondScreenColor } from '../constants/Colors';
import { useStore } from '../store/store';
import TitleForTabTwo from './TitleForTabTwo';
import YourNotificationItem from './YourNotificationItem';

const YourNotifications = () => {
    const { mainDataStore } = useStore();
    const isNotificationListEmpty: boolean = mainDataStore.notification !== null;

    useEffect(() => {
        mainDataStore.getNotification();
        console.log(mainDataStore.notification !== null)
    }, [mainDataStore.makingNewPickNotifications, mainDataStore.makingNewDropNotifications, mainDataStore.notificationReload, mainDataStore.reloadNotificationAction])

    return (

        <View style={{ height: '50%' }}>
            {!isNotificationListEmpty ?
                <View style={styles.ifEmptyContainer}>
                    <Text style={styles.textIfEmpty}>You haven't added anything to your Notification list</Text>
                </View>
                :
                <>
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
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.notficationButton} onPress={() => mainDataStore.clearNotifications()}>
                            <Text style={styles.notificationText}>Clear all your Notifications</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }
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
    },
    ifEmptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: secondScreenColor
      },
      textIfEmpty: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'sans-serif-light'
      }
})

export default observer(YourNotifications);