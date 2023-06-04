import { StatusBar } from 'expo-status-bar';
import {Platform, SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import {colors} from "./assets/colors";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios, {head} from "axios";
import {HomeScreen} from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import React, {useEffect} from "react";
import Header from "./components/Header";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{header: Header}}>
        <Tab.Screen name="Home" component={HomeScreen} options={
          {
            title: "",
            headerStyle: {backgroundColor: "white"},
          }}/>
        <Tab.Screen name="Search" component={GameScreen} />
        <Tab.Screen name="Favorites" component={HomeScreen} />
        <Tab.Screen name="Settings" component={HomeScreen} />
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
