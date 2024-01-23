import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    SafeAreaView,
    ActivityIndicator
} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import GameCard from "../components/GameCard";
import { useFocusEffect } from '@react-navigation/native';
import {colors} from "../assets/colors";

export const FavouritesScreen = ({navigation}) => {
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useFocusEffect(useCallback(() => {

        AsyncStorage.getItem("favourites").then(result => {
            result = JSON.parse(result);
            setGames([...result]);
            setIsLoading(false);
        })

    }, []));

    if(isLoading){
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#fff" style={{alignSelf: 'center'}}/>
            </SafeAreaView>
        );
    }

    return (
      <View style={{...styles.container}}>
          {
              games.length !== 0 ?
                  <FlatList style={{flex:1 , width: '100%', paddingHorizontal: 10}} data={games} renderItem={(game) => {
                  return <TouchableOpacity style={{marginVertical: 20}}
                                           onPress={() => navigation.navigate("Game", {id: game?.item.id})}>
                      <GameCard full={true} name={game?.item.name} urlImage={game?.item.background_image}
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
