import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, Pressable, Alert, FlatList, TextInput } from 'react-native';
import { mainColor } from '../constants/Colors';
import { useStore } from '../store/store';

const ModalScreen = (props: any) => {
  const { someStore } = useStore();
  const [selectedValue, setSelectedValue] = useState('');
  const ids = someStore.dataToDisplay.map((item: any) => item.id);
  const isEverythingAlright: boolean = ids.includes(selectedValue)

  const arrr = someStore.dataToDisplay.find((item: any) => item.id === selectedValue)

  const checkForCurrency = () => {
    props.navigation.navigate('ParticularCurrency', {
      screen: 'ParticularCurrency',
      params: {
        currencyId: selectedValue,
        baseCurrency: someStore.allInfoData.baseCurrency,
        currentValue: arrr.value
      }
    })
  }

  return (
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Are you looking for a certain currency?</Text>
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
              onPress={() => {
                checkForCurrency()
            }}>
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
    backgroundColor: 'rgba(255,255,255,0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "lightgreen", //313d5a //344966 //supiicolor #2b4162
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
    elevation: 100,
    borderWidth: 1.5,
    borderColor: mainColor
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
  buttonDissabled:{
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

export default ModalScreen;