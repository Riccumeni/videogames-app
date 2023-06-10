import {StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView} from "react-native";
import {colors} from "../assets/colors";
import GameCard from "../components/GameCard";
import {useEffect, useState} from "react";
import axios from "axios";
import {MaterialIcons} from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

export const HomeScreen = ({navigation}) => {

    const [games, setGames] = useState([]);

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

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, marginHorizontal: 20}}>
                <Text style={styles.comingGamesText}>Next Coming Games</Text>
                <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => navigation.navigate("Coming Games", {games: games})}>
                    <AntDesign name="right" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView horizontal={true} style={{paddingLeft: 10}}>
                {
                    games?.map(game => {
                        return <TouchableOpacity onPress={() => navigation.navigate("Game", {id: game?.id})}>
                            <GameCard  name={game?.name} urlImage={game?.background_image} day={game?.released.split("-")[2]} month={game?.released.split("-")[1]}/>
                        </TouchableOpacity>
                    })
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        gap: 20,
    },
    comingGamesText: {
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
        marginVertical: 20
    }
});