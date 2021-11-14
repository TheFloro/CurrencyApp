import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const TitleToSortBy = (props: any) => {
    return (
        <View>
            <Pressable
                onPress={props.sortBy}
                style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                    flexDirection: 'row',
                    alignItems: 'center'
                })}>
                <Text style={styles.title}>{props.title}</Text>
                <FontAwesome
                    name={props.icon}
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
        backgroundColor: 'lightgreen',
        marginHorizontal: 5
    }
});

export default TitleToSortBy;