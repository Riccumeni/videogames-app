import {FontAwesome} from "@expo/vector-icons";
import {Touchable, View} from "react-native";
import React, {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Favourite = (props) => {
    const searchGame = async (game) => {
        let favourites = await JSON.parse(await AsyncStorage.getItem('favourites'));
        if(favourites === null){
            return false;
        }
        for (const favourite of favourites) {
            if (favourite.id === game.id) {
                return true;
            }
        }
        return false;
    }

    const deleteGame = async (game) => {
        let favourites = await AsyncStorage.getItem('favourites');
        favourites = JSON.parse(favourites);

        favourites = await favourites.filter(favourite => {
            return favourite.id !== game.id;
        })

        await AsyncStorage.setItem("favourites", JSON.stringify(favourites));
    }

    const addGame = async (game) => {
        let favourites = await AsyncStorage.getItem('favourites');
        if(favourites != null){
            favourites = JSON.parse(favourites);
        }else{
            favourites = JSON.parse('[]')
        }
        favourites.push(game);
        await AsyncStorage.setItem("favourites", JSON.stringify(favourites));
    }

    useEffect(() => {
        searchGame(props.game).then(isFound => {
            if(isFound){
                setColor("#F00")
            }else{
                setColor("#001C37");
            }
        })
    }, []);



    let [color, setColor] = useState("#001C37");
    return (
        <View style={{marginRight: 20, justifyContent: "center", width: 28, height: 28, backgroundColor: "#D2E4FF", opacity: .5, borderRadius: 15, alignSelf: "flex-end"}}>
            <FontAwesome name="heart" size={18} color={color} style={{alignSelf: "center"}} onPress={() => {
                searchGame(props.game).then((isFound) => {
                    if(isFound){
                        console.warn("is found")
                        deleteGame(props.game);
                        setColor("#001C37");
                    }else{
                        console.warn("is not found")
                        addGame(props.game);
                        setColor("#F00");
                    }

                })
            }}/>
        </View>
    );
}