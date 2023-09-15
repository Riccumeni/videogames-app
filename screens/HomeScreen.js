import {StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, FlatList} from "react-native";
import {colors} from "../assets/colors";
import GameCard from "../components/GameCard";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {MaterialIcons} from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import {useFocusEffect} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const HomeScreen = ({navigation}) => {

    const [games, setGames] = useState([]);
    const [favouritePlatforms, setFavouritePlatforms] = useState([])
    const [gamesBasedOnPlatforms, setGamesBasedOnPlatforms] = useState([])

    let day = new Date().getDate().toString();
    let month = new Date().getMonth().toString();
    let year = new Date().getFullYear().toString();

    if(day.length === 1){
        day = "0" + day;
    }

    if(month.length === 1){
        month = "0" + month;
    }

    useEffect(() => {
        axios.get(`https://api.rawg.io/api/games?dates=${year}-${month}-${day},${Number.parseInt(year) + 1}-${month}-${day}&ordering=-added&key=3f0a855ff4384b05af50094b2c218aaf`)
            .then(result => {
                setGames(result.data.results)
            })
    }, [])

    useFocusEffect(useCallback(() => {
        AsyncStorage.getItem("platforms").then(result => {
            result = JSON.parse(result);
            setFavouritePlatforms([...result])
            let platformsComma = result.map((res) => {
                return res.id
            })

            axios.get(`https://api.rawg.io/api/games?platforms=${platformsComma.toString()}&ordering=-metacritic&key=3f0a855ff4384b05af50094b2c218aaf`).then(response => {
                setGamesBasedOnPlatforms([...response.data.results])
            })
        })
    }, []))

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView >
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 40, marginHorizontal: 20}}>
                    <Text style={styles.comingGamesText}>Next Coming Games</Text>
                    <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => navigation.navigate("Coming Games", {games: games})}>
                        <AntDesign name="right" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <FlatList style={{flexGrow: 0}} data={games} renderItem={(game) => {
                    return <TouchableOpacity onPress={() => navigation.navigate("Game", {id: game?.item.id})}>
                        <GameCard name={game?.item.name} urlImage={game?.item.background_image} day={game?.item.released.split("-")[2]} month={game?.item.released.split("-")[1]}/>
                    </TouchableOpacity>
                }} horizontal={true} showsHorizontalScrollIndicator={false}/>
                {
                    gamesBasedOnPlatforms.length > 0 ?
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 40, marginHorizontal: 20}}>
                        <Text style={styles.comingGamesText}>Best games based on your favourite platform</Text>
                        <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => navigation.navigate("Coming Games", {games: gamesBasedOnPlatforms})}>
                            <AntDesign name="right" size={24} color="white" />
                        </TouchableOpacity>
                    </View> : undefined
                }
                <FlatList style={{flexGrow: 0}} data={gamesBasedOnPlatforms} renderItem={(game) => {
                    return <TouchableOpacity onPress={() => navigation.navigate("Game", {id: game?.item.id})}>
                        <GameCard name={game?.item.name} urlImage={game?.item.background_image} day={game?.item.released.split("-")[2]} month={game?.item.released.split("-")[1]}/>
                    </TouchableOpacity>
                }} horizontal={true} showsHorizontalScrollIndicator={false}/>
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    comingGamesText: {
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
    }
});