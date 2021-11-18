/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ColorSchemeName, Pressable, View } from 'react-native';

import Colors, { mainColor } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ChangeBaseCurrencyScreen from '../screens/ChangeBaseCurrencyScreen';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ParticularCurrency from '../screens/ParticularCurrency';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { useStore } from '../store/store';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [color, setColor] = useState(false);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
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
            onPress={() => { navigation.navigate('TabOne')}}
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
        <Stack.Screen name="ChangeCurrency" component={ChangeBaseCurrencyScreen} options={{ headerShown: false }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const { someStore } = useStore();
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#bbab8b',
        tabBarActiveBackgroundColor: '#96e072',
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
              {/* <Pressable
                onPress={() => { navigation.navigate('ChangeCurrency')}}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                <FontAwesome
                  name="exchange"
                  size={25}
                  color='white'
                  style={{ marginRight: 25 }}
                />
              </Pressable> */}
              <Pressable
                onPress={() => { navigation.navigate('Modal') }}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                <FontAwesome
                  name="search"
                  size={25}
                  color='white'
                  style={{ marginRight: 15 }}
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
          tabBarIcon: ({ focused, color }) => <TabBarIcon name="eye" color={focused? '#ffed66' : 'lightgrey'}/>  //if it will be active make it green
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
