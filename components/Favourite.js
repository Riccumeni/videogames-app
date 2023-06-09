import {FontAwesome} from "@expo/vector-icons";
import {Touchable, View} from "react-native";
import React, {useState} from "react";

export const Favourite = () => {
    let [color, setColor] = useState("#001C37");
    return (
        <View style={{marginRight: 20, justifyContent: "center", width: 28, height: 28, backgroundColor: "#D2E4FF", opacity: .5, borderRadius: 15, alignSelf: "flex-end"}}>
            <FontAwesome name="heart" size={18} color={color} style={{alignSelf: "center"}} onPress={() => {
                if(color === "#001C37"){
                    setColor("#F00");
                }else {
                    setColor("#001C37");
                }
            }}/>
        </View>
    );
}