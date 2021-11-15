import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, Pressable, Alert, FlatList, TextInput } from 'react-native';
import { useStore } from '../store/store';

const ModalScreen = (props: any) => {
  const { someStore } = useStore();
  const [selectedValue, setSelectedValue] = useState('');
  const ids = someStore.dataToDisplay.map((item: any) => item.id);
  const isEverythingAlright: boolean = ids.includes(selectedValue)

  const arrr = someStore.dataToDisplay.find((item: any) => item.id === 'AED')

  const checkForCurrency = () => {
    props.navigation.navigate('ParticularCurrency', {
      screen: 'ParticularCurrency',
      params: {
        currencyId: selectedValue,
        baseCurrency: someStore.data.baseCurrency,
        currentValue: arrr.value
      }
    })
  }

  return (
    // <Modal
    //   animationType="slide"
    //   transparent={true}
    //   visible={someStore.toggleModal} //someStore.toggleModal
    //   onRequestClose={() => {
    //     //Alert.alert("Modal has been closed.");
    //     //props.setModalVisibleNegative
    //   }}
    // >
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
              style={[styles.button, styles.buttonClose, { backgroundColor: '#D64933' }]}
              onPress={() => props.navigation.goBack()}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                checkForCurrency()
            }}>
              <Text style={styles.textStyle}>Search</Text>
            </Pressable>
          </View>
        </View>
      </View>
    // </Modal>
  );
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
    backgroundColor: "#6AB547",
    borderRadius: 20,
    padding: 35,
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
  buttonClose: {
    backgroundColor: "#58A4B0",
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
    color: 'red'
  }
});

export default ModalScreen;