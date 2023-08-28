import {ImageBackground, StyleSheet, View, Text, ScrollView, Image, SafeAreaView, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import {colors} from "../assets/colors";
import {Colors} from "react-native/Libraries/NewAppScreen";
import axios from "axios";
import HTMLView from 'react-native-htmlview';
import TagCard from "../components/TagCard";
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Favourite} from "../components/Favourite";
import {StackActions} from "@react-navigation/native";



export const GameScreen = ({route, navigation}) => {

    let [game, setGame] = useState({});
    let [image, setImage] = useState([]);

    useEffect(() => {
        axios.get(`https://api.rawg.io/api/games/${route.params.id}?key=3f0a855ff4384b05af50094b2c218aaf`)
            .then(result => {
                setGame(() => result.data);
            })

        axios.get(`https://api.rawg.io/api/games/${route.params.id}/screenshots?key=3f0a855ff4384b05af50094b2c218aaf`)
            .then(result => {
                setImage(() => result.data.results);
            })
    }, [])


    return(
        Object.keys(game).length === 0 ? <Text>Is loading</Text> :
        <ImageBackground style={styles.container} source={{uri: game.background_image_additional}}>
            <View style={{position: "absolute", width: "100%", height: "100%", backgroundColor: colors.background, top: 0, left: 0, opacity: 0.95}}></View>

            <View style={styles.topBar}>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'baseline'}} onPress={() => navigation.dispatch(StackActions.popToTop())}>
                    <Ionicons style={{alignSelf: "flex-end"}} name="chevron-back-outline" size={28} color="white" />
                    <Text style={{textAlign: 'center', color: 'white', alignSelf: 'center'}}>Back</Text>
                </TouchableOpacity>

                <Favourite game={game}/>
            </View>

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

                <Text style={styles.description}>{game.description_raw?.split(".")[0] + game.description_raw?.split(".")[1] + "."}</Text>

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
    topBar: {
        width: "100%",
        height: 80,
        backgroundColor: colors.background,
        justifyContent: "space-between",
        padding: 10,
        flexDirection: "row",
        alignItems: 'flex-end'
    },
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