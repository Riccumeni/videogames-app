import { StatusBar } from 'expo-status-bar';
import {Platform, SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import {colors} from "./assets/colors";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios, {head} from "axios";
import {HomeScreen} from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import {FontAwesome} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";
import {Favourite} from "./components/Favourite";
import {HomeNavigator} from './navigators/HomeNavigator'
import {FavouritesScreen} from "./screens/FavouritesScreen";
import SearchScreen from "./screens/SearchScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.background,
          shadowOpacity: 0,
          borderTopWidth: 0,
          opacity: .95,
          padding: 10
        }
      }}>
        <Tab.Screen name="Home" component={HomeNavigator} options={
          {
            tabBarActiveTintColor: 'white',
            headerShown: false,
            tabBarIcon: ({focused}) => {return <FontAwesome  name="home" size={24} color={'white'} style={{alignSelf: "center", opacity: focused ? 1 : .5}}/>}
          }}/>
        <Tab.Screen name="Search" component={SearchScreen} options={{
          headerTitleStyle: {color: 'white'},
          tabBarActiveTintColor: 'white',
          headerStyle: {
            opacity: .95,
            backgroundColor: colors.background,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          tabBarIcon: ({focused}) => {return <FontAwesome name="search" size={24} color="white" style={{alignSelf: "center", opacity: focused ? 1 : .5}}/>},
        }}/>
        <Tab.Screen name="Favourites" component={FavouritesScreen} options={{
          tabBarActiveTintColor: 'white',
          tabBarIcon: ({focused}) => {return <FontAwesome name="heart" size={24} color="white" style={{alignSelf: "center", opacity: focused ? 1 : .5}}/>}
        }}/>
        <Tab.Screen name="Settings" component={HomeScreen} options={{
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
