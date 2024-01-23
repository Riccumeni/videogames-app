import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    ActivityIndicator, FlatList
} from "react-native";
import React, {useEffect, useState} from "react";
import {colors} from "../assets/colors";
import axios from "axios";
import TagCard from "../components/TagCard";
import {Entypo, FontAwesome, Ionicons} from '@expo/vector-icons';
import {Favourite} from "../components/Favourite";
import {StackActions} from "@react-navigation/native";



export const GameScreen = ({route, navigation}) => {

    let [game, setGame] = useState({});
    let [images, setImages] = useState([]);
    let [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`https://api.rawg.io/api/games/${route.params.id}?key=3f0a855ff4384b05af50094b2c218aaf`)
            .then(result => {
                setGame(() => result.data);
            })

        axios.get(`https://api.rawg.io/api/games/${route.params.id}/screenshots?key=3f0a855ff4384b05af50094b2c218aaf`)
            .then(result => {
                setImages(() => result.data.results);
            })
            .catch(e => console.warn(e))

        axios.defaults.headers['apikey'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqY3F2b3B0Ynd0ZXB2ZmRicWtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU3NTYyNTYsImV4cCI6MjAyMTMzMjI1Nn0.L1aodZDbzjcEatsGLyoSRPtgzwFjvmR-xSVFG4dM3NM';
        axios.defaults.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqY3F2b3B0Ynd0ZXB2ZmRicWtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU3NTYyNTYsImV4cCI6MjAyMTMzMjI1Nn0.L1aodZDbzjcEatsGLyoSRPtgzwFjvmR-xSVFG4dM3NM'

        axios.get(`https://rjcqvoptbwtepvfdbqke.supabase.co/rest/v1/comments?select=*&game_id=eq.${route.params.id}`).then(result => {
            setComments(result.data)
        })
    }, [])


    return(
        Object.keys(game).length === 0 ? <View style={{...styles.container, justifyContent: 'center'}}><ActivityIndicator size="large" color="#fff" /></View> :
        <View style={styles.container} >
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

                <FlatList style={{paddingLeft: 20}} data={game.genres} renderItem={(genre => {
                    return <TagCard name={genre.item.name}/>
                })} horizontal={true} showsHorizontalScrollIndicator={false}/>

                <Text style={styles.titleSection}>Platforms</Text>

                <FlatList style={{paddingLeft: 20}} data={game.platforms} renderItem={(platform => {
                    return <TagCard name={platform.item.platform.name}/>
                })} horizontal={true} showsHorizontalScrollIndicator={false}/>

                <Text style={styles.titleSection}>Tags</Text>

                <FlatList style={{paddingLeft: 20}} data={game.tags} renderItem={(tag => {
                    return <TagCard name={tag.item.name}/>
                })} horizontal={true} showsHorizontalScrollIndicator={false}/>

                <Text style={styles.titleSection}>Screenshots</Text>

                <FlatList style={{paddingLeft: 20, marginBottom: 20}} data={images} renderItem={(image) => {
                    return <TouchableOpacity ><Image source={{uri: image.item.image}} style={{width: 300, height: 170, borderRadius: 20, marginRight: 20}}/></TouchableOpacity>
                }} horizontal={true} showsHorizontalScrollIndicator={false}/>

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginEnd: 20}}>
                    <Text style={styles.titleSection}>Comments</Text>

                    <TouchableOpacity style={{backgroundColor: '#363E4C', padding: 5, borderRadius: 10, height: 40, width: 40, alignSelf: 'center'}} onPress={() => navigation.navigate("Add Comment", {id: game.id, comments: comments, setComments: setComments})}>
                        <Entypo name="plus" size={24} color="white" style={{alignSelf: 'center'}}/>
                    </TouchableOpacity>

                </View>

                {
                    comments.length > 0 ?comments.map((comment) => {
                        return(
                            <View style={{display: 'flex', flexDirection: 'column', padding: 20, backgroundColor: '#363E4C', margin: 20, borderRadius: 10}}>
                                <Text style={{color: 'white', fontSize: 18, fontWeight: '600', marginBottom: 10}}>{comment.title}</Text>
                                <Text style={{color: 'white', fontSize: 14}}>{comment.body}</Text>
                            </View>
                        );
                    }) : <View style={{height: 150, alignItems: 'center', justifyContent: 'center'}}><Text style={{color: 'white', alignSelf: 'center'}}>There is no comments</Text></View>
                }

            </ScrollView>
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    topBar: {
        width: "100%",
        height: 100,
        backgroundColor: colors.primary,
        justifyContent: "space-between",
        padding: 10,
        flexDirection: "row",
        alignItems: 'flex-end',
    },
    container: {
        flex: 1,
        backgroundColor: colors.background
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
