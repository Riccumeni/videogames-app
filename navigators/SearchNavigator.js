import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from "../assets/colors";
import GameScreen from "../screens/GameScreen";
import {Favourite} from "../components/Favourite";
import SearchScreen from "../screens/SearchScreen";

const Stack = createNativeStackNavigator();

export const SearchNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: colors.background,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                        opacity: .95,
                    },
                }}
            />
            <Stack.Screen name="Game" component={GameScreen} options={{
                headerTitle : "",
                headerShown: false,
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

export default SearchNavigator;