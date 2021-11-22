import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface TitleToSortByProps{
    sortBy: any;
    title: string;
    icon: any;
}

const TitleToSortBy = ({sortBy, title, icon}: TitleToSortByProps) => {
    return (
        <View>
            <Pressable
                onPress={sortBy}
                style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                    flexDirection: 'row',
                    alignItems: 'center'
                })}>
                <Text style={styles.title}>{title}</Text>
                <FontAwesome
                    name={icon}
                    size={15}
                    color='grey'
                    style={{marginRight: 8}}
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        marginHorizontal: 5,
        color: 'white'
    }
});

export default TitleToSortBy;