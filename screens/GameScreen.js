import {ImageBackground, StyleSheet, View, Text, ScrollView, Image} from "react-native";
import React, {useEffect, useState} from "react";
import {colors} from "../assets/colors";
import {Colors} from "react-native/Libraries/NewAppScreen";
import axios from "axios";
import HTMLView from 'react-native-htmlview';


export const GameScreen = () => {

    let [game, setGame] = useState({});

    useEffect(() => {
        axios.get("https://api.rawg.io/api/games/3498?key=3f0a855ff4384b05af50094b2c218aaf")
            .then(result => {
                setGame(() => result.data);
            })
    }, [])
    return(
        <ImageBackground style={styles.container} source={{uri: game.background_image}}>
            <View style={{position: "absolute", width: "100%", height: "100%", backgroundColor: colors.background, top: 0, left: 0, opacity: 0.90}}></View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flexDirection: "row", justifyContent: "space-evenly", marginVertical: 20}}>
                    <Text style={styles.title}>{game.name}</Text>
                    <View style={{width: 30, height: 30, backgroundColor: "#D2E4FF", borderRadius: 15, alignSelf: "flex-end"}}></View>
                </View>

                <View style={{flexDirection: "row", justifyContent: "center", gap: 20, marginVertical: 20}}>
                    <View style={{width: 30, height: 30, backgroundColor: "#D2E4FF", borderRadius: 15, alignSelf: "flex-end"}}></View>
                    <Text style={styles.iconText}>{game.rating}</Text>
                    <Text style={{...styles.iconText, fontSize: 18, transform: [{rotateZ: "45deg"}]}}>m</Text>
                    <Text style={styles.iconText}>{game.metacritic}</Text>
                </View>

                <HTMLView stylesheet={htmlStyles} value={game.description.split("<br />")[0]}/>

                <Text style={styles.titleSection}>Genre</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginLeft: 20}}>
                    <View style={{width: 160, height: 35, backgroundColor: "#D2E4FF30", borderRadius: 5, flexDirection: "row", justifyContent: "space-evenly"}}>
                        <View style={{width: 20, height: 20, backgroundColor: "white", borderRadius: 15, alignSelf: "center"}}></View>
                        <Text style={styles.iconText}>Adventure</Text>
                    </View>
                </ScrollView>

                <Text style={styles.titleSection}>Platforms</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginLeft: 20}}>
                    <View style={{width: 160, height: 35, backgroundColor: "#D2E4FF30", borderRadius: 5, flexDirection: "row", justifyContent: "space-evenly"}}>
                        <View style={{width: 20, height: 20, backgroundColor: "white", borderRadius: 15, alignSelf: "center"}}></View>
                        <Text style={styles.iconText}>Adventure</Text>
                    </View>
                </ScrollView>

                <Text style={styles.titleSection}>Tags</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginLeft: 20}}>
                    <View style={{width: 160, height: 35, backgroundColor: "#D2E4FF30", borderRadius: 5, flexDirection: "row", justifyContent: "space-evenly"}}>
                        <View style={{width: 20, height: 20, backgroundColor: "white", borderRadius: 15, alignSelf: "center"}}></View>
                        <Text style={styles.iconText}>Adventure</Text>
                    </View>
                </ScrollView>

                <Text style={styles.titleSection}>Screenshots</Text>
                <ScrollView horizontal={true} style={{marginLeft: 20, marginBottom: 20}} showsHorizontalScrollIndicator={false}>
                    <Image source={{uri: "https://media.rawg.io/media/crop/600/400/games/556/55684bfd048706f4266d331d70050b37.jpg"}} style={{width: 250, height: 125, borderRadius: 20, marginRight: 20}}/>
                    <Image source={{uri: "https://media.rawg.io/media/crop/600/400/games/556/55684bfd048706f4266d331d70050b37.jpg"}} style={{width: 250, height: 125, borderRadius: 20, marginRight: 20}}/>
                    <Image source={{uri: "https://media.rawg.io/media/crop/600/400/games/556/55684bfd048706f4266d331d70050b37.jpg"}} style={{width: 250, height: 125, borderRadius: 20, marginRight: 20}}/>
                </ScrollView>
            </ScrollView>
        </ImageBackground>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: "white",
        alignSelf: "center",
        fontSize: 26,
        fontWeight: "bold",
    },
    iconText: {
        color: "white",
        alignSelf: "center",
        fontSize: 14,
        fontWeight: "bold",
    },
    description: {
        color: "white",
        marginHorizontal: 20,
        fontSize: 16,
        marginVertical: 20
    },
    titleSection: {
        color: "white",
        fontSize: 24,
        fontWeight: "600",
        marginLeft: 20,
        marginVertical: 20
    }
})

const htmlStyles = StyleSheet.create({
    p : {
        color: "white",
        marginHorizontal: 20,
        fontSize: 16,
        marginVertical: 20
    }
})