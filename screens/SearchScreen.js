import {View, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList} from "react-native";
import {colors} from "../assets/colors";
import React, {useEffect, useState} from "react";
import axios from "axios";
import GameCard from "../components/GameCard";

export const SearchScreen = ({navigation}) => {
    const [text, setText] = useState("");
    const [games, setGames] = useState([]);
    useEffect(() => {
        if(text !== ""){
            axios.get(`https://api.rawg.io/api/games?search=${text}&key=3f0a855ff4384b05af50094b2c218aaf`)
                .then(result => {
                    setGames((games) => [
                        ...result.data.results
                    ]);
                })
        }
    }, [text])
    return (
      <SafeAreaView style={styles.container}>
        <TextInput style={{width: "100%", height: 60, backgroundColor: "#1d242e", padding: 10, color: 'white'}} placeholder="Write a game..." placeholderTextColor={'grey'} onChangeText={(text) => setText(text)}/>
          <FlatList data={games} renderItem={(game) => {
              return <TouchableOpacity onPress={() => navigation.navigate("Game", {id: game?.item.id})}>
                  <GameCard full={true} name={game?.item.name} urlImage={game?.item.background_image} year={game?.item.released?.split("-")[0]} day={game?.item.released?.split("-")[2]} month={game?.item.released?.split("-")[1]}/>
              </TouchableOpacity>}
          } keyExtractor={game => game.id}/>
      </SafeAreaView>
    );
}
export default  SearchScreen;

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: colors.background
    }
})