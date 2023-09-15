import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, TouchableOpacity, View, StyleSheet, ScrollView, FlatList} from "react-native";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import GameCard from "../components/GameCard";
import { useFocusEffect } from '@react-navigation/native';
import {colors} from "../assets/colors";

export const FavouritesScreen = ({navigation}) => {
    const [games, setGames] = useState([]);

    useFocusEffect(useCallback(() => {

        AsyncStorage.getItem("favourites").then(result => {
            result = JSON.parse(result);
            setGames([...result])
        })

    }, []))

    return (
      <View style={styles.container}>
          {
              games.length !== 0 ?
                  <FlatList data={games} renderItem={(game) => {
                  return <TouchableOpacity style={{marginVertical: 20}}
                                           onPress={() => navigation.navigate("Game", {id: game?.item.id})}>
                      <GameCard name={game?.item.name} urlImage={game?.item.background_image}
                                day={game?.item.released?.split("-")[2]} month={game?.item.released?.split("-")[1]}/>
                  </TouchableOpacity>
              }} horizontal={false} showsVerticalScrollIndicator={false}/>
          :
                  <Text style={styles.text}>No favourite selected yet</Text>
          }
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 18,
        opacity: .8
    }
})