import {ImageBackground, StyleSheet, Text, View} from "react-native";
import { BlurView } from 'expo-blur';

export const GameCard = (props) => {
    return (

        <ImageBackground style={styles.container} source={{uri: props.urlImage}} borderRadius="20" >
            <View style={{borderBottomRightRadius: 20, borderBottomLeftRadius: 20, height: 40, width: "100%", overflow: "hidden"}}>
                <BlurView style={styles.titleContainer}>
                    <Text style={styles.titleText}>{props.name}</Text>
                </BlurView>
            </View>
            {props.day ? <View style={{borderTopRightRadius: 20, borderBottomLeftRadius: 20, height: 50, width: 50, overflow: "hidden", position: "absolute", top: 0, right: 0}}>
                <BlurView style={{...styles.titleContainer, paddingLeft: 0, alignItems: 'center'}}>
                    <Text style={styles.titleText}>10</Text>
                    <Text style={{...styles.titleText, fontSize: 12}}>MAG</Text>
                </BlurView>
            </View> : ""}


        </ImageBackground>

    );
}

export default  GameCard;

const styles = StyleSheet.create({
    container: {
        width: 250,
        height: 140,
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'flex-end',
        marginHorizontal: 10

    },
    titleContainer: {
        width: "100%",
        height: "100%",
        paddingLeft: 20,
        justifyContent: "center"
    },
    titleText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textShadowRadius: 3,
        textShadowColor: "black"
    }
})