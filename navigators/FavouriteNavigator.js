import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from "../assets/colors";
import GameScreen from "../screens/GameScreen";
import {Favourite} from "../components/Favourite";
import {FavouritesScreen} from "../screens/FavouritesScreen";
import AddCommentScreen from "../screens/AddCommentScreen";

const Stack = createNativeStackNavigator();

export const FavouriteNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Favourite"
                component={FavouritesScreen}
                options={{
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: "#0F1823F9",
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
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
            <Stack.Screen name="Add Comment" component={AddCommentScreen}
                          options={{
                              headerShown: true,
                              headerTintColor: 'white',
                              headerStyle: {
                                  backgroundColor: colors.primary,
                                  shadowOpacity: 0,
                                  borderBottomWidth: 0,
                              },
                          }}
            />
        </Stack.Navigator>

    );
};

export default FavouriteNavigator;
