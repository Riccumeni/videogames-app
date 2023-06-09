import {StyleSheet, Text, View} from "react-native";
import React from "react";
import { Fontisto } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export const TagCard = (props) => {
    let icon;

    if(props.name?.toLowerCase().includes("playstation") ){
        icon = <Fontisto style={{alignSelf: "center", color: 'white'}} name="playstation" size={24}></Fontisto>
    }

    if(props.name?.toLowerCase().includes("xbox") ){
        icon = <Fontisto style={{alignSelf: "center", color: 'white'}} name="xbox" size={24}></Fontisto>
    }

    if(props.name?.toLowerCase().includes("pc") ){
        icon = <MaterialIcons style={{alignSelf: "center", color: 'white'}} name="computer" size={24}></MaterialIcons>
    }

    if(props.name?.toLowerCase().includes("ios") ){
        icon = <Fontisto style={{alignSelf: "center", color: 'white'}} name="apple" size={24}></Fontisto>
    }

    if(props.name?.toLowerCase().includes("android") ){
        icon = <MaterialIcons style={{alignSelf: "center", color: 'white'}} name="android" size={24}></MaterialIcons>
    }

    if(props.name?.toLowerCase().includes("switch") ){
        icon = <MaterialCommunityIcons style={{alignSelf: "center", color: 'white'}} name="nintendo-switch" size={24}></MaterialCommunityIcons>
    }

    return (
        <View style={styles.container}>
            {icon}
            <Text style={styles.iconText}>{props.name}</Text>
        </View>
    );
}

export default TagCard;



const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 50,
        backgroundColor: "#D2E4FF30",
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginRight: 10
    },
    iconText: {
        color: "white",
        alignSelf: "center",
        fontSize: 14,
        fontWeight: "bold",
    }
});