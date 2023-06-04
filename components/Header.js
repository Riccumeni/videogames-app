import {Blur, Canvas, Fill, Image, SkiaView, useImage} from "@shopify/react-native-skia";
import {BlurView} from "expo-blur";
import {Platform, View} from "react-native";
import {colors} from "../assets/colors";

export const Header = () => {
    if(Platform.OS === "ios"){
        return(
            <View style={{height: 100, width: "100%", backgroundColor: colors.background}}>
                <BlurView style={{height: 100, width: "100%", backgroundColor: colors.background}}></BlurView>
            </View>
        );
    }else{
        return(
            <View style={{height: 100, width: "100%", backgroundColor: colors.background}}></View>
        );
    }
}

export default Header;