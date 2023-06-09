import {ImageBackground, StyleSheet, View, Text, ScrollView, Image} from "react-native";
import React, {useEffect, useState} from "react";
import {colors} from "../assets/colors";
import {Colors} from "react-native/Libraries/NewAppScreen";
import axios from "axios";
import HTMLView from 'react-native-htmlview';
import TagCard from "../components/TagCard";
import { FontAwesome } from '@expo/vector-icons';


export const GameScreen = () => {

    let [game, setGame] = useState({});
    let [image, setImage] = useState([]);

    useEffect(() => {
        axios.get("https://api.rawg.io/api/games/292842?key=3f0a855ff4384b05af50094b2c218aaf")
            .then(result => {
                setGame(() => result.data);
            })

        axios.get("https://api.rawg.io/api/games/292842/screenshots?key=3f0a855ff4384b05af50094b2c218aaf")
            .then(result => {
                setImage(() => result.data.results);
            })
    }, [])
    return(
        <ImageBackground style={styles.container} source={{uri: game.background_image_additional}}>
            <View style={{position: "absolute", width: "100%", height: "100%", backgroundColor: colors.background, top: 0, left: 0, opacity: 0.95}}></View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{uri: game?.background_image}} style={{width: "100%", height: 200}}/>
                <View style={{flexDirection: "row", justifyContent: "center", marginVertical: 20}}>
                    <Text style={styles.title}>{game.name}</Text>
                </View>

                <View style={{flexDirection: "row", justifyContent: "center", gap: 20, marginVertical: 20}}>
                    <FontAwesome style={{alignSelf: "flex-end"}} name="star" size={24} color="#FFB800" />
                    <Text style={styles.iconText}>{game.rating ? game.rating : "not rated"}</Text>
                    <Text style={{...styles.iconText, fontSize: 18, transform: [{rotateZ: "45deg"}]}}>m</Text>
                    <Text style={styles.iconText}>{game.metacritic ? game.metacritic : "not rated"}</Text>
                </View>

                <Text style={styles.description}>{game.description_raw?.split(".")[0] + game.description_raw?.split(".")[0] + "."}</Text>

                <Text style={styles.titleSection}>Genre</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingLeft: 20}}>
                    {
                        game.genres?.map((genre) => {
                            return <TagCard name={genre.name}/>
                        })
                    }
                </ScrollView>

                <Text style={styles.titleSection}>Platforms</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingLeft: 20}}>
                    {
                        game.platforms?.map((platform) => {
                            return <TagCard name={platform.platform.name}/>
                        })
                    }
                </ScrollView>

                <Text style={styles.titleSection}>Tags</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingLeft: 20}}>
                    {
                        game.tags?.map((tag) => {
                            return <TagCard name={tag.name}/>
                        })
                    }
                </ScrollView>

                <Text style={styles.titleSection}>Screenshots</Text>
                <ScrollView horizontal={true} style={{marginBottom: 20, paddingLeft: 20}} showsHorizontalScrollIndicator={false}>
                    {
                        image?.map((image) => {
                            return <Image source={{uri: image.image}} style={{width: 300, height: 170, borderRadius: 20, marginRight: 20}}/>

                        })
                    }
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
        fontSize: 28,
        fontWeight: "600",
        marginLeft: 20,
        marginVertical: 20
    }
})