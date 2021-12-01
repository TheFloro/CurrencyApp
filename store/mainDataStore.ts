import { makeAutoObservable } from "mobx";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class MainDataStore {
    isEverythingFetching: boolean = false;
    refreshing: boolean = false;
    notificationReload: boolean = false;
    sortPrice: boolean = false;
    sortCurrency: boolean = false;
    sortChange: boolean = false;
    todayData: any = [];
    yesterdayData: any = [];
    dataToDisplay: any = [];
    observatedCurrency: any = [];
    observatedKeys: any = [];
    fetchedData: any = [];
    allInfoData: any = [];
    fetchingInBackgroundData: any = [];
    notification: any = [];

    constructor() {
        makeAutoObservable(this)
    }

    *toggleObservatedCurrency(currentId: string): any {
        this.isEverythingFetching = true;

        const jsonValue = yield AsyncStorage.getItem('@tracked');
        const a = (jsonValue != null ? JSON.parse(jsonValue) : null);
        try {
            if (a !== null) {
                const existingIndex = a.findIndex((item: any) => item === currentId);

                if (existingIndex >= 0) {
                    a.splice(existingIndex, 1);
                    const c = JSON.stringify(a);
                    yield AsyncStorage.setItem('@tracked', c);
                } else {
                    const b = [...a];
                    b.push(currentId);
                    const c = JSON.stringify(b);
                    yield AsyncStorage.setItem('@tracked', c);
                }
            } else {
                const b = [];
                b.push(currentId);
                const c = JSON.stringify(b);
                yield AsyncStorage.setItem('@tracked', c);
            }
        } catch (e) {
            Alert.alert("I am sorry, we cannot add this to your tracked list");
        }
        this.isEverythingFetching = false;
    }

    *updateObservatedCurrency(): any {
        try {
            const jsonValue = yield AsyncStorage.getItem('@tracked');
            const keys = (jsonValue != null ? JSON.parse(jsonValue) : null);
            if (keys !== null) {
                const updatedValue = yield keys.map((item: any) => this.dataToDisplay.find((otherItem: any) => otherItem.id === item));
                this.observatedCurrency = updatedValue;
            }
        } catch (e) {
            Alert.alert("I am so sorry, there was a problem with updating your Tracked Currencies");
        }
    }

    *fetchInBackground(): any {
        const axios = require('axios').default;
        try {
            const response = yield axios.get(`https://freecurrencyapi.net/api/v2/latest?apikey=YOUR-APIKEY&base_currency=PLN`);
            return response.data.data;
        } catch (err) {
            console.log('Eroor while fetching in Background', err);
        }
    }

    *fetchingDataOfTenLastDays(currency: string, dateFrom: string, dateTo: string): any {
        const axios = require('axios').default;
        let keys = [];
        keys = yield AsyncStorage.getAllKeys();
        this.observatedKeys = keys;
        this.refreshing = true;
        this.fetchedData.length = 0;
        this.todayData.length = 0;
        this.yesterdayData.length = 0;
        this.dataToDisplay.length = 0;
        this.allInfoData.length = 0;
        try {
            const response = yield axios.get(`https://freecurrencyapi.net/api/v2/historical?apikey=fe01c280-43d8-11ec-b6f7-0bd38475eeb3&base_currency=${currency}&date_from=${dateFrom}&date_to=${dateTo}`);
            for (const [date, value] of Object.entries(response.data.data)) {
                this.fetchedData.push({ date, value })
            }
            this.allInfoData = { data: this.fetchedData, baseCurrency: response.data.query.base_currency }
            for (const [id, value] of Object.entries(this.allInfoData.data[9].value)) {
                this.todayData.push({ id: id, value: value })
            }
            for (const [id, value] of Object.entries(this.allInfoData.data[8].value)) {
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
        this.refreshing = false;
        this.updateObservatedCurrency();
    }

    changingDataForLastDays(currencyId: string) {
        const historicalDataTotal: any = [];

        this.allInfoData.data.every((item: any) => historicalDataTotal.push(item.value[currencyId]));
        return historicalDataTotal;
    }

    *makingNewPickNotifications(currentId: string, value: number): any {
        this.notificationReload = true;
        const jsonValue = yield AsyncStorage.getItem('@Notifications');
        const a = (jsonValue != null ? JSON.parse(jsonValue) : null);
        try {
            if (a !== null) {
                const existingIndex = a.findIndex((item: any) => item.id === currentId);

                if (existingIndex >= 0) {
                    const lowInstances = a.find((item: any) => item.id === currentId);
                    const drop = lowInstances.drop;
                    a.splice(existingIndex, 1);
                    a.push({ id: currentId, pick: value, drop: drop });
                    const c = JSON.stringify(a);
                    yield AsyncStorage.setItem('@Notifications', c)
                } else {
                    a.push({ id: currentId, pick: value, drop: null });
                    const c = JSON.stringify(a);
                    yield AsyncStorage.setItem('@Notifications', c)
                }
            } else {
                let b = [];
                b.push({ id: currentId, pick: value, drop: null })
                const c = JSON.stringify(b);
                yield AsyncStorage.setItem('@Notifications', c)
            }
        } catch (e) {
            Alert.alert("I am sorry, occured a problem with setting notifications");
        }
        this.notificationReload = false;
    }

    *makingNewDropNotifications(currentId: string, value: number): any {
        this.notificationReload = true;
        const jsonValue = yield AsyncStorage.getItem('@Notifications');
        const a = (jsonValue != null ? JSON.parse(jsonValue) : null);
        try {
            if (a !== null) {
                const existingIndex = a.findIndex((item: any) => item.id === currentId);

                if (existingIndex >= 0) {
                    const lowInstances = a.find((item: any) => item.id === currentId);
                    const pick = lowInstances.pick;
                    a.splice(existingIndex, 1);
                    a.push({ id: currentId, pick: pick, drop: value });
                    const c = JSON.stringify(a);
                    yield AsyncStorage.setItem('@Notifications', c)
                } else {
                    a.push({ id: currentId, pick: null, drop: value });
                    const c = JSON.stringify(a);
                    yield AsyncStorage.setItem('@Notifications', c)
                }
            } else {
                let b = [];
                b.push({ id: currentId, pick: null, drop: value })
                const c = JSON.stringify(b);
                yield AsyncStorage.setItem('@Notifications', c)
            }
        } catch (e) {
            Alert.alert("I am sorry, occured a problem with setting notifications");
        }
        this.notificationReload = false;
    }

    *clearNotifications() {
        this.notificationReload = true;
        try {
            yield AsyncStorage.removeItem('@Notifications');
        } catch (e) {
            Alert.alert('Something went wrong while clearing Notifications')
        }
        this.notificationReload = false;
    }

    *getNotification(): any {
        const jsonValue = yield AsyncStorage.getItem('@Notifications');
        const a = (jsonValue != null ? JSON.parse(jsonValue) : null);
        this.notification = a;
    }

    myValue: number = 0;

    changeValue(value: number) {
        if (value === this.myValue && value === 0) {
            this.myValue = 3;
        }
        else if (value === this.myValue && value === 1) {
            this.myValue = 4;
        }
        else if (value === this.myValue && value === 2) {
            this.myValue = 5;
        }
        else {
            this.myValue = value;
        }
    }

    computedValue() {
        if (this.myValue === 0) {
            return this.dataToDisplay.slice().sort((a: any, b: any) => {
                if (a.id < b.id) return -1;
                return a.id > b.id ? 1 : 0;
            });
        }
        if (this.myValue === 1) {
            return this.dataToDisplay.slice().sort((a: any, b: any) => { return b.value - a.value });
        }
        if (this.myValue === 2) {
            return this.dataToDisplay.slice().sort((a: any, b: any) => { return b.change - a.change });
        }
        if (this.myValue === 3) {
            return this.dataToDisplay.slice().sort((a: any, b: any) => {
                if (a.id > b.id) return -1;
                return a.id < b.id ? 1 : 0;
            });
        }
        if (this.myValue === 4) {
            return this.dataToDisplay.slice().sort((a: any, b: any) => { return a.value - b.value });
        }
        if (this.myValue === 5) {
            return this.dataToDisplay.slice().sort((a: any, b: any) => { return a.change - b.change });
        }
    }
}