import {Fontisto, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {React} from "react";
import {Text} from "react-native";

export const getIcon = (platform) => {
    let icon;

    if(typeof platform !== 'undefined'){
        if(platform.toLowerCase().includes("playstation") || platform.toLowerCase().includes("psp") || platform.toLowerCase().includes("ps vita")){
            icon = <Fontisto style={{alignSelf: "center", color: 'white'}} name="playstation" size={24}></Fontisto>
        }

        if(platform.toLowerCase().includes("xbox") ){
            icon = <Fontisto style={{alignSelf: "center", color: 'white'}} name="xbox" size={24}></Fontisto>
        }

        if(platform.toLowerCase().includes("pc") ){
            icon = <MaterialIcons style={{alignSelf: "center", color: 'white'}} name="computer" size={24}></MaterialIcons>
        }

        if(platform.toLowerCase().includes("ios") || platform.toLowerCase().includes("mac") || platform.toLowerCase().includes("apple")){
            icon = <Fontisto style={{alignSelf: "center", color: 'white'}} name="apple" size={24}></Fontisto>
        }

        if(platform.toLowerCase().includes("android") ){
            icon = <MaterialIcons style={{alignSelf: "center", color: 'white'}} name="android" size={24}></MaterialIcons>
        }

        if(platform.toLowerCase().includes("switch") ){
            icon = <MaterialCommunityIcons style={{alignSelf: "center", color: 'white'}} name="nintendo-switch" size={24}></MaterialCommunityIcons>
        }

        if(platform.toLowerCase().includes("game boy") ){
            icon = <MaterialCommunityIcons style={{alignSelf: "center", color: 'white'}} name="nintendo-game-boy" size={24}></MaterialCommunityIcons>
        }

        if(platform.toLowerCase().includes("wii") ){
            icon = <MaterialCommunityIcons style={{alignSelf: "center", color: 'white'}} name="nintendo-wii" size={24}></MaterialCommunityIcons>
        }

        if(platform.toLowerCase().includes("wii u") ){
            icon = <MaterialCommunityIcons style={{alignSelf: "center", color: 'white'}} name="nintendo-wiiu" size={24}></MaterialCommunityIcons>
        }
    }

    return icon;
}
