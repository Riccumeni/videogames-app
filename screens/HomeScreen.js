import {StyleSheet, View, Text, ScrollView} from "react-native";
import {colors} from "../assets/colors";
import GameCard from "../components/GameCard";
import {Blur, Canvas, Image, useImage, SkiaView} from "@shopify/react-native-skia";
import {useEffect, useState} from "react";
import axios from "axios";

export const HomeScreen = () => {

    const [game, setGame] = useState([]);

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
        axios.get(`https://api.rawg.io/api/games?dates=2023-06-10,2023-07-10&ordering=-added&key=3f0a855ff4384b05af50094b2c218aaf`)
            .then(result => {
                setGame(result.data.results)
            })
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.comingGamesText}>Next Coming Games</Text>
            <ScrollView horizontal={true}>
                {
                    game.map(game => {
                        return <GameCard name={game?.name} urlImage={game?.background_image}/>
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
        padding: 20
    },
    comingGamesText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold"
    }
});