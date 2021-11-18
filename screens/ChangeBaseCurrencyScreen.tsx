import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { getDate } from '../components/getDate';
import { useStore } from '../store/store';
import { observer } from 'mobx-react-lite';

const ChangeBaseCurrencyScreen = (props: any) => {
    const { someStore } = useStore();
    const [selectedValue, setSelectedValue] = useState('');
    const ids = someStore.dataToDisplay.map((item: any) => item.id);
    const isEverythingAlright: boolean = ids.includes(selectedValue)

    const submitButton = () => {
        someStore.fetchingDataOfTenLastDays(selectedValue, getDate(9), getDate(0));
        props.navigation.goBack();
    }

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Do you want to change Base Currency?</Text>
                <TextInput
                    style={styles.input}
                    maxLength={3}
                    autoCapitalize='characters'
                    autoCorrect={false}
                    value={selectedValue}
                    onChangeText={value => { setSelectedValue(value.toUpperCase()) }}
                />
                {!isEverythingAlright &&
                    <Text style={styles.errorMessage}>Please input existing Currency</Text>
                }
                <View style={{ flexDirection: 'row', width: 250, justifyContent: 'space-between' }}>
                    <Pressable
                        style={[styles.button, styles.buttonEnabled, { backgroundColor: '#D64933' }]}
                        onPress={() => props.navigation.goBack()}
                    >
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                    <Pressable
                        style={isEverythingAlright ? [styles.button, styles.buttonEnabled] : [styles.button, styles.buttonDissabled]}
                        disabled={!isEverythingAlright}
                        onPress={() => {submitButton()}}>
                        <Text style={styles.textStyle}>Change</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "#2b4162", //313d5a //344966
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 100,
    },
    buttonEnabled: {
        backgroundColor: "#58A4B0",
    },
    buttonDissabled: {
        backgroundColor: "lightgrey",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15
    },
    modalText: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: "center",
        color: 'white'
    },
    input: {
        width: 150,
        height: 50,
        backgroundColor: 'white',
        marginBottom: 10,
        textAlign: 'center'
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10
    }
})

export default ChangeBaseCurrencyScreen;