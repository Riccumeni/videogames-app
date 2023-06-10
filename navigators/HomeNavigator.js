import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from "../screens/HomeScreen";
import {ComingGamesScreen} from "../screens/ComingGamesScreen";
import {colors} from "../assets/colors";
import GameScreen from "../screens/GameScreen";
import {Favourite} from "../components/Favourite";

const Stack = createNativeStackNavigator();

export const HomeNavigator = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="Coming Games" component={ComingGamesScreen} options={{
                    headerTitle : "",
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: colors.background,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                        opacity: .95,
                    },
                }}/>
                <Stack.Screen name="Game" component={GameScreen} options={{
                    headerTitle : "",
                    headerRight: () => ( <Favourite />),
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: colors.background,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                        opacity: .95,
                    },
                }} />
            </Stack.Navigator>

    );
};

export default HomeNavigator;