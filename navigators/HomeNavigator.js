import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from "../screens/HomeScreen";
import {ComingGamesScreen} from "../screens/ComingGamesScreen";
import {colors} from "../assets/colors";
import GameScreen from "../screens/GameScreen";
import {Favourite} from "../components/Favourite";
import AddCommentScreen from "../screens/AddCommentScreen";

const Stack = createNativeStackNavigator();

export const HomeNavigator = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
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
                <Stack.Screen name="Coming Games" component={ComingGamesScreen} options={{
                    headerTitle : "",
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: colors.primary,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                }}/>
                <Stack.Screen name="Game" component={GameScreen} options={{
                    headerTitle : "",
                    headerShown: false,
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: colors.primary,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
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

export default HomeNavigator;
