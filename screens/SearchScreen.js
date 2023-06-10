import {View, StyleSheet, TextInput, TouchableOpacity, ScrollView} from "react-native";
import {colors} from "../assets/colors";
import {useEffect, useState} from "react";
import axios from "axios";
import GameCard from "../components/GameCard";

export const SearchScreen = () => {
    const [text, setText] = useState("");
    const [games, setGames] = useState([]);
    useEffect(() => {
        axios.get(`https://api.rawg.io/api/games?search=${text}&key=3f0a855ff4384b05af50094b2c218aaf`)
            .then(result => {
                setGames((games) => [
                    ...result.data.results
                ]);
            })
    }, [text])
    return (
      <View style={styles.container}>
        <TextInput style={{width: "100%", height: 60, backgroundColor: "#1d242e", padding: 10, color: 'white'}} placeholder="Write a game..." placeholderTextColor={'grey'} onChangeText={(text) => setText(text)}/>
          <ScrollView showsVerticalScrollIndicator={false}>
              {
                  games.map((game) => {
                      return <TouchableOpacity >
                          <GameCard full={true} name={game?.name} urlImage={game?.background_image} day={game?.released?.split("-")[2]} month={game?.released?.split("-")[1]}/>
                      </TouchableOpacity>
                  })
              }
          </ScrollView>
      </View>
    );
}
export default  SearchScreen;

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: colors.background
    }
})