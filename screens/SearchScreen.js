import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    ScrollView,
    SafeAreaView,
    FlatList,
    ActivityIndicator
} from "react-native";
import {colors} from "../assets/colors";
import React, {useEffect, useState} from "react";
import axios from "axios";
import GameCard from "../components/GameCard";
import {Feather} from "@expo/vector-icons";
import { Dropdown } from 'react-native-element-dropdown';

export const SearchScreen = ({navigation}) => {
    const [text, setText] = useState("");
    const [games, setGames] = useState([]);
    const [isAscendant, setIsAscendant] = useState(true)
    const [value, setValue] = useState("metacritic");
    const [isLoading, setIsLoading] = useState(true);

    const data = [
        { label: 'metacritic', value: 'metacritic' },
        { label: 'released', value: 'released' },
    ];

    useEffect(() => {
        if(text !== ""){
            axios.get(`https://api.rawg.io/api/games?search=${text}&key=3f0a855ff4384b05af50094b2c218aaf&ordering=${isAscendant ? value : `-${value}`}`)
                .then(result => {
                    setGames((games) => [
                        ...result.data.results
                    ]);
                })
        }
    }, [text, value, isAscendant]);


    return (
      <SafeAreaView style={styles.container}>
        <TextInput style={{width: "90%", height: 60, backgroundColor: "#1d242e", padding: 10, color: 'white', marginTop: 20, alignSelf: 'center', borderRadius: 5}} placeholder="Write a game..." placeholderTextColor={'grey'} onChangeText={(text) => setText(text)}/>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10, padding: 20, gap: 30}}>
              <Dropdown
                  style={{height: 50, width: 150,backgroundColor: colors.primary, borderRadius: 8, paddingHorizontal: 8}}
                  data={data}
                  labelField={"label"}
                  valueField={"0"}
                  value={value}
                  selectedTextStyle={{color: 'white'}}
                  placeholderStyle={{fontSize: 16, color: 'white', opacity: .5}}
                  onChange={(item) => {
                      setValue(item.value);
                    }
                  }
              />
              <TouchableOpacity style={{flexDirection: 'row', gap: 20}} onPress={() => setIsAscendant(!isAscendant)}>
                  <Feather name="arrow-up-circle" size={32} color="white" style={{opacity: isAscendant ? 1 : .5, alignSelf: 'center'}}/>
                  <Feather name="arrow-down-circle" size={32} color="white" style={{opacity: isAscendant === false ? 1 : .5, alignSelf: 'center'}}/>
              </TouchableOpacity>
          </View>

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
