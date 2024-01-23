import {ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {React, useEffect, useState} from "react";
import {colors} from "../assets/colors";
import {Entypo, Fontisto, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {getIcon} from "../utils/Utils";

// TODO: Change deletePlatform
const deletePlatform = async (platformSelected, category) => {
    let platforms = await AsyncStorage.getItem(category);
    platforms = JSON.parse(platforms);

    platforms = await platforms.filter(platform => {
        return platform.id !== platformSelected.id
    })

    await AsyncStorage.setItem(category, JSON.stringify(platforms));

    return platforms

}

const addPlatform = async (platformSelected, category) => {
    let platforms = await AsyncStorage.getItem(category);

    if(platformSelected != null && platforms != null){
        platforms = JSON.parse(platforms);
    }else{
        platforms = JSON.parse('[]');
    }

    let isAlreadyInPlatform = false;


    for (const platform of platforms) {
        if (platform['name'].toUpperCase() === platformSelected['name'].toUpperCase()) {
            isAlreadyInPlatform = true;
        }
    }


    if(!isAlreadyInPlatform){
        platforms.push(platformSelected);
        await AsyncStorage.setItem(category, JSON.stringify(platforms));
    }


    return platforms
}

const getPlatforms = async (category) => {
    let platforms = await AsyncStorage.getItem(category);
    if(platforms != null){
        platforms = JSON.parse(platforms);
    }else{
        platforms = JSON.parse('[]')
    }

    return platforms
}

export const PlatformsScreen = ({route}) => {
    let [platforms, setPlatforms] = useState([])

    const [favouritePlatforms, setFavouritePlatforms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getPlatforms(route.params.name).then(platforms => {
            setFavouritePlatforms([...platforms])
        })

        axios.get(`https://api.rawg.io/api/${route.params.name}?key=3f0a855ff4384b05af50094b2c218aaf`).then(response => {
            let platformsResponseMapped = response.data.results.map(platform => {
                return {
                    id : platform.id,
                    name: platform.name,
                    slug: platform.slug
                }
            })
            setPlatforms(platformsResponseMapped);
            setIsLoading(false);
        })
    }, []);

    if(isLoading){
        return (
            <SafeAreaView style={{...styles.container, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#fff" style={{alignSelf: 'center'}}/>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.title}>Set Favourite Platforms</Text>

            <FlatList showsHorizontalScrollIndicator={false} data={favouritePlatforms} renderItem={(platform) => {
                return <View style={typeof getIcon(platform.item.name) !== "undefined" ? styles.tinyBox : styles.largeBox}>
                    {
                        typeof getIcon(platform.item.name) === "undefined" ? <Text style={{color: 'white', fontWeight: '600'}}>{platform.item.name}</Text> : getIcon(platform.item.name)
                    }
                </View>
            }} horizontal={true} />

            <FlatList showsVerticalScrollIndicator={false} style={{marginTop: 20}} data={platforms} renderItem={(platform) => {
                return <TouchableOpacity style={styles.box} onPress={() => {
                    addPlatform(platform.item, route.params.name).then((p) => {
                        setFavouritePlatforms([...p])
                        global.platformChanged = true;
                    }).catch(e => console.warn(e))
                }}>
                    <View style={{flexDirection: 'row', gap: 20}}>
                        {getIcon(platform.item.name)}
                        <Text style={styles.text}>{platform.item.name}</Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor: 'white', padding: 5, borderRadius: 10}} onPress={() => {
                        deletePlatform(platform.item, route.params.name).then((p) => {
                            setFavouritePlatforms([...p])
                            global.platformChanged = true;
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

    largeBox: {
        backgroundColor: "#1D242E",
        height: 50,
        marginHorizontal: 15,
        marginVertical: 20,
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 10
    },

    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
    }

})
