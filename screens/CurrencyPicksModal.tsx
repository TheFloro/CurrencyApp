import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native';
import { mainColor } from '../constants/Colors';
import { useStore } from '../store/store';

const CurrencyPicksModal = (props: any) => {
  const { currencyId, currentValue } = props.route.params.params;
  const { mainDataStore } = useStore();

  const [selectedValue, setSelectedValue] = useState('');
  const isEverythingAlright: boolean = selectedValue > currentValue;

  const checkIfEverythingIsAlirght = () => {
    mainDataStore.makingNewPickNotifications(currencyId, Number(selectedValue));
    props.navigation.goBack();
  }

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Make your Pick Notification</Text>
        <TextInput
          style={styles.input}
          maxLength={10}
          keyboardType='default'
          autoCorrect={false}
          value={selectedValue}
          onChangeText={value => { setSelectedValue(value) }}
        />
        {!isEverythingAlright &&
          <Text style={styles.errorMessage}>Your Value must be greater then Current Value</Text>
        }
        <View style={{ flexDirection: 'row', width: 250, justifyContent: 'space-between' }}>
          <Pressable
            style={[styles.button, styles.buttonEnabled, { backgroundColor: '#D64933' }]}
            onPress={() => props.navigation.goBack()}
          >
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
          <Pressable
            disabled={!isEverythingAlright}
            style={isEverythingAlright ? [styles.button, styles.buttonEnabled] : [styles.button, styles.buttonDissabled]}
            onPress={checkIfEverythingIsAlirght}
          >
            <Text style={styles.textStyle}>Search</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "#d2ffcc", //313d5a //344966 //supiicolor #2b4162
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
    borderWidth: 1.5,
    borderColor: mainColor,
    width: '85%'
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
    color: mainColor
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
});

export default CurrencyPicksModal;