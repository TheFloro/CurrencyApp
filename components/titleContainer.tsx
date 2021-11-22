import { observer } from 'mobx-react-lite';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { mainColor } from '../constants/Colors';
import { useStore } from '../store/store';
import TitleToSortBy from './TitleToSortBy';

const TitleContainer = () => {
    const {mainDataStore} = useStore();
    return (
        <View style={styles.container}>
            <TitleToSortBy
                sortBy={() => mainDataStore.sortByCurrency()}
                title='Currency'
                icon='sort'
            />
            <TitleToSortBy
                sortBy={()=> mainDataStore.sortByPrice()}
                title='Price'
                icon='sort'
            />
            <TitleToSortBy
                sortBy={() => mainDataStore.sortByChange()}
                title='24H Change'
                icon='sort'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000',
    }
})

export default observer(TitleContainer);