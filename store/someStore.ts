import { makeAutoObservable } from "mobx";
import { Alert } from "react-native";

export default class SomeStore {
    data: any = []; //it hold baseCurrency as key also
    historyData: any = []
    twoDayCurrencies: any = [];
    todayData: any = [];
    yesterdayData: any = [];
    dataToDisplay: any = [];

    // toggleModal: boolean = false;

    // changeToggleModal(){
    //     this.toggleModal ? this.toggleModal = false : this.toggleModal = true;
    // }
    
    tenlastDaysData: any = [];

    constructor() {
        makeAutoObservable(this)
    }

    async fetchingDataByCurrency() {
        try {
            await fetch('https://freecurrencyapi.net/api/v2/latest?apikey=fe01c280-43d8-11ec-b6f7-0bd38475eeb3&base_currency=PLN')
                .then((response) => response.json())
                .then((json) => this.data = { data: json.data, baseCurrency: json.query.base_currency })
            //console.log(this.data, 'this.data in someStore')
        } catch (e) {
            Alert.alert("I am so sorry, data of currency couldn't be fetched");
        }
    }

    async fetchingDataByYesterday(currency: string, dateFrom: string, dateTo: string) {
        try {
            await fetch(`https://freecurrencyapi.net/api/v2/historical?apikey=fe01c280-43d8-11ec-b6f7-0bd38475eeb3&base_currency=${currency}&date_from=${dateFrom}&date_to=${dateTo}`)
                .then((response) => response.json())
                .then(json => this.historyData = (json.data))
            //console.log(this.historyData, 'historyData')
        } catch (e) {
            Alert.alert("I am so sorry, data of yesterday couldn't be fetched");
        }
    }
    async fetchingDataOfTenLastDays(currency: string, dateFrom: string, dateTo: string) {
        try {
            await fetch(`https://freecurrencyapi.net/api/v2/historical?apikey=fe01c280-43d8-11ec-b6f7-0bd38475eeb3&base_currency=${currency}&date_from=${dateFrom}&date_to=${dateTo}`)
                .then((response) => response.json())
                .then(json => {
                    for (const [data, value] of Object.entries(json.data)) {
                        this.tenlastDaysData.push({ data, value })
                    }
                })
            //console.log(this.tenlastDaysData, 'tenLastDaysData')
        } catch (e) {
            Alert.alert("I am so sorry, data of last days couldn't be fetched");
        }
    }

    changingDataForLastDays(currencyId: string) {
        const historicalDataTotal: any = [];

        this.tenlastDaysData.every((item: any) => historicalDataTotal.push(item.value[currencyId]));
        return historicalDataTotal;
    }

    async todayDataCurrencies(object: any) {

        for (const [id, value] of Object.entries(object)) {
            this.todayData.push({ id: id, value: value })
        }
        //console.log(this.todayData, 'todayData - dataToRenderFunction')
    }

    async twoDayDataCurrencies(object: any) {

        for (const [data, value] of Object.entries(object)) {
            this.twoDayCurrencies.push([data, value])
        }
        //console.log(this.twoDayCurrencies, '2-days Currencies value')
    }

    async yesterdayDataCurrencies(object: any) {

        for (const [id, value] of Object.entries(object)) {
            this.yesterdayData.push({ id: id, value: value });
        }
        //console.log(yesterdayData, 'YesterdayData');
    }

    async dataToDisplayFunction() {
        const yesterdayForCalc: any = [...this.yesterdayData];
        const todayforCalc: any = [...this.todayData];
        yesterdayForCalc.sort((a: any, b: any) => {
            if (a.id < b.id) return -1;
            return a.id > b.id ? 1 : 0;
        }),
            todayforCalc.sort((a: any, b: any) => {
                if (a.id < b.id) return -1;
                return a.id > b.id ? 1 : 0;
            })

        for (let i: number = 0; i <= yesterdayForCalc.length - 1; i++) {
            this.dataToDisplay.push({ id: todayforCalc[i].id, value: todayforCalc[i].value, change: (((todayforCalc[i].value - yesterdayForCalc[i].value) * 2) / (todayforCalc[i].value + yesterdayForCalc[i].value)).toFixed(10) });
        }
        //console.log(this.dataToDisplay,'show me')
    }
}