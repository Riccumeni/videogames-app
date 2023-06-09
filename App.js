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
import {FontAwesome} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";

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
        <Tab.Screen name="Home" component={HomeScreen} options={
          {
            title: "Home",
            headerTitleStyle: {display: "none"},
            headerStyle: {
              backgroundColor: colors.background,
              shadowOpacity: 0,
              borderBottomWidth: 0,
              opacity: .95
            },
            tabBarIcon: () => {return <FontAwesome name="home" size={24} color="white" style={{alignSelf: "center"}}/>}
          }}/>
        <Tab.Screen name="Search" component={GameScreen} options={{
          headerTitleStyle: {color: 'white'},
          headerStyle: {
            opacity: .95,
            backgroundColor: colors.background,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          tabBarIcon: () => {return <FontAwesome name="search" size={24} color="white" style={{alignSelf: "center"}}/>},
          headerRight: () => ( <View style={{marginRight: 20, justifyContent: "center", width: 30, height: 30, backgroundColor: "#D2E4FF", opacity: .5, borderRadius: 15, alignSelf: "flex-end"}}>
            <FontAwesome name="heart" size={18} color="#001C37" style={{alignSelf: "center"}}/>
          </View>)
        }}/>
        <Tab.Screen name="Favorites" component={HomeScreen} options={{
          tabBarIcon: () => {return <FontAwesome name="heart" size={24} color="white" style={{alignSelf: "center"}}/>}
        }}/>
        <Tab.Screen name="Settings" component={HomeScreen} options={{
          tabBarIcon: () => {return <Ionicons name="settings" size={24} color="white" style={{alignSelf: "center"}}/>}
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
