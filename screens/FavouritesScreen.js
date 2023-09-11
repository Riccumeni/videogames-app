import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, TouchableOpacity, View, StyleSheet, ScrollView, FlatList} from "react-native";
import {useEffect, useState} from "react";
import axios from "axios";
import GameCard from "../components/GameCard";
import { useFocusEffect } from '@react-navigation/native';
import {colors} from "../assets/colors";

// TODO: modificare il codice affinche salvi tutto l'oggetto e non solo l'id
export const FavouritesScreen = ({navigation}) => {
    const [games, setGames] = useState([]);

    useFocusEffect(() => {
        AsyncStorage.getItem("favourites").then(result => {
            result = JSON.parse(result);
            setGames(result)
        })
    })

    return (
      <View style={styles.container}>
          <FlatList data={games} renderItem={(game) => {
              return <TouchableOpacity style={{marginVertical: 20}} onPress={() => navigation.navigate("Game", {id: game?.item.id})}>
                  <GameCard  name={game?.item.name} urlImage={game?.item.background_image} day={game?.item.released?.split("-")[2]} month={game?.item.released?.split("-")[1]}/>
              </TouchableOpacity>
          }} horizontal={false}/>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center'
    }
})