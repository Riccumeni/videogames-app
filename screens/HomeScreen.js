import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from "react-native";
import {colors} from "../assets/colors";
import GameCard from "../components/GameCard";
import {useEffect, useState} from "react";
import axios from "axios";
import {MaterialIcons} from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

export const HomeScreen = () => {

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


    // 2010-01-01
    useEffect(() => {
        axios.get(`https://api.rawg.io/api/games?dates=${year}-${month}-${day},${Number.parseInt(year) + 1 + 1}-${month}-${day}&ordering=-added&key=3f0a855ff4384b05af50094b2c218aaf`)
            .then(result => {
                setGames(result.data.results)
            })
    }, [])

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, marginHorizontal: 20}}>
                <Text style={styles.comingGamesText}>Next Coming Games</Text>
                <TouchableOpacity style={{justifyContent: 'center'}}>
                    <AntDesign name="right" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView horizontal={true} style={{paddingLeft: 10}}>
                {
                    games?.map(game => {
                        return <GameCard name={game?.name} urlImage={game?.background_image} day={game?.released.split("-")[2]} month={game?.released.split("-")[1]}/>
                    })
                }
            </ScrollView>
        </View>
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
        fontSize: 24,
        fontWeight: "bold"
    }
});