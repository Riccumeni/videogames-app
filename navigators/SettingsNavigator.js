import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from "../assets/colors";
import SettingsScreen from "../screens/SettingsScreen";
import PlatformsScreen from "../screens/PlatformsScreen";


const Stack = createNativeStackNavigator();

export const SettingsNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Platforms"
                component={PlatformsScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>

    );
};

export default SettingsNavigator;