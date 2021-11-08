import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import OpenTicketsScreen from '../screens/OpenTicketsScreen';
import ResolvedTicketsScreen from '../screens/ResolvedTicketsScreen';
import SearchTicketsScreen from '../screens/SearchTicketsScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
    initialRouteName="TabOne"
    screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme].tint,
    }}>
      <Tab.Screen
        name="Open"
        component={OpenTicketsScreen}
        options={{
          title: 'Open',
          tabBarIcon: ({ color }) => <TabBarIcon name="move-to-inbox" color={color} />,
        }}
      />
      <Tab.Screen
        name="Resolved"
        component={ResolvedTicketsScreen}
        options={{
          title: 'Resolved',
          tabBarIcon: ({ color }) => <TabBarIcon name="check-box" color={color} />,
        }}
        />
      <Tab.Screen
        name="Search"
        component={SearchTicketsScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
        />
      </Tab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  return <MaterialIcons size={30} style={{ marginBottom: -3, marginRight: -3 }} {...props} />;
}
