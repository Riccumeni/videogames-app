import {Text, StyleSheet, SafeAreaView, View, TouchableOpacity, Dimensions, FlatList} from "react-native";
import {React, useEffect, useState} from "react";
import {colors} from "../assets/colors";
import {Entypo, Fontisto, MaterialIcons} from "@expo/vector-icons";
import {useSharedValueEffect} from "@shopify/react-native-skia";
import Animated, { useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";

export const SettingsScreen = ({navigation}) => {
    const [platforms, setPlatforms] = useState([])
    const animation = useSharedValue({height: 100})
    const animationStyle = useAnimatedStyle(() => {
        return {
            height: withTiming(animation.value.height, {duration: 500})
        }
    })

    let [platformsExpandChecked, setPlatformsExpandChecked] = useState(false)

    const getPlatforms = async () => {
        let platforms = await AsyncStorage.getItem('platforms');
        if(platforms != null){
            platforms = JSON.parse(platforms);
        }else{
            platforms = JSON.parse('[]')
        }

        return platforms
    }

    useFocusEffect(() => {
        getPlatforms().then(p => {
            setPlatforms([...p])
        })
    })

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{color: 'white', fontSize: 28, margin: 20, fontWeight: '700'}}>Set Preferences</Text>
            <Animated.View style={[styles.box, animationStyle]}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',  width: '100%', marginTop: 10}}>
                    <Text style={styles.titleSection}>Platforms</Text>

                    <TouchableOpacity style={{backgroundColor: 'white', padding: 5, borderRadius: 10}} onPress={() => navigation.navigate("Platforms")}>
                        <Entypo name="plus" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {<FlatList data={platforms} renderItem={platform => {
                    return <Text style={{...styles.titleSection, fontSize: 18, marginVertical: 20, textAlign: 'left'}}>{platform.item}</Text>
                }} horizontal={false} showsVerticalScrollIndicator={false} scrollEnabled={false}/>}

                <TouchableOpacity style={{position: 'absolute', bottom: 0,
                    left: (Dimensions.get('window').width / 2) - 30}} onPress={() => {
                        if(platformsExpandChecked) {
                            animation.value = {height: 100}
                            setPlatformsExpandChecked(!platformsExpandChecked)
                        }else {
                            animation.value = {height: animation.value.height + 60 * platforms.length}
                            setPlatformsExpandChecked(!platformsExpandChecked)
                        }
                    }
                }>
                    <MaterialIcons name="keyboard-arrow-down" size={28} color="white" />
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
}
// <Fontisto style={{alignSelf: "center", color: 'white'}} name="playstation" size={18}></Fontisto>

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
    },
    box: {
        flexDirection: 'column',
        backgroundColor: "#1D242E",
        margin: 20,
        padding: 20,
        borderRadius: 15,
        justifyContent: 'center'
    },
    titleSection: {
        color: 'white',
        fontSize: 28,
        fontWeight: '600',
    },
    expandIcon: {

    }
})