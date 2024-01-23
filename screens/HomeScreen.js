import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    ActivityIndicator, StatusBar, Button
} from "react-native";
import {colors} from "../assets/colors";
import GameCard from "../components/GameCard";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import { AntDesign } from '@expo/vector-icons';
import {useFocusEffect} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const HomeScreen = ({navigation}) => {

    const [isLoading, setIsLoading] = useState(true);

    const [games, setGames] = useState([]);
    const [gamesBasedOnPlatforms, setGamesBasedOnPlatforms] = useState([])

    const getUrlFromFavourite = async () =>  {
        let resultPlatform = await AsyncStorage.getItem("platforms");
        resultPlatform = JSON.parse(resultPlatform);

        let resultTags = await AsyncStorage.getItem("tags");
        resultTags = JSON.parse(resultTags);

        let resultGenres = await AsyncStorage.getItem("genres");
        resultGenres = JSON.parse(resultGenres);

        let platformsComma = resultPlatform.map((res) => {
            return res.id;
        })

        let tagsComma = resultTags.map((res) => {
            return res.id;
        })

        let genresComma = resultGenres.map((res) => {
            return res.id;
        })

        return `https://api.rawg.io/api/games?platforms=${platformsComma.toString()}&tags=${tagsComma.toString()}&genres=${genresComma.toString()}&ordering=-metacritic&key=3f0a855ff4384b05af50094b2c218aaf`;
    }

    let day = "01";
    let month = (new Date().getMonth() + 1).toString();
    let year = new Date().getFullYear().toString();

    if(month.length === 1){
        month = "0" + month;
    }

    useEffect(() => {
        axios.get(`https://api.rawg.io/api/games?dates=${year}-${month}-${day},${Number.parseInt(year) + 1}-${month}-${day}&ordering=-added&key=3f0a855ff4384b05af50094b2c218aaf`)
            .then(result => {
                setGames(result.data)
                setIsLoading(false);
            })
    }, [])

    useFocusEffect(useCallback(  () => {

        if(global.platformChanged){

            getUrlFromFavourite().then((url) => {
                axios.get(url).then(response => {
                    setGamesBasedOnPlatforms([...response.data.results])
                }).catch(e => {
                    console.warn(e)
                })
            })

            global.platformChanged = false;
        }
    }, []));

    if(isLoading){
        return (
            <SafeAreaView style={{...styles.container, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#fff" style={{alignSelf: 'center'}}/>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 40, marginHorizontal: 20}}>
                    <Text style={styles.comingGamesText}>Next Coming Games</Text>
                    <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => navigation.navigate("Coming Games", {games: games})}>
                        <AntDesign name="right" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <FlatList style={{flexGrow: 0}} keyExtractor={(game) => game.id} data={games.results?.slice(0, 9)} renderItem={(game) => {
                    return <TouchableOpacity onPress={() => navigation.navigate("Game", {id: game?.item.id})}>
                        <GameCard name={game?.item.name} urlImage={game?.item.background_image} day={game?.item.released?.split("-")[2]} month={game?.item.released?.split("-")[1]}/>
                    </TouchableOpacity>
                }} horizontal={true} showsHorizontalScrollIndicator={false}/>

                {
                    gamesBasedOnPlatforms.length > 0 ?
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 40, marginHorizontal: 20}}>
                        <Text style={styles.comingGamesText}>Best games based on your preferences</Text>
                        <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => navigation.navigate("Coming Games", {games: gamesBasedOnPlatforms})}>
                            <AntDesign name="right" size={24} color="white" />
                        </TouchableOpacity>
                    </View> : undefined
                }

                <FlatList style={{flexGrow: 0}} data={gamesBasedOnPlatforms?.slice(0, 9)} renderItem={(game) => {
                    return <TouchableOpacity onPress={() => navigation.navigate("Game", {id: game?.item.id})}>
                        <GameCard name={game?.item.name} urlImage={game?.item.background_image}/>
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
        fontSize: 24,
        fontWeight: "bold",
    }
});
