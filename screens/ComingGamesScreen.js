import {StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList} from "react-native";
import {colors} from "../assets/colors";
import GameCard from "../components/GameCard";
import {getGamesNextPage, getGamesPreviousPage} from "../data_sources/remote/Api";
import React, {useEffect, useRef, useState} from "react";

export const ComingGamesScreen = ({route, navigation}) => {
    const [games, setGames] = useState({})

    const scrollViewRef = useRef(null);

    const scrollToTop = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
    };

    useEffect(() => {
        setGames(route.params.games)
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal: 20}} ref={scrollViewRef}>
                <Text style={styles.comingGamesText}>Next Coming Games</Text>

                {
                    games?.results?.map((game, key) => {
                        return <TouchableOpacity onPress={() => navigation.navigate("Game", {id: game?.id})}>
                            <GameCard full={true} name={game?.name} urlImage={game?.background_image} day={game?.released.split("-")[2]} month={game?.released.split("-")[1]}/>
                        </TouchableOpacity>
                    })
                }

                <View style={{flexDirection: 'row', gap: 20, justifyContent: 'center', marginVertical: 20}}>
                    { games.previous !== null ?
                        <TouchableOpacity style={{flex: 1, height: 50, borderRadius: 10, backgroundColor: '#1D242E', justifyContent: 'center'}} onPress={() => {
                            getGamesPreviousPage(games.previous).then(res => {
                                setGames(res)
                                scrollToTop()
                            })
                        }}>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: '500', textAlign: 'center'}}>Previous Page</Text>
                        </TouchableOpacity> : undefined
                    }
                    { games.next !== null ?
                        <TouchableOpacity style={{flex: 1, height: 50, borderRadius: 10, backgroundColor: '#1D242E', justifyContent: 'center'}} onPress={() => {
                            getGamesNextPage(games.next).then(res => {
                                setGames(res)
                                scrollToTop()
                            })
                        }
                        }>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: '500', textAlign: 'center'}}>Next Page</Text>
                        </TouchableOpacity> : undefined
                    }
                </View>

            </ScrollView>

        </View>
    );
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    comingGamesText: {
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
        marginVertical: 20,
    }
})
