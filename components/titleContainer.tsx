import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { mainColor } from '../constants/Colors';
import TitleToSortBy from './TitleToSortBy';

const TitleContainer = (props: any) => {
    return (
        <View style={styles.container}>
            <TitleToSortBy
               // sortBy={sortByCurrency}
                title='Currency'
                icon='sort'
            />
            <TitleToSortBy
                //sortBy={sortByPrice}
                title='Price'
                icon='sort'
            />
            <TitleToSortBy
                //sortBy={sortByChange}
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
        marginVertical: 5,
        borderWidth: 2,
        borderColor: mainColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'black',
    }
})

export default TitleContainer;