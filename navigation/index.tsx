import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, View } from 'react-native';

import { mainColor } from '../constants/Colors';
import CurrencyDropsModal from '../screens/CurrencyDropsModal';
import CurrencyPicksModal from '../screens/CurrencyPicksModal';
import ModalScreen from '../screens/ModalScreen';
import ParticularCurrency from '../screens/ParticularCurrency';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation(){
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="ParticularCurrency"
        component={ParticularCurrency}
        options={({ navigation, route }: RootTabScreenProps<'ParticularCurrency'>) => ({
        headerBackVisible: false,
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontSize: 25 },
        headerStyle: {
          backgroundColor: mainColor
        },
        title: 'More Info',
        headerLeft: () => (
          <Pressable
            onPress={() => { navigation.goBack()}}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
              width: 50,
              alignItems: 'center'
            })}>
            <FontAwesome
              name="angle-left"
              size={25}
              color='white'
              style={{}}
            />
          </Pressable>
        )
      })} 
      />
      <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CurrencyPicksModal" component={CurrencyPicksModal} options={{ headerShown: false }} />
        <Stack.Screen name="CurrencyDropsModal" component={CurrencyDropsModal} options={{ headerShown: false }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#bbab8b',
        tabBarActiveBackgroundColor: '#d2ffcc',
        tabBarInactiveBackgroundColor: mainColor,
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontSize: 25 },
        headerStyle: { backgroundColor: mainColor}
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Currency Value',
          tabBarIcon: ({ color }) => <TabBarIcon name="meetup" color={'green'} />,
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <Pressable
                onPress={() => { navigation.navigate('Modal') }}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                  marginRight: 15,
                  width: 60,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center'
                })}>
                <FontAwesome
                  name="search"
                  size={25}
                  color='white'
                />
              </Pressable>
            </View>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Keep Track',
          tabBarIcon: ({ focused }) => <TabBarIcon name="eye" color={focused? '#ffed66' : 'lightgrey'}/>
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
