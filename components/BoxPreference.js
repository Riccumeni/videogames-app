import {Dimensions, FlatList, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {Entypo, MaterialIcons} from "@expo/vector-icons";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {React, useCallback, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";


export const BoxPreference = (props) => {

    const [platforms, setPlatforms] = useState([])

    const animation = useSharedValue({height: 100})
    const animationStyle = useAnimatedStyle(() => {
        return {
            height: withTiming(animation.value.height, {duration: 500})
        }
    })

    let [platformsExpandChecked, setPlatformsExpandChecked] = useState(false)

    const getPlatforms = async () => {
        let platforms = await AsyncStorage.getItem(props.name);
        if(platforms != null){
            platforms = JSON.parse(platforms);
        }else{
            platforms = JSON.parse('[]')
        }

        return platforms
    }

    useFocusEffect(useCallback(() => {
        getPlatforms().then(p => {
            setPlatforms([...p])
        })
    }, []))

    return(
        <Animated.View style={[styles.box, animationStyle]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',  width: '100%', marginTop: 10}}>
                <Text style={styles.titleSection}>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</Text>

                <TouchableOpacity style={{backgroundColor: 'white', padding: 5, borderRadius: 10}} onPress={() => props.navi.navigate("Platforms", {name: props.name})}>
                    <Entypo name="plus" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {<FlatList data={platforms} renderItem={platform => {
                return <Text style={{...styles.titleSection, fontSize: 18, marginVertical: 20, textAlign: 'left'}}>{platform.item.name}</Text>
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
    );
}

export default BoxPreference;

const styles = StyleSheet.create({
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
    }
})