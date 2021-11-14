import { action, makeObservable, observable } from "mobx";

export default class SomeStore {
    title = 'HEYO';
    constructor() {
        makeObservable(this, {
            fetchingDataByCurrency: action,
            fetchingDataByCurrencyOfChoice: action,
            fetchingHistoryData: action,
            title: observable
        })
    }

    fetchingDataByCurrency = () => {
        // return async () => {
        //     try{
        //         const response = await fetch('https://freecurrencyapi.net/api/v2/latest?apikey=fe01c280-43d8-11ec-b6f7-0bd38475eeb3&base_currency=PLN'
        //         );
        //         if (!response.ok){
        //             throw new Error('Something went wrong');
        //         }
        //         const resData = await response.json();
        //         console.log(resData);
        //         return resData;
        //     } catch (err) {
        //         throw err;
        //     }
            fetch('https://freecurrencyapi.net/api/v2/latest?apikey=fe01c280-43d8-11ec-b6f7-0bd38475eeb3&base_currency=PLN')
                .then((response) => response.json())
                .then(json => {
                    //console.log('dzialczy', {value: json.data,baseCurrency: json.query.base_currency});
                    //return {value: json.data,baseCurrency: json.query.base_currency};
                    return json;
                })
                .catch((error) => console.error(error))
        //}
    }

    fetchingDataByCurrencyOfChoice = (currency: string) => {
        fetch(`https://freecurrencyapi.net/api/v2/latest?apikey=fe01c280-43d8-11ec-b6f7-0bd38475eeb3&base_currency=${currency}`)
            .then((response) => response.json())
            .then(json => {
                return json;
            })
            .catch((error) => console.error(error))
    }
    //date format: RRRR-MM-DD for example: 2020-10-01 - 2021-11-12
    fetchingHistoryData = (currency: string, dateFrom: string, dateTo: string) => {
        fetch(`https://freecurrencyapi.net/api/v2/historical?apikey=fe01c280-43d8-11ec-b6f7-0bd38475eeb3&base_currency=${currency}&date_from=${dateFrom}&date_to=${dateTo}`)
            .then((response) => response.json())
            .then(json => {
                return json;
            })
            .catch((error) => console.error(error))
    }
}