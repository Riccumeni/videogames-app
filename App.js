import {StyleSheet} from 'react-native';
import {colors} from "./assets/colors";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from "react";
import {FontAwesome} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";
import {HomeNavigator} from './navigators/HomeNavigator'
import SearchNavigator from "./navigators/SearchNavigator";
import FavouriteNavigator from "./navigators/FavouriteNavigator";
import {SettingsNavigator} from "./navigators/SettingsNavigator";

const Tab = createBottomTabNavigator();

export default function App() {
  global.platformChanged = true;
  // TODO: REMOVE ASYNCSTORAGE.CLEAR()
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.primary,
          shadowOpacity: 0,
          borderTopWidth: 0,
          padding: 10
        }
      }}>
        <Tab.Screen name="HomeNavigator" component={HomeNavigator} options={
          {
            title: 'Home',
            tabBarActiveTintColor: 'white',
            headerShown: false,
            tabBarIcon: ({focused}) => {return <FontAwesome  name="home" size={24} color={'white'} style={{alignSelf: "center", opacity: focused ? 1 : .5}}/>}
          }}/>
        <Tab.Screen name="SearchNavigator" component={SearchNavigator} options={{
          title: 'Search',
          headerShown: false,
          tabBarActiveTintColor: 'white',
          tabBarIcon: ({focused}) => {return <FontAwesome name="search" size={24} color="white" style={{alignSelf: "center", opacity: focused ? 1 : .5}}/>},
        }}/>
        <Tab.Screen name="FavouritesNavigator" component={FavouriteNavigator} options={{
          title: 'Favourites',
          headerShown: false,
          tabBarActiveTintColor: 'white',
          tabBarIcon: ({focused}) => {return <FontAwesome name="heart" size={24} color="white" style={{alignSelf: "center", opacity: focused ? 1 : .5}}/>}
        }}/>
        <Tab.Screen name="SettingsNavigator" component={SettingsNavigator} options={{
          title: 'Settings',
          headerShown: false,
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.primary,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          tabBarActiveTintColor: 'white',
          tabBarIcon: ({focused}) => {return <Ionicons name="settings" size={24} color="white" style={{alignSelf: "center", opacity: focused ? 1 : .5}}/>}
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
