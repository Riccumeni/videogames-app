import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {React, useEffect, useState} from "react";
import {colors} from "../assets/colors";
import {Entypo, Fontisto, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getIcon = (platform) => {
    let icon;

    if(platform.toLowerCase().includes("playstation") ){
        icon = <Fontisto style={{alignSelf: "center", color: 'white'}} name="playstation" size={24}></Fontisto>
    }

    if(platform.toLowerCase().includes("xbox") ){
        icon = <Fontisto style={{alignSelf: "center", color: 'white'}} name="xbox" size={24}></Fontisto>
    }

    if(platform.toLowerCase().includes("pc") ){
        icon = <MaterialIcons style={{alignSelf: "center", color: 'white'}} name="computer" size={24}></MaterialIcons>
    }

    if(platform.toLowerCase().includes("ios") ){
        icon = <Fontisto style={{alignSelf: "center", color: 'white'}} name="apple" size={24}></Fontisto>
    }

    if(platform.toLowerCase().includes("android") ){
        icon = <MaterialIcons style={{alignSelf: "center", color: 'white'}} name="android" size={24}></MaterialIcons>
    }

    if(platform.toLowerCase().includes("switch") ){
        icon = <MaterialCommunityIcons style={{alignSelf: "center", color: 'white'}} name="nintendo-switch" size={24}></MaterialCommunityIcons>
    }

    return icon;
}

const deletePlatform = async (platformSelected) => {
    let platforms = await AsyncStorage.getItem('platforms');
    platforms = JSON.parse(platforms);

    platforms = await platforms.filter(platform => {
        return platform !== platformSelected
    })

    await AsyncStorage.setItem("platforms", JSON.stringify(platforms));

    return platforms

}

const addPlatform = async (platformSelected) => {
    let platforms = await AsyncStorage.getItem('platforms');
    if(platformSelected != null && platforms != null){
        platforms = JSON.parse(platforms);
    }else{
        platforms = JSON.parse('[]')
    }

    for (const platform of platforms) {
        if (platform === platformSelected) {
            return platforms;
        }
    }


    platforms.push(platformSelected);
    await AsyncStorage.setItem("platforms", JSON.stringify(platforms));
    return platforms
}

const getPlatforms = async () => {
    let platforms = await AsyncStorage.getItem('platforms');
    if(platforms != null){
        platforms = JSON.parse(platforms);
    }else{
        platforms = JSON.parse('[]')
    }

    return platforms
}

export const PlatformsScreen = () => {
    const platforms = [
        "Playstation 5",
        "Xbox",
        "Switch",
        "Pc",
        "Ios",
        "Playstation 4",
        "Android"
    ]

    const [favouritePlatforms, setFavouritePlatforms] = useState([]);

    useEffect(() => {
        getPlatforms().then(platforms => {
            setFavouritePlatforms([...platforms])
        })
    }, []);


    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.title}>Set Favourite Platforms</Text>

            <FlatList showsHorizontalScrollIndicator={false} data={favouritePlatforms} renderItem={(platform) => {
                return <View style={styles.tinyBox}>
                    {getIcon(platform.item)}
                </View>
            }} horizontal={true} />

            <FlatList showsVerticalScrollIndicator={false} style={{marginTop: 20}} data={platforms} renderItem={(platform) => {
                return <TouchableOpacity style={styles.box} onPress={() => {
                    addPlatform(platform.item).then((p) => {
                        setFavouritePlatforms([...p])
                    })
                }}>
                    <View style={{flexDirection: 'row', gap: 20}}>
                        {getIcon(platform.item)}
                        <Text style={styles.text}>{platform.item}</Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor: 'white', padding: 5, borderRadius: 10}} onPress={() => {
                        deletePlatform(platform.item).then((p) => {
                            setFavouritePlatforms([...p])

                        })
                    }}>
                        <Entypo name="cross" size={24} color={colors.background} />
                    </TouchableOpacity>
                </TouchableOpacity>
            }} />
        </SafeAreaView>
    );
}

export default PlatformsScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.background
    },

    title: {color: 'white', fontSize: 28, margin: 20, fontWeight: '700'},

    box: {
        backgroundColor: "#1D242E",
        height: 80,
        margin: 20,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center'
    },

    tinyBox: {
        backgroundColor: "#1D242E",
        height: 50,
        width: 50,
        marginHorizontal: 15,
        marginVertical: 20,
        borderRadius: 10,
        justifyContent: 'center'
    },

    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
    }

})