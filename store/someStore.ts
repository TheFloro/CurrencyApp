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

    fetchingInBackgroundData: any = [];

    constructor() {
        makeAutoObservable(this)
    }

    async toggleObservatedCurrency(currentId: string) {
        let keys = [];
        keys = await AsyncStorage.getAllKeys();
        try {
            if (currentId === this.observatedKeys.find((item: any) => item === currentId)) {
                await AsyncStorage.removeItem(currentId);
            } else {
                await AsyncStorage.setItem(currentId, 'id')
            }
        } catch (e) {
            console.log('error', e)
        }
        keys = await AsyncStorage.getAllKeys();
        this.changeKeys(keys);
    }

    changeKeys(newValue: any) {
        this.observatedKeys = newValue;
    }

    async updateObservatedCurrency() {
        try {
            this.observatedCurrency = this.observatedKeys.map((currencyId: any) => this.dataToDisplay.find((item: any) => item.id === currencyId));
        } catch (e) {
            Alert.alert("I am so sorry, there was a problem with updating your Tracked Currencies")
        }
    }

    reloadFlatList() {
        this.flatListReload = !this.flatListReload;
    }

    async fetchInBackground() {
        const axios = require('axios').default;
        try {
            const response = await axios.get(`https://freecurrencyapi.net/api/v2/latest?apikey=YOUR-APIKEY&base_currency=PLN`);
            console.log(response.data.data);
            this.fetchingInBackgroundData = response.data.data;
        } catch (err) {
            console.log(err);
        }
    }

    async fetchingDataOfTenLastDays(currency: string, dateFrom: string, dateTo: string) {
        this.refreshingData();
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
        this.reloadFlatList()
        this.refreshingData();
    }

    refreshingData(){
        this.isEverythingFetching = !this.isEverythingFetching;
    }

    changingDataForLastDays(currencyId: string) {
        const historicalDataTotal: any = [];

        this.allInfoData.data.every((item: any) => historicalDataTotal.push(item.value[currencyId]));
        return historicalDataTotal;
    }
}