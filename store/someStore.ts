import { action, makeAutoObservable } from "mobx";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class SomeStore {
    isEverythingFetching: boolean = false;
    todayData: any = [];
    yesterdayData: any = [];
    dataToDisplay: any = [];
    observatedCurrency: any = [];
    observatedKeys: any = [];
    fetchedData: any = [];
    allInfoData: any = [];

    flatListReload: boolean = false;
    notificationReload: boolean = false;

    fetchingInBackgroundData: any = [];

    constructor() {
        makeAutoObservable(this)
    }

    async toggleObservatedCurrency(currentId: string) {
        // let keys = [];
        // keys = await AsyncStorage.getAllKeys();
        // try {
        //     if (currentId === this.observatedKeys.find((item: any) => item === currentId)) {
        //         await AsyncStorage.removeItem(currentId);
        //     } else {
        //         await AsyncStorage.setItem(currentId, 'id')
        //     }
        // } catch (e) {
        //     console.log('error', e)
        // }
        // keys = await AsyncStorage.getAllKeys();
        // this.changeKeys(keys);
        this.refreshingData();

        const jsonValue = await AsyncStorage.getItem('@tracked');
        const a = (jsonValue != null ? JSON.parse(jsonValue) : null);
        //a will have to be from mobx - to let know useEffect in depedency that it has to make an action
        try {
            if (a !== null) {
                const existingIndex = a.findIndex((item: any) => item === currentId);
                //console.log(existingIndex, 'existingIndex', a, 'a')

                if (existingIndex >= 0) {
                    a.splice(existingIndex, 1);
                    const c = JSON.stringify(a);
                    await AsyncStorage.setItem('@tracked', c);
                    //  console.log(a, 'b - existing')
                } else {
                    const b = [...a];
                    b.push(currentId);
                    const c = JSON.stringify(b);
                    await AsyncStorage.setItem('@tracked', c);
                    //  console.log(b, 'b - tableNOTnull')
                }
            } else {
                const b = [];
                b.push(currentId);
                const c = JSON.stringify(b);
                await AsyncStorage.setItem('@tracked', c);
                //  console.log(b, 'b - tableIsNull')
            }
        } catch (e) {
            Alert.alert("I am sorry, we cannot add this to your tracked list");
        }
        this.refreshingData();
    }

    changeKeys(newValue: any) {
        this.observatedKeys = newValue;
    }

    async updateObservatedCurrency() {
        try {
            const jsonValue = await AsyncStorage.getItem('@tracked');
            const keys = (jsonValue != null ? JSON.parse(jsonValue) : null);
            if (keys !== null) {
                // this.observatedCurrency = this.observatedKeys.map((currencyId: any) => this.dataToDisplay.find((item: any) => item.id === currencyId));
                const updatedValue = await keys.map((item: any) => this.dataToDisplay.find((otherItem: any) => otherItem.id === item));
                this.updateObservatedCurrencyArray(updatedValue);
            }
        } catch (e) {
            Alert.alert("I am so sorry, there was a problem with updating your Tracked Currencies");
        }
    }

    updateObservatedCurrencyArray(newValue: any) {
        this.observatedCurrency = newValue;
    }

    reloadFlatList() {
        this.flatListReload = !this.flatListReload;
    }

    async fetchInBackground() {
        const axios = require('axios').default;
        try {
            const response = await axios.get(`https://freecurrencyapi.net/api/v2/latest?apikey=YOUR-APIKEY&base_currency=PLN`);
            console.log(response.data.data);
            // this.fetchingInBackgroundData = response.data.data;
            return response.data.data;
        } catch (err) {
            console.log(err);
        }
    }

    async fetchingDataOfTenLastDays(currency: string, dateFrom: string, dateTo: string) {
        //await AsyncStorage.clear() //for now

        const axios = require('axios').default;
        let keys = [];
        keys = await AsyncStorage.getAllKeys();
        this.changeKeys(keys);
        this.reloadFlatList()
        this.fetchedData.length = 0;
        this.todayData.length = 0;
        this.yesterdayData.length = 0;
        this.dataToDisplay.length = 0;
        this.allInfoData.length = 0;
        try {
            const response = await axios.get(`https://freecurrencyapi.net/api/v2/historical?apikey=fe01c280-43d8-11ec-b6f7-0bd38475eeb3&base_currency=${currency}&date_from=${dateFrom}&date_to=${dateTo}`);
            for (const [date, value] of Object.entries(response.data.data)) {
                this.fetchedData.push({ date, value })
            }
            this.allInfoData = { data: this.fetchedData, baseCurrency: response.data.query.base_currency }

            for (const [id, value] of Object.entries(this.allInfoData.data[9].value)) {  //9 is today (last date)
                this.todayData.push({ id: id, value: value })
            }
            for (const [id, value] of Object.entries(this.allInfoData.data[8].value)) {  //8 is yestarday (if this is looking at 10 days back ofc)
                this.yesterdayData.push({ id: id, value: value })
            }
            this.yesterdayData.sort((a: any, b: any) => {
                if (a.id < b.id) return -1;
                return a.id > b.id ? 1 : 0;
            }),
                this.todayData.sort((a: any, b: any) => {
                    if (a.id < b.id) return -1;
                    return a.id > b.id ? 1 : 0;
                })
            for (let i: number = 0; i <= this.yesterdayData.length - 1; i++) {
                this.dataToDisplay.push({ id: this.todayData[i].id, value: this.todayData[i].value, change: (((this.todayData[i].value - this.yesterdayData[i].value) * 2) / (this.todayData[i].value + this.yesterdayData[i].value)).toFixed(9) });
            }

        } catch (e) {
            Alert.alert("I am so sorry, data of last days couldn't be fetched");
        }
        this.reloadFlatList();
        this.updateObservatedCurrency();

    }

    refreshingData() {
        this.isEverythingFetching = !this.isEverythingFetching;
    }

    changingDataForLastDays(currencyId: string) {
        const historicalDataTotal: any = [];

        this.allInfoData.data.every((item: any) => historicalDataTotal.push(item.value[currencyId]));
        return historicalDataTotal;
    }

    async makingNewPickNotifications(currentId: string, value: number) {
        this.reloadNotificationAction();
        const jsonValue = await AsyncStorage.getItem('@Notifications');
        const a = (jsonValue != null ? JSON.parse(jsonValue) : null);
        //a will have to be from mobx - to let know useEffect in depedency that it has to make an action
        try {
            if (a !== null) {
                const existingIndex = a.findIndex((item: any) => item.id === currentId);

                if (existingIndex >= 0) {
                    const lowInstances = a.find((item: any) => item.id === currentId);
                    const drop = lowInstances.drop;
                    a.splice(existingIndex, 1);
                    a.push({ id: currentId, pick: value, drop: drop });
                    const c = JSON.stringify(a);
                    await AsyncStorage.setItem('@Notifications', c)
                } else {
                    a.push({ id: currentId, pick: value, drop: null });
                    const c = JSON.stringify(a);
                    await AsyncStorage.setItem('@Notifications', c)
                }
            } else {
                let b = [];
                b.push({ id: currentId, pick: value, drop: null })
                const c = JSON.stringify(b);
                await AsyncStorage.setItem('@Notifications', c)
            }
        } catch (e) {
            Alert.alert("I am sorry, occured a problem with setting notifications");
        }
        this.reloadNotificationAction();
    }

    async makingNewDropNotifications(currentId: string, value: number) {
        this.reloadNotificationAction();
        const jsonValue = await AsyncStorage.getItem('@Notifications');
        const a = (jsonValue != null ? JSON.parse(jsonValue) : null);
        //a will have to be from mobx - to let know useEffect in depedency that it has to make an action
        try {
            if (a !== null) {
                const existingIndex = a.findIndex((item: any) => item.id === currentId);

                if (existingIndex >= 0) {
                    const lowInstances = a.find((item: any) => item.id === currentId);
                    const pick = lowInstances.pick;
                    a.splice(existingIndex, 1);
                    a.push({ id: currentId, pick: pick, drop: value });
                    const c = JSON.stringify(a);
                    await AsyncStorage.setItem('@Notifications', c)
                } else {
                    a.push({ id: currentId, pick: null, drop: value });
                    const c = JSON.stringify(a);
                    await AsyncStorage.setItem('@Notifications', c)
                }
            } else {
                let b = [];
                b.push({ id: currentId, pick: null, drop: value })
                const c = JSON.stringify(b);
                await AsyncStorage.setItem('@Notifications', c)
            }
        } catch (e) {
            Alert.alert("I am sorry, occured a problem with setting notifications");
        }
        this.reloadNotificationAction();
    }

    reloadNotificationAction() {
        this.notificationReload = !this.notificationReload;
    }

    async clearNotifications() {
        this.reloadNotificationAction();
        try {
            await AsyncStorage.removeItem('@Notifications');
        } catch (e) {
            Alert.alert('Something went wrong while clearing Notifications')
        }
        this.reloadNotificationAction();
    }

    sortPrice: boolean = false;
    sortCurrency: boolean = true;
    sortChange: boolean = false;

    sortByPrice() {
        this.reloadFlatList();
        this.sortCurrency = false;
        this.sortChange = false;
        if (this.sortPrice) {
            this.dataToDisplay.sort(function (a: any, b: any) { return b.value - a.value })
            this.sortPrice = false;
        } else {
            this.dataToDisplay.sort(function (a: any, b: any) { return a.value - b.value })
            this.sortPrice = true;
        }
        this.reloadFlatList();
    }

     sortByCurrency = () => {
        this.reloadFlatList();
        this.sortPrice = false;
        this.sortChange = false;
        if (this.sortCurrency) {
          this.dataToDisplay.sort((a: any, b: any) => {
            if (a.id < b.id) return -1;
            return a.id > b.id ? 1 : 0;
          });
          this.sortCurrency = false;
        } else {
          this.dataToDisplay.sort((a: any, b: any) => {
            if (a.id > b.id) return -1;
            return a.id < b.id ? 1 : 0;
          });
          this.sortCurrency = true;
        }
        this.reloadFlatList();
      }

       sortByChange = () => {
        this.reloadFlatList();
        this.sortPrice = false;
        this.sortCurrency = false;
        if (this.sortChange) {
          this.dataToDisplay.sort(function (a: any, b: any) { return b.change - a.change })
         this.sortChange = false;
        } else {
          this.dataToDisplay.sort(function (a: any, b: any) { return a.change - b.change })
          this.sortChange = true;
        }
        this.reloadFlatList();
      }
}