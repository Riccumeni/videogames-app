import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from "../assets/colors";
import SettingsScreen from "../screens/SettingsScreen";
import PlatformsScreen from "../screens/PlatformsScreen";
import {Ionicons} from "@expo/vector-icons";


const Stack = createNativeStackNavigator();

export const SettingsNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    headerShown: true,
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: "#1D242E",
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                        opacity: .95,
                    },
                    tabBarIcon: ({focused}) => {return <Ionicons name="settings" size={24} color="white" style={{alignSelf: "center", opacity: focused ? 1 : .5}}/>}
                }}
            />
            <Stack.Screen
                name="Platforms"
                component={PlatformsScreen}
                options={{
                    headerShown: true,
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: "#1D242E",
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                        opacity: .95,
                    },
                    tabBarIcon: ({focused}) => {return <Ionicons name="settings" size={24} color="white" style={{alignSelf: "center", opacity: focused ? 1 : .5}}/>}
                }}
            />
        </Stack.Navigator>

    );
};

export default SettingsNavigator;